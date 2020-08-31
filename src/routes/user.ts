import Router from 'koa-router'
import { login, addUser } from '../controllers/user'


const router = new Router({
  prefix: '/api/v1/user'
})

// api/v1/user/login
router.post('/login', login)

// api/v1/user/add_user
router.post('/add_user', addUser)

export default router