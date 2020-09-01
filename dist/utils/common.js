"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkPasswordHash = exports.encrypt = void 0;
var tslib_1 = require("tslib");
var crypto_1 = tslib_1.__importDefault(require("crypto"));
var config_1 = tslib_1.__importDefault(require("../config"));
/**
 * @abstract 加密密码
 */
exports.encrypt = function (password) {
    var hmac = crypto_1.default.createHmac('sha256', config_1.default.secretKey);
    hmac.update(password);
    return hmac.digest('hex');
};
exports.checkPasswordHash = function (databasePassword, password) {
    console.log('password', password);
    console.log(databasePassword, exports.encrypt(password));
    return exports.encrypt(password) === databasePassword;
};
