"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkUserRole = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var config_1 = tslib_1.__importDefault(require("../config"));
var jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
var responseHelper_1 = require("../utils/responseHelper");
/**
 * @description 检查操作者的用户身份,判断用户是否含有某种身份
 */
exports.checkUserRole = function (ctx, next) {
    var roleName = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        roleName[_i - 2] = arguments[_i];
    }
    return tslib_1.__awaiter(void 0, void 0, void 0, function () {
        var clientToken, userData, userId, userRepository, dbUserData, dbRoleList, isMatch;
        return tslib_1.__generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    clientToken = ctx.request.header['authorization'];
                    userData = jsonwebtoken_1.default.verify(clientToken, config_1.default.secretKey);
                    userId = userData.id;
                    userRepository = typeorm_1.getManager().getRepository(User_1.User);
                    return [4 /*yield*/, userRepository.findByIds([userId])];
                case 1:
                    dbUserData = _a.sent();
                    if (!dbUserData.length) {
                        ctx.body = responseHelper_1.responseHelper(responseHelper_1.RESCODE.NOAUTH);
                        return [2 /*return*/];
                    }
                    dbRoleList = dbUserData[0].roels;
                    isMatch = false;
                    roleName.forEach(function (role) {
                        if (role in dbRoleList) {
                            isMatch = true;
                        }
                    });
                    if (!isMatch) return [3 /*break*/, 3];
                    return [4 /*yield*/, next()];
                case 2:
                    _a.sent();
                    return [3 /*break*/, 4];
                case 3:
                    ctx.body = responseHelper_1.responseHelper(responseHelper_1.RESCODE.NOAUTH);
                    _a.label = 4;
                case 4: return [2 /*return*/];
            }
        });
    });
};
