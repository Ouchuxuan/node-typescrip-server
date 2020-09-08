"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var redisHelper_1 = tslib_1.__importDefault(require("../utils/redisHelper"));
var responseHelper_1 = tslib_1.__importDefault(require("../utils/responseHelper"));
var jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
var config_1 = tslib_1.__importDefault(require("../config"));
/**
 * @description 路由token权限控制,token过期登出,token不过期则await next
 */
exports.default = (function () {
    var whitePath = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        whitePath[_i] = arguments[_i];
    }
    return function (ctx, next) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var isMatch, _i, whitePath_1, path, isReg, url, clientToken, userData, idCard, redis, key, redisUserData;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!(whitePath.length >= 0)) return [3 /*break*/, 2];
                    isMatch = false;
                    for (_i = 0, whitePath_1 = whitePath; _i < whitePath_1.length; _i++) {
                        path = whitePath_1[_i];
                        isReg = path instanceof RegExp;
                        url = ctx.URL.href;
                        if (isReg) {
                            isMatch = path.test(url);
                        }
                        else {
                            isMatch = path === url;
                        }
                        if (isMatch)
                            break;
                    }
                    if (!isMatch) return [3 /*break*/, 2];
                    return [4 /*yield*/, next()];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
                case 2:
                    clientToken = ctx.request.header['authorization'];
                    if (!clientToken) {
                        ctx.body = responseHelper_1.default.response('NOAUTH');
                        return [2 /*return*/];
                    }
                    userData = jsonwebtoken_1.default.verify(clientToken, config_1.default.secretKey);
                    idCard = userData.id_card;
                    redis = new redisHelper_1.default(0);
                    key = "session:" + idCard;
                    redisUserData = redis.get(key);
                    if (!redisUserData) {
                        ctx.body = responseHelper_1.default.response('TOKENEXPIRED');
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, next()];
                case 3:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    }); };
});
