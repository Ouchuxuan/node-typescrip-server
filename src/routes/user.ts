import Router from 'koa-router'
const router = new Router({
  prefix: '/api/v1/user'
})
import { addUser, login } from '../controllers/user'

// api/v1/user/login
router.post('/login', (ctx, next) => {
  login(ctx, next)
})

export default router