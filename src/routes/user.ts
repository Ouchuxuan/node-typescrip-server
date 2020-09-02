import Router from 'koa-router'
import * as controllers from '../controllers/user'


const router = new Router({
  prefix: '/api/v1/user'
})

// api/v1/user/login
router.post('/login', controllers.login)

// api/v1/user/add_user
router.post('/add_user', controllers.addUser)

// api/v1/user/logout
router.get('/logout', controllers.logout)

// api/v1/user/test
router.get('/test', controllers.test,(ctx, next)=>{
  console.log('test - middleware2')
  ctx.body = '1111'
})

export default router