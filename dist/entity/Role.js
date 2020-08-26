"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Role = /** @class */ (function () {
    function Role() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: 'int' }),
        tslib_1.__metadata("design:type", Number)
    ], Role.prototype, "id", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ type: 'varchar', length: 20, nullable: false }),
        tslib_1.__metadata("design:type", String)
    ], Role.prototype, "role_name", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ type: 'varchar', length: 255 }),
        tslib_1.__metadata("design:type", String)
    ], Role.prototype, "permission", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToMany(function (type) { return User_1.User; }, function (user) { return user.roels; }),
        tslib_1.__metadata("design:type", Array)
    ], Role.prototype, "users", void 0);
    Role = tslib_1.__decorate([
        typeorm_1.Entity()
    ], Role);
    return Role;
}());
exports.Role = Role;
