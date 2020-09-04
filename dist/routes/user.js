"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var koa_router_1 = tslib_1.__importDefault(require("koa-router"));
var controllers = tslib_1.__importStar(require("../controllers/user"));
var userAuth_1 = require("../services/userAuth");
var router = new koa_router_1.default({
    prefix: '/api/v1/user'
});
// api/v1/user/login
router.post('/login', controllers.login);
// api/v1/user/add_user
router.post('/add_user', userAuth_1.checkUserRole('admin'), controllers.addUser);
// api/v1/user/delete_user
router.get('/delete_user', userAuth_1.checkUserRole('admin'), controllers.deleteUser);
// api/v1/user/logout
router.get('/logout', controllers.logout);
// api/v1/user/change_password
router.post('/change_password', controllers.changePassword);
// api/v1/user/test
router.get('/test', controllers.test, function (ctx, next) {
    console.log('test - middleware2');
    ctx.body = '';
});
exports.default = router;
