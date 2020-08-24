"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
typeorm_1.createConnection().then(function (connection) { return tslib_1.__awaiter(void 0, void 0, void 0, function () {
    var user, users;
    return tslib_1.__generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Inserting a new user into the database...");
                user = new User_1.User();
                user.firstName = "Timber";
                user.lastName = "Saw";
                user.age = 25;
                return [4 /*yield*/, connection.manager.save(user)];
            case 1:
                _a.sent();
                console.log("Saved a new user with id: " + user.id);
                console.log("Loading users from the database...");
                return [4 /*yield*/, connection.manager.find(User_1.User)];
            case 2:
                users = _a.sent();
                console.log("Loaded users: ", users);
                console.log("Here you can setup and run express/koa/any other framework.");
                return [2 /*return*/];
        }
    });
}); }).catch(function (error) { return console.log(error); });
