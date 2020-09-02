"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHelper = exports.RESCODE = void 0;
var tslib_1 = require("tslib");
var responseCode_1 = tslib_1.__importDefault(require("./responseCode"));
exports.RESCODE = {
    SUCCESS: "请求成功",
    CUSTOMERROR: "自定义错误",
    NOLOGIN: '用户未登陆',
    USERNOTEXIST: '用户不存在',
    TOKENEXPIRED: 'token 过期',
    PASSWORDERROR: '密码错误',
    VERTIFYERROR: '验证码错误',
    REQUESTERROR: "请求参数/格式错误",
    NOAUTH: "没有权限",
    NOTEXIST: "资源不存在",
    SERVICEERROR: "服务器异常",
};
exports.responseHelper = function (code, data) {
    if (code === void 0) { code = "SUCCESS"; }
    if (data === void 0) { data = null; }
    return {
        code: code,
        data: data,
        message: responseCode_1.default[code]
    };
};
