"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var front_1 = tslib_1.__importDefault(require("./front"));
var user_1 = tslib_1.__importDefault(require("./user"));
var appRouter = [
    front_1.default,
    user_1.default,
];
exports.default = appRouter;
