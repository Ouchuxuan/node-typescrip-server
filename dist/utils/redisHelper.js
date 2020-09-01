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
                switch (_a.label) {
                    case 0:
                        if (!time) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.redisInstance.set(key, value, 'EX', time)];
                    case 1:
                        _a.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.redisInstance.set(key, value, 'EX')];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RedisHelper.prototype.get = function (key) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.redisInstance.get(key)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return RedisHelper;
}());
exports.default = RedisHelper;
