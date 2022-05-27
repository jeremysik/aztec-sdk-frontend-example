"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutexDao = void 0;
const tslib_1 = require("tslib");
const typeorm_1 = require("typeorm");
let MutexDao = class MutexDao {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", String)
], MutexDao.prototype, "name", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Index)({ unique: false }),
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], MutexDao.prototype, "expiredAt", void 0);
MutexDao = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'mutex' })
], MutexDao);
exports.MutexDao = MutexDao;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0ZXhfZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RhdGFiYXNlL3NxbF9kYXRhYmFzZS9tdXRleF9kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHFDQUErRDtBQUcvRCxJQUFhLFFBQVEsR0FBckIsTUFBYSxRQUFRO0NBT3BCLENBQUE7QUFMQztJQURDLElBQUEsdUJBQWEsR0FBRTs7c0NBQ0s7QUFJckI7SUFGQyxJQUFBLGVBQUssRUFBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUN4QixJQUFBLGdCQUFNLEdBQUU7OzJDQUNpQjtBQU5mLFFBQVE7SUFEcEIsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLE9BQU8sRUFBRSxDQUFDO0dBQ2IsUUFBUSxDQU9wQjtBQVBZLDRCQUFRIn0=