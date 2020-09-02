"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.logout = exports.login = exports.addUser = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var responseHelper_1 = require("../utils/responseHelper");
var common_1 = require("../utils/common");
var uuid_1 = require("uuid");
var redisHelper_1 = tslib_1.__importDefault(require("../utils/redisHelper"));
var jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
var config_1 = tslib_1.__importDefault(require("../config"));
exports.addUser = function (ctx, next) {
    var userRepository = typeorm_1.getManager().getRepository(User_1.User);
    var UserModel = new User_1.User;
    var randomName = Math.floor(Math.random() * 1000);
    UserModel.user_name = "xiaoming" + randomName;
    UserModel.password = '123456';
    userRepository.save(UserModel);
    ctx.body = '数据更新成功';
};
exports.login = function (ctx, next) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _a, username, passward, userRepository, result, databaseUsername, databasePassword, userId, idCard, userToken, redis, key, result_1;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.request.body, username = _a.username, passward = _a.passward;
                if (!username || !passward) {
                    ctx.body = responseHelper_1.responseHelper(responseHelper_1.RESCODE.REQUESTERROR);
                }
                userRepository = typeorm_1.getManager().getRepository(User_1.User);
                return [4 /*yield*/, userRepository.find({ where: { user_name: username } })];
            case 1:
                result = _b.sent();
                if (result.length === 0) {
                    ctx.body = responseHelper_1.responseHelper(responseHelper_1.RESCODE.USERNOTEXIST);
                    return [2 /*return*/];
                }
                databaseUsername = result[0].user_name;
                databasePassword = result[0].password;
                userId = result[0].id;
                if (common_1.checkPasswordHash(databasePassword, passward)) {
                    idCard = uuid_1.v4();
                    userToken = jsonwebtoken_1.default.sign({
                        id: userId,
                        id_card: idCard
                    }, config_1.default.secretKey, {
                        expiresIn: '356d',
                    });
                    redis = new redisHelper_1.default(0);
                    key = "session:" + idCard;
                    redis.set(key, 1, 60 * 60);
                    result_1 = {
                        token: userToken,
                        username: databaseUsername
                    };
                    ctx.body = responseHelper_1.responseHelper(responseHelper_1.RESCODE.SUCCESS, result_1);
                }
                else {
                    ctx.body = responseHelper_1.responseHelper(responseHelper_1.RESCODE.PASSWORDERROR);
                }
                return [2 /*return*/];
        }
    });
}); };
exports.logout = function (ctx, next) {
    var clientToken = ctx.request.header['authorization'];
    // 通过token的payload获取id_card，在redis里面删掉,然后成功登出
    var userData = jsonwebtoken_1.default.verify(clientToken, config_1.default.secretKey);
    var idCard = userData.id_card;
    var redis = new redisHelper_1.default(0);
    var key = "session:" + idCard;
    redis.delete(key);
    ctx.body = responseHelper_1.responseHelper(responseHelper_1.RESCODE.SUCCESS);
};
exports.test = function (ctx, next) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                // ctx.body = responseHelper(RESCODE.SUCCESS)
                console.log('test - middleware1');
                return [4 /*yield*/, next()];
            case 1:
                _a.sent();
                console.log(1111);
                return [2 /*return*/];
        }
    });
}); };
