"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var koa_1 = tslib_1.__importDefault(require("koa"));
require("reflect-metadata");
var path_1 = tslib_1.__importDefault(require("path"));
var koa_views_1 = tslib_1.__importDefault(require("koa-views"));
var koa_bodyparser_1 = tslib_1.__importDefault(require("koa-bodyparser"));
var index_1 = tslib_1.__importDefault(require("./routes/index"));
var app = new koa_1.default();
// 配置静态web服务器的中间件
app.use(koa_bodyparser_1.default());
app.use(koa_views_1.default(path_1.default.join(__dirname, '../src/views'), {
    extension: 'html'
}));
app
    .use(index_1.default.routes())
    .use(index_1.default.allowedMethods());
app.listen(3000);
console.log('server is listening at port 3000');
