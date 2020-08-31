import { getManager } from 'typeorm';
import { Context, Next } from 'koa';
import { User } from '../entity/User';
import { responseHelper } from '../utils/responseHelper';
import jwt from 'jsonwebtoken';

// export const addUser = (ctx: Context, next: Next) => {
//   const userRepository = getManager().getRepository(User);
//   const UserModel = new User;
//   const randomName = Math.floor(Math.random() * 1000);
//   console.log(randomName)
//   UserModel.user_name = `xiaoming${randomName}`
//   UserModel.password = '123456'
//   userRepository.save(UserModel)
//   ctx.body = '数据更新成功'
// }

export const addUser = (ctx: Context, next: Next) => {
  const userRepository = getManager().getRepository(User);
  const UserModel = new User;
  const randomName = Math.floor(Math.random() * 1000);
  console.log(randomName)
  UserModel.user_name = `xiaoming${randomName}`
  UserModel.password = '123456'
  userRepository.save(UserModel)
  ctx.body = '数据更新成功'
}

export const login = (ctx: Context, next: Next) => {
  const { body } = ctx.request;
  ctx.body = responseHelper(200, body)
}
