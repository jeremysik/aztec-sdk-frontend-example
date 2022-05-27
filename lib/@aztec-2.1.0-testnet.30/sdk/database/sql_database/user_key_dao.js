"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserKeyDao = void 0;
const tslib_1 = require("tslib");
const account_id_1 = require("@aztec/barretenberg/account_id");
const typeorm_1 = require("typeorm");
const database_1 = require("../database");
const transformer_1 = require("./transformer");
let UserKeyDao = class UserKeyDao {
    constructor(init) {
        Object.assign(this, init);
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Buffer)
], UserKeyDao.prototype, "key", void 0);
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)('blob', { transformer: [transformer_1.accountIdTransformer] }),
    tslib_1.__metadata("design:type", account_id_1.AccountId)
], UserKeyDao.prototype, "accountId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], UserKeyDao.prototype, "treeIndex", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Buffer)
], UserKeyDao.prototype, "hashPath", void 0);
UserKeyDao = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'userKey' }),
    (0, typeorm_1.Index)(['key', 'accountId'], { unique: true }),
    tslib_1.__metadata("design:paramtypes", [database_1.SigningKey])
], UserKeyDao);
exports.UserKeyDao = UserKeyDao;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9rZXlfZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RhdGFiYXNlL3NxbF9kYXRhYmFzZS91c2VyX2tleV9kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtEQUEyRDtBQUMzRCxxQ0FBK0Q7QUFDL0QsMENBQXlDO0FBQ3pDLCtDQUFxRDtBQUlyRCxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0lBQ3JCLFlBQVksSUFBaUI7UUFDM0IsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQWFGLENBQUE7QUFWQztJQURDLElBQUEsdUJBQWEsR0FBRTtzQ0FDSCxNQUFNO3VDQUFDO0FBR3BCO0lBREMsSUFBQSx1QkFBYSxFQUFDLE1BQU0sRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLGtDQUFvQixDQUFDLEVBQUUsQ0FBQztzQ0FDNUMsc0JBQVM7NkNBQUM7QUFHN0I7SUFEQyxJQUFBLGdCQUFNLEdBQUU7OzZDQUNpQjtBQUcxQjtJQURDLElBQUEsZ0JBQU0sR0FBRTtzQ0FDUyxNQUFNOzRDQUFDO0FBZmQsVUFBVTtJQUZ0QixJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLENBQUM7SUFDM0IsSUFBQSxlQUFLLEVBQUMsQ0FBQyxLQUFLLEVBQUUsV0FBVyxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7NkNBRXpCLHFCQUFVO0dBRGxCLFVBQVUsQ0FnQnRCO0FBaEJZLGdDQUFVIn0=