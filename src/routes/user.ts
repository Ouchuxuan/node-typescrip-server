import Router from 'koa-router'
import * as controllers from '../controllers/user'
import { checkUserRole } from '../services/userAuth';


const router = new Router({
  prefix: '/api/v1/user'
})

// api/v1/user/login
router.post('/login', controllers.login)

// api/v1/user/add_user
router.post('/add_user', checkUserRole('admin'), controllers.addUser)

// api/v1/user/delete_user
router.get('/delete_user', checkUserRole('admin'), controllers.deleteUser)

// api/v1/user/logout
router.get('/logout', controllers.logout)

// api/v1/user/change_password
router.post('/change_password', controllers.changePassword)


// api/v1/user/test
router.get('/test', controllers.test, (ctx, next) => {
  console.log('test - middleware2')
  ctx.body = ''
})

export default router