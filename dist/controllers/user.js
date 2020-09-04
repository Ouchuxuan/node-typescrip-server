"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = exports.getUserlist = exports.deleteUser = exports.addUser = exports.changePassword = exports.logout = exports.login = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var Role_1 = require("../entity/Role");
var responseHelper_1 = tslib_1.__importDefault(require("../utils/responseHelper"));
var common_1 = require("../utils/common");
var uuid_1 = require("uuid");
var redisHelper_1 = tslib_1.__importDefault(require("../utils/redisHelper"));
var jsonwebtoken_1 = tslib_1.__importDefault(require("jsonwebtoken"));
var config_1 = tslib_1.__importDefault(require("../config"));
exports.login = function (ctx, next) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _a, username, passward, userRepository, result, databaseUsername, databasePassword, userId, idCard, userToken, redis, key, result_1;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.request.body, username = _a.username, passward = _a.passward;
                if (!username || !passward) {
                    ctx.body = responseHelper_1.default.response("REQUESTERROR");
                }
                userRepository = typeorm_1.getManager().getRepository(User_1.User);
                return [4 /*yield*/, userRepository.find({ where: { user_name: username } })];
            case 1:
                result = _b.sent();
                if (result.length === 0) {
                    ctx.body = responseHelper_1.default.response('USERNOTEXIST');
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
                    ctx.body = responseHelper_1.default.response('SUCCESS', result_1);
                }
                else {
                    ctx.body = responseHelper_1.default.response('PASSWORDERROR');
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
    ctx.body = responseHelper_1.default.response();
};
exports.changePassword = function (ctx, next) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _a, username, password, old_password, manager, dbUserData, dbPassword;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.request.body, username = _a.username, password = _a.password, old_password = _a.old_password;
                if (!username || !password || !old_password) {
                    ctx.body = responseHelper_1.default.response("REQUESTERROR");
                    return [2 /*return*/];
                }
                manager = typeorm_1.getManager();
                return [4 /*yield*/, manager.getRepository(User_1.User).find({ user_name: username })];
            case 1:
                dbUserData = _b.sent();
                if (dbUserData.length === 0) {
                    ctx.body = responseHelper_1.default.response("USERNOTEXIST");
                    return [2 /*return*/];
                }
                dbPassword = dbUserData[0].password;
                if (common_1.encrypt(old_password) !== dbPassword) {
                    ctx.body = responseHelper_1.default.response("PASSWORDERROR");
                    return [2 /*return*/];
                }
                return [4 /*yield*/, manager.update(User_1.User, { user_name: username }, { password: common_1.encrypt(password) })];
            case 2:
                _b.sent();
                ctx.body = responseHelper_1.default.response();
                return [2 /*return*/];
        }
    });
}); };
/**
 * @description 只有admin用户才有权限增加新用户
 */
exports.addUser = function (ctx, next) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var body, username, password, role_id, userRepository, dbUser, roleRepository, dbRole, newUser, manager;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = ctx.request.body;
                username = body.username, password = body.password, role_id = body.role_id;
                if (!username || !password || !role_id) {
                    ctx.body = responseHelper_1.default.response("REQUESTERROR");
                    return [2 /*return*/];
                }
                userRepository = typeorm_1.getManager().getRepository(User_1.User);
                return [4 /*yield*/, userRepository.find({ 'user_name': username })];
            case 1:
                dbUser = _a.sent();
                if (!(dbUser.length !== 0)) return [3 /*break*/, 2];
                ctx.body = responseHelper_1.default.custom('用户已存在');
                return [2 /*return*/];
            case 2:
                roleRepository = typeorm_1.getManager().getRepository(Role_1.Role);
                return [4 /*yield*/, roleRepository.findByIds([role_id])];
            case 3:
                dbRole = _a.sent();
                if (dbRole.length === 0) {
                    ctx.body = responseHelper_1.default.custom('用户角色不存在');
                    return [2 /*return*/];
                }
                newUser = new User_1.User();
                newUser.user_name = username;
                newUser.password = common_1.encrypt(password);
                newUser.roels = tslib_1.__spreadArrays(dbRole);
                manager = typeorm_1.getManager();
                return [4 /*yield*/, manager.save(newUser)];
            case 4:
                _a.sent();
                ctx.body = responseHelper_1.default.response('SUCCESS');
                _a.label = 5;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteUser = function (ctx, next) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var _a, user_id, role_id, manager;
    return tslib_1.__generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = ctx.request.query, user_id = _a.user_id, role_id = _a.role_id;
                if (!user_id || !role_id) {
                    ctx.body = responseHelper_1.default.response("REQUESTERROR");
                }
                manager = typeorm_1.getManager();
                // 1.删除中间表的记录；
                return [4 /*yield*/, manager.createQueryBuilder().relation(User_1.User, 'roels').of(user_id).remove(role_id)];
            case 1:
                // 1.删除中间表的记录；
                _b.sent();
                // 2.删除角色表的记录
                return [4 /*yield*/, manager.createQueryBuilder().delete().from(User_1.User).where('id=:user_id', { user_id: user_id }).execute()];
            case 2:
                // 2.删除角色表的记录
                _b.sent();
                ctx.body = responseHelper_1.default.response();
                return [2 /*return*/];
        }
    });
}); };
exports.getUserlist = function () {
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
                return [2 /*return*/];
        }
    });
}); };
