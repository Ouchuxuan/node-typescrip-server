"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.addUser = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var responseHelper_1 = require("../utils/responseHelper");
// export const addUser = (ctx: Context, next: Next) => {
//   const userRepository = getManager().getRepository(User);
//   const UserModel = new User;
//   const randomName = Math.floor(Math.random() * 1000);
//   console.log(randomName)
//   UserModel.user_name = `xiaoming${randomName}`
//   UserModel.password = '123456'
//   userRepository.save(UserModel)
//   ctx.body = '数据更新成功'
// }
exports.addUser = function (ctx, next) {
    var userRepository = typeorm_1.getManager().getRepository(User_1.User);
    var UserModel = new User_1.User;
    var randomName = Math.floor(Math.random() * 1000);
    console.log(randomName);
    UserModel.user_name = "xiaoming" + randomName;
    UserModel.password = '123456';
    userRepository.save(UserModel);
    ctx.body = '数据更新成功';
};
exports.login = function (ctx, next) {
    var body = ctx.request.body;
    ctx.body = responseHelper_1.responseHelper(200, body);
};
