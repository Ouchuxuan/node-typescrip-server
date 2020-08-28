"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseHelper = void 0;
var tslib_1 = require("tslib");
var responseCode_1 = tslib_1.__importDefault(require("./responseCode"));
exports.responseHelper = function (code, data) {
    if (code === void 0) { code = 200; }
    if (data === void 0) { data = null; }
    return {
        code: code,
        data: data,
        message: responseCode_1.default[code]
    };
};
