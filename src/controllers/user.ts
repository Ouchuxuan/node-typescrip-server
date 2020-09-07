import { getManager } from 'typeorm';
import { Context, Next } from 'koa';
import { User } from '../entity/User';
import { Role } from '../entity/Role';
import JsonHelper from '../utils/responseHelper';
import { checkPasswordHash, encrypt } from '../utils/common'
import { v4 as uuidV4 } from 'uuid'
import RedisHelper from '../utils/redisHelper';
import jwt from 'jsonwebtoken';
import config from '../config';

export const login = async (ctx: Context, next: Next) => {
  const { body: { username, passward } } = ctx.request;
  if (!username || !passward) {
    ctx.body = JsonHelper.response("REQUESTERROR")
  }
  // 在数据库中查找相关的用户
  // `select * from user where user_name = username`
  const userRepository = getManager().getRepository(User);
  const result = await userRepository.find({ where: { user_name: username } })
  if (result.length === 0) {
    ctx.body = JsonHelper.response('USERNOTEXIST')
    return;
  }
  const databaseUsername = result[0].user_name;
  const databasePassword = result[0].password;
  const userId = result[0].id;
  if (checkPasswordHash(databasePassword, passward)) {
    // 创建token,token的paylo是userid和idCard
    const idCard = uuidV4();
    const userToken = jwt.sign({
      id: userId,
      id_card: idCard
    }, config.secretKey, {
      expiresIn: '356d',
    })
    const redis = new RedisHelper(0);
    const key = `session:${idCard}`;
    redis.set(key, 1, 60 * 60);
    const result = {
      token: userToken,
      username: databaseUsername
    }
    ctx.body = JsonHelper.response('SUCCESS', result)
  } else {
    ctx.body = JsonHelper.response('PASSWORDERROR')
  }
}

export const logout = (ctx: Context, next: Next) => {
  const clientToken = ctx.request.header['authorization'];
  // 通过token的payload获取id_card，在redis里面删掉,然后成功登出
  const userData = jwt.verify(clientToken, config.secretKey);
  const idCard = (userData as any).id_card;
  const redis = new RedisHelper(0);
  const key = `session:${idCard}`;
  redis.delete(key)
  ctx.body = JsonHelper.response()
}

export const changePassword = async (ctx: Context, next: Next) => {
  const { body: { username, password, old_password } } = ctx.request;
  if (!username || !password || !old_password) {
    ctx.body = JsonHelper.response("REQUESTERROR");
    return;
  }
  const manager = getManager()
  // 判断旧密码是否正确
  const dbUserData = await manager.getRepository(User).find({ user_name: username });
  if (dbUserData.length === 0) {
    ctx.body = JsonHelper.response("USERNOTEXIST");
    return;
  }
  const dbPassword = dbUserData[0].password;
  if (encrypt(old_password) !== dbPassword) {
    ctx.body = JsonHelper.response("PASSWORDERROR");
    return;
  }
  await manager.update(User, { user_name: username }, { password: encrypt(password) })
  ctx.body = JsonHelper.response()


}

export const addUser = async (ctx: Context, next: Next) => {
  const { body } = ctx.request;
  const { username, password, role_id } = body;
  if (!username || !password || !role_id) {
    ctx.body = JsonHelper.response("REQUESTERROR")
    return;
  }
  // 先确定数据库是否已有此用户
  const userRepository = getManager().getRepository(User);
  const dbUser = await userRepository.find({ 'user_name': username });
  if (dbUser.length !== 0) {
    ctx.body = JsonHelper.custom('用户已存在')
    return;
  } else {
    // 根据roleId寻找对应role
    const roleRepository = getManager().getRepository(Role);
    const dbRole = await roleRepository.findByIds([role_id]);
    if (dbRole.length === 0) {
      ctx.body = JsonHelper.custom('用户角色不存在')
      return;
    }
    const newUser = new User();
    newUser.user_name = username;
    newUser.password = encrypt(password);
    newUser.roels = [...dbRole];
    const manager = getManager();
    await manager.save(newUser);
    ctx.body = JsonHelper.response('SUCCESS')
  }

}

export const deleteUser = async (ctx: Context, next: Next) => {
  const { user_id, role_id } = ctx.request.query;
  if (!user_id || !role_id) {
    ctx.body = JsonHelper.response("REQUESTERROR")
  }
  const manager = getManager();
  // 1.删除中间表的记录；
  await manager.createQueryBuilder().relation(User, 'roels').of(user_id).remove(role_id);
  // 2.删除角色表的记录
  await manager.createQueryBuilder().delete().from(User).where('id=:user_id', { user_id }).execute()
  ctx.body = JsonHelper.response()
}

export const getUserlist = async (ctx: Context, next: Next) => {
  const dbUserData = await getManager().getRepository(User).find();
  const result = dbUserData.map(item => {
    return {
      id: item.id,
      create_time: item.create_time,
      user_name: item.user_name,
    }
  })
  ctx.body = JsonHelper.response('SUCCESS', { items: result })

}

/**
 * @description 获取所有角色信息 
 */
export const getRoleList = async (ctx: Context, next: Next) => {
  const dbRoleData = await getManager().getRepository(Role).find();
  ctx.body = JsonHelper.response('SUCCESS', dbRoleData)
}

export const getRoleByUserId = async (ctx: Context, next: Next) => {
  const { username } = ctx.request.query;
  if (!username) {
    ctx.body = JsonHelper.response('REQUESTERROR');
    return;
  }
  // 获取用户信息
  const dbUserData = await getManager().getRepository(User).find({ user_name: username });
  if (dbUserData.length === 0) {
    ctx.body = JsonHelper.response('USERNOTEXIST');
    return;
  }
  const dbRoleData = dbUserData[0].roels[0];
  ctx.body = JsonHelper.response('SUCCESS', dbRoleData)

}


export const test = async (ctx: Context, next: Next) => {
  ctx.body = JsonHelper.response('SUCCESS')
}
