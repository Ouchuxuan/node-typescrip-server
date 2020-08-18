import Router from 'koa-router'
import * as Koa from 'koa'
const router = new Router()

router.get('/', async (ctx, next) => {
  console.log(ctx)
  // ctx.response.header['Content-Type'] = 'text/html';
  ctx.body = '111111'

})

router.get('/a', async (ctx: Koa.ParameterizedContext, next) => {
  await ctx.render('index')
})

export default router
