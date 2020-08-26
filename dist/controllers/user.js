"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addUser = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
exports.addUser = function (ctx, next) {
    var userRepository = typeorm_1.getManager().getRepository(User_1.User);
    var UserModel = new User_1.User;
    UserModel.user_name = "xiaoming";
    UserModel.password = '123456';
    userRepository.save(UserModel);
    ctx.body = '数据更新成功';
};
