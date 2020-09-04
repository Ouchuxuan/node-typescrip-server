"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var tslib_1 = require("tslib");
var typeorm_1 = require("typeorm");
var Role_1 = require("./Role");
// User与Role是多对多的关系
var User = /** @class */ (function () {
    function User() {
    }
    tslib_1.__decorate([
        typeorm_1.PrimaryGeneratedColumn({ type: 'int' }),
        tslib_1.__metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ type: 'varchar', length: 20, unique: true }),
        tslib_1.__metadata("design:type", String)
    ], User.prototype, "user_name", void 0);
    tslib_1.__decorate([
        typeorm_1.Column({ type: 'varchar', length: 120 }),
        tslib_1.__metadata("design:type", String)
    ], User.prototype, "password", void 0);
    tslib_1.__decorate([
        typeorm_1.CreateDateColumn(),
        tslib_1.__metadata("design:type", Date)
    ], User.prototype, "create_time", void 0);
    tslib_1.__decorate([
        typeorm_1.ManyToMany(function (type) { return Role_1.Role; }, function (role) { return role.users; }, {
            eager: true,
            cascade: true
        }),
        typeorm_1.JoinTable(),
        tslib_1.__metadata("design:type", Array)
    ], User.prototype, "roels", void 0);
    User = tslib_1.__decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
