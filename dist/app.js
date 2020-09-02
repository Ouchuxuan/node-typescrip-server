"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var koa_1 = tslib_1.__importDefault(require("koa"));
require("reflect-metadata");
var path_1 = tslib_1.__importDefault(require("path"));
var koa_views_1 = tslib_1.__importDefault(require("koa-views"));
var koa_bodyparser_1 = tslib_1.__importDefault(require("koa-bodyparser"));
var typeorm_1 = require("typeorm");
var index_1 = tslib_1.__importDefault(require("./routes/index"));
var log_1 = tslib_1.__importDefault(require("./middlewares/log"));
var tokenAuth_1 = tslib_1.__importDefault(require("./middlewares/tokenAuth"));
var config_1 = tslib_1.__importDefault(require("./config"));
// class-validator 用于表单校验
var app = new koa_1.default();
// middlewares
app.use(log_1.default());
// 配置静态web服务器的中间件
app.use(koa_bodyparser_1.default());
app.use(koa_views_1.default(path_1.default.join(__dirname, '../src/views'), {
    extension: 'html'
}));
// databases
var connectDatabase = function () { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var error_1;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, typeorm_1.createConnection()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error(error_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
connectDatabase();
// logger&&错误捕捉
app.use(function (ctx, next) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var error_2;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                // 开始进入到下一个中间件
                if (ctx.status === 404) {
                    ctx.throw(404);
                }
                // 记录响应日志
                ctx.logger.logResponse(ctx, new Date());
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                // 记录异常日志
                ctx.logger.logError(ctx, error_2, new Date());
                console.error(error_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.use(tokenAuth_1.default(/\/login/));
// router
index_1.default.forEach(function (router) {
    app.use(router.routes()).use(router.allowedMethods());
});
app.listen(config_1.default.port);
console.log("server is listening at port " + config_1.default.port);
