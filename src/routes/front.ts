import Router from 'koa-router'
import { Context, Next } from 'koa';
const router = new Router()

router.get('/', async (ctx:Context) => {
  await ctx.render('index')
})

export default router