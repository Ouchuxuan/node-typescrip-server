"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var ioredis_1 = tslib_1.__importDefault(require("ioredis"));
var config_1 = tslib_1.__importDefault(require("../config"));
var RedisHelper = /** @class */ (function () {
    function RedisHelper(db) {
        if (db === void 0) { db = 0; }
        this.db = db;
        this.init();
    }
    RedisHelper.prototype.init = function () {
        this.redisInstance = new ioredis_1.default({
            port: config_1.default.redisConfig.port,
            host: config_1.default.redisConfig.host,
            db: this.db,
            password: config_1.default.redisConfig.password
        });
    };
    RedisHelper.prototype.set = function (key, value, time) {
        if (time === void 0) { time = 0; }
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                if (time) {
                    //  await this.redisInstance.set(key, value, time)
                }
                else {
                }
                return [2 /*return*/];
            });
        });
    };
    return RedisHelper;
}());
