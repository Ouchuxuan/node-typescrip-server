import { getManager } from 'typeorm';
import * as Koa from 'koa'
import { User } from '../entity/User';

export const addUser = (ctx: Koa.BaseContext, next: Koa.Next) => {
  const userRepository = getManager().getRepository(User);
  const UserModel = new User;
  UserModel.user_name = "xiaoming"
  UserModel.password = '1234561'
  userRepository.save(UserModel)
  ctx.body = '数据更新成功'
}