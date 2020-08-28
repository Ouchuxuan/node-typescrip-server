"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var koa_router_1 = tslib_1.__importDefault(require("koa-router"));
var router = new koa_router_1.default({
    prefix: '/api/v1/user'
});
var user_1 = require("../controllers/user");
// api/v1/user/login
router.post('/login', function (ctx, next) {
    user_1.login(ctx, next);
});
exports.default = router;
