"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    mysqlConfig: {
        host: 'localhost',
        port: '3306',
        protocol: 'tcp',
        dialect: 'mysql',
        pool: {
            max: 5,
            min: 0,
            idle: 10000 //  连接空置时间（毫秒），超时后将释放连接
        },
        retry: {
            max: 3 //  设置重试次数
        },
        omitNull: false,
        timezone: '+08:00' //  解决时差 - 默认存储时间存在8小时误差
    },
    redisConfig: {
        port: 6379,
        password: 'yundun2733',
        host: '127.0.0.1',
    },
    port: 8090,
    secretKey: 'you see you one day day de'
};
