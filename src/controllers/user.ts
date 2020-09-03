import { getManager } from 'typeorm';
import { Context, Next } from 'koa';
import { User } from '../entity/User';
import { Role } from '../entity/Role';
import { responseHelper, RESCODE } from '../utils/responseHelper';
import { checkPasswordHash, encrypt } from '../utils/common'
import { v4 as uuidV4 } from 'uuid'
import RedisHelper from '../utils/redisHelper';
import jwt from 'jsonwebtoken';
import config from '../config';

export const login = async (ctx: Context, next: Next) => {
  const { body: { username, passward } } = ctx.request;
  if (!username || !passward) {
    ctx.body = responseHelper(RESCODE.REQUESTERROR)
  }
  // 在数据库中查找相关的用户
  // `select * from user where user_name = username`
  const userRepository = getManager().getRepository(User);
  const result = await userRepository.find({ where: { user_name: username } })
  if (result.length === 0) {
    ctx.body = responseHelper(RESCODE.USERNOTEXIST);
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
    ctx.body = responseHelper(RESCODE.SUCCESS, result)
  } else {
    ctx.body = responseHelper(RESCODE.PASSWORDERROR)
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
  ctx.body = responseHelper(RESCODE.SUCCESS)
}

export const changePassword = (ctx: Context, next: Next) => {
  const { body } = ctx.request;


}

/**
 * @description 只有admin用户才有权限增加新用户
 */
export const addUser = async (ctx: Context, next: Next) => {
  const { body } = ctx.request;
  const { username, password, role_id } = body;
  if (!username || !password || !role_id) {
    ctx.body = responseHelper(RESCODE.REQUESTERROR)
    return;
  }
  // 先确定数据库是否已有此用户
  const userRepository = getManager().getRepository(User);
  const dbUser = await userRepository.find({ 'user_name': username });
  if (dbUser.length !== 0) {
    ctx.body = responseHelper(RESCODE.CUSTOMERROR, '', '用户已存在');
    return;
  } else {
    // 根据roleId寻找对应role
    const roleRepository = getManager().getRepository(Role);
    const dbRole = await roleRepository.findByIds([role_id]);
    if (dbRole.length === 0) {
      ctx.body = responseHelper(RESCODE.CUSTOMERROR, '', '用户角色不存在');
      return;
    }
    const newUser = new User();
    newUser.user_name = username;
    newUser.password = encrypt(password);
    newUser.roels = [...dbRole];
    const manager = getManager();
    await manager.save(newUser);
    ctx.body = responseHelper(RESCODE.SUCCESS);
  }

}

export const deleteUser = () => {

}

export const getUserlist = () => {

}


export const test = async (ctx: Context, next: Next) => {
  // ctx.body = responseHelper(RESCODE.SUCCESS)
  console.log('test - middleware1')
  await next()
}
