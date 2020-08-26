import Router from 'koa-router'
const router = new Router()
import { addUser } from '../controllers/user'

router.get('/user', async (ctx, next) => {
  addUser(ctx, next)
})

export default router