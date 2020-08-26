"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var koa_router_1 = tslib_1.__importDefault(require("koa-router"));
var router = new koa_router_1.default();
var user_1 = require("../controllers/user");
router.get('/user', function (ctx, next) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        user_1.addUser(ctx, next);
        return [2 /*return*/];
    });
}); });
exports.default = router;
