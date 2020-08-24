import Router from 'koa-router'
import * as Koa from 'koa'
const router = new Router()

router.get('/user', async (ctx:Koa.BaseContext) => {
  ctx.body = '用户API'
})

export default router