import Router from 'koa-router'

const router = new Router()

router.get('/',(ctx, next)=>{
  ctx.body = '哈哈哈哈111111'
} )

export default router
