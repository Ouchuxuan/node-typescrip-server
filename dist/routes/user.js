"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var koa_router_1 = tslib_1.__importDefault(require("koa-router"));
var user_1 = require("../controllers/user");
var router = new koa_router_1.default({
    prefix: '/api/v1/user'
});
// api/v1/user/login
router.post('/login', user_1.login);
// api/v1/user/add_user
router.post('/add_user', user_1.addUser);
exports.default = router;
