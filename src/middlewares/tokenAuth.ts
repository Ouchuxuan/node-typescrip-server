import { Context, Next } from 'koa';
import RedisHelper from '../utils/redisHelper';
import { responseHelper, RESCODE } from '../utils/responseHelper';
import jwt from 'jsonwebtoken';
import config from '../config'

type mathType = string | RegExp


/**
 * @description 路由token权限控制,token过期登出,token不过期则await next
 */
export default (whitePath: mathType = '') => {
  return async (ctx: Context, next: Next) => {
    // 如果匹配到的路由是登录，则跳出权限检测
    if (whitePath) {
      const isReg = whitePath instanceof RegExp;
      const url = ctx.URL.href
      let isMatch = false;
      if (isReg) {
        isMatch = (whitePath as RegExp).test(url);
      } else {
        isMatch = whitePath === url
      }
      if (isMatch) {
        await next();
        return;
      }
    }
    const clientToken = ctx.request.header['authorization'];
    if (!clientToken) {
      ctx.body = responseHelper(RESCODE.NOAUTH);
      return;
    }
    const userData = jwt.verify(clientToken, config.secretKey);
    const idCard = (userData as any).id_card;
    const redis = new RedisHelper(0);
    const key = `session:${idCard}`;
    const redisUserData = redis.get(key);
    if (!redisUserData) {
      ctx.body = responseHelper(RESCODE.TOKENEXPIRED);
      return;
    }
    await next();
  }
}
