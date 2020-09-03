import { getManager } from 'typeorm';
import { Context, Next } from 'koa';
import { User } from '../entity/User';
import config from '../config'
import jwt from 'jsonwebtoken';
import { responseHelper, RESCODE } from '../utils/responseHelper';

/**
 * @description 检查操作者的用户身份,判断用户是否含有某种身份
 */
export const checkUserRole = (...roleName: string[]) => {
  return async (ctx: Context, next: Next,) => {
    // 根据token获取用户id,然后在数据库查找该用户的角色
    const clientToken = ctx.request.header['authorization'];
    const userData = jwt.verify(clientToken, config.secretKey);
    const userId = (userData as any).id;
    const userRepository = getManager().getRepository(User);
    // 获取该用户的所有身份
    const dbUserData = await userRepository.findByIds([userId]);
    if (!dbUserData.length) {
      ctx.body = responseHelper(RESCODE.NOAUTH);
      return;
    }
    const dbRoleList = dbUserData[0].roels.map(item => item.role_name)
    let isMatch = false;
    roleName.forEach(role => {
      if (dbRoleList.includes(role)) {
        isMatch = true;
      }
    })
    console.log('isMath', isMatch)
    if (isMatch) {
      await next()
    } else {
      ctx.body = responseHelper(RESCODE.NOAUTH);
    }
  }
}