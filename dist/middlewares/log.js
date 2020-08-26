"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var log_config_1 = tslib_1.__importDefault(require("../config/log-config"));
var log4js = tslib_1.__importStar(require("log4js"));
var moment_1 = tslib_1.__importDefault(require("moment"));
// 加载配置文件
log4js.configure(log_config_1.default);
var logUtil = {};
// 调用预先定义的日志名称
var resLogger = log4js.getLogger('resLogger');
var reqLogger = log4js.getLogger('http');
var errorLogger = log4js.getLogger('errorLogger');
var consoleLogger = log4js.getLogger();
// 封装错误日志
logUtil.logError = function (ctx, error, resTime) {
    if (ctx && error) {
        errorLogger.error(formatError(ctx, error, resTime));
    }
};
// 封装请求日志
logUtil.reqLog = function (ctx, resTime) {
    if (ctx) {
        reqLogger.info(formatReqLog(ctx.request, resTime));
    }
};
// 封装响应日志
logUtil.logResponse = function (ctx, resTime) {
    if (ctx) {
        resLogger.info(formatRes(ctx, resTime));
    }
};
logUtil.logInfo = function (info) {
    if (info) {
        consoleLogger.info(formatInfo(info));
    }
};
var formatInfo = function (info) {
    var logText = '';
    // 响应日志开始
    logText += '\n' + '***************info log start ***************' + '\n';
    // 响应内容
    logText += 'info detail: ' + '\n' + JSON.stringify(info) + '\n';
    // 响应日志结束
    logText += '*************** info log end ***************' + '\n';
    return logText;
};
// 格式化响应日志
var formatRes = function (ctx, resTime) {
    var logText = '';
    // 响应日志开始
    logText += '\n' + '*************** response log start ***************' + '\n';
    // 添加请求日志
    logText += formatReqLog(ctx.request, resTime);
    // 响应状态码
    logText += 'response status: ' + ctx.status + '\n';
    // 响应内容
    logText += 'response body: ' + '\n' + JSON.stringify(ctx.body) + '\n';
    // 响应日志结束
    logText += '*************** response log end ***************' + '\n';
    return logText;
};
// 格式化请求日志
var formatReqLog = function (req, resTime) {
    var formatRestime = moment_1.default(resTime).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
    var logText = '';
    var method = req.method;
    // 访问方法
    logText += '\n' + 'request method: ' + method + '\n';
    // 请求原始地址
    logText += 'request originalUrl:  ' + req.originalUrl + '\n';
    // 客户端ip
    logText += 'request client ip:  ' + req.ip + '\n';
    // 请求参数
    if (method === 'GET') {
        logText += 'request query:  ' + JSON.stringify(req.query) + '\n';
    }
    else {
        logText += 'request body: ' + '\n' + JSON.stringify(req.body) + '\n';
    }
    // 服务器响应时间
    logText += 'response time: ' + formatRestime + '\n';
    return logText;
};
// 格式化错误日志
var formatError = function (ctx, err, resTime) {
    var logText = '';
    // 错误信息开始
    logText += '\n' + '*************** error log start ***************' + '\n';
    // 添加请求日志
    logText += formatReqLog(ctx.request, resTime);
    // 错误名称
    logText += 'err name: ' + err.name + '\n';
    // 错误信息
    logText += 'err message: ' + err.message + '\n';
    // 错误详情
    logText += 'err stack: ' + err.stack + '\n';
    // 错误信息结束
    logText += '*************** error log end ***************' + '\n';
    return logText;
};
exports.default = (function () {
    return function (ctx, next) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    ctx.logger = logUtil;
                    ctx.logger.reqLog(ctx, new Date());
                    return [4 /*yield*/, next()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
});
