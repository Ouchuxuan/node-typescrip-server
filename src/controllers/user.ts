import { getManager } from 'typeorm';
import { Context, Next } from 'koa';
import { User } from '../entity/User';
import { responseHelper, RESCODE } from '../utils/responseHelper';
import { checkPasswordHash } from '../utils/common'
import { v4 as uuidV4 } from 'uuid'
import RedisHelper from '../utils/redisHelper';
import jwt from 'jsonwebtoken';
import config from '../config';
import { checkUserRole } from '../services/userAuth';

export const addUser = (ctx: Context, next: Next) => {
  const userRepository = getManager().getRepository(User);
  const UserModel = new User;
  const randomName = Math.floor(Math.random() * 1000);
  UserModel.user_name = `xiaoming${randomName}`
  UserModel.password = '123456'
  userRepository.save(UserModel)
  ctx.body = '数据更新成功'
}

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


export const test = async (ctx: Context, next: Next) => {
  // ctx.body = responseHelper(RESCODE.SUCCESS)
  console.log('test - middleware1')
  await next()
  console.log(1111)
}
