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

// api/v1/user/get_list
router.get('/get_list', checkUserRole('admin'), controllers.getUserlist)

// api/v1/user/get_role_list
router.get('/get_role_list', checkUserRole('admin'), controllers.getRoleList)

// api/v1/user/get_role_by_user_id
router.get('/get_role_by_user_id', controllers.getRoleByUserId)

// api/v1/user/logout
router.get('/logout', controllers.logout)

// api/v1/user/change_password
router.post('/change_password', controllers.changePassword)


// api/v1/user/downloadfile
router.get('/downloadfile', controllers.downloadfile)

export default router