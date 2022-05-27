"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDataDao = void 0;
const tslib_1 = require("tslib");
const account_id_1 = require("@aztec/barretenberg/account_id");
const address_1 = require("@aztec/barretenberg/address");
const typeorm_1 = require("typeorm");
const transformer_1 = require("./transformer");
let UserDataDao = class UserDataDao {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)('blob', { transformer: [transformer_1.accountIdTransformer] }),
    tslib_1.__metadata("design:type", account_id_1.AccountId)
], UserDataDao.prototype, "id", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('blob', { transformer: [transformer_1.grumpkinAddressTransformer] }),
    tslib_1.__metadata("design:type", address_1.GrumpkinAddress)
], UserDataDao.prototype, "publicKey", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Buffer)
], UserDataDao.prototype, "privateKey", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], UserDataDao.prototype, "accountNonce", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('blob', { nullable: true, transformer: [transformer_1.aliasHashTransformer] }),
    tslib_1.__metadata("design:type", account_id_1.AliasHash)
], UserDataDao.prototype, "aliasHash", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], UserDataDao.prototype, "syncedToRollup", void 0);
UserDataDao = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'userData' }),
    (0, typeorm_1.Index)(['publicKey', 'accountNonce'], { unique: true })
], UserDataDao);
exports.UserDataDao = UserDataDao;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9kYXRhX2Rhby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kYXRhYmFzZS9zcWxfZGF0YWJhc2UvdXNlcl9kYXRhX2Rhby50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsK0RBQXNFO0FBQ3RFLHlEQUE4RDtBQUM5RCxxQ0FBK0Q7QUFFL0QsK0NBQXVHO0FBSXZHLElBQWEsV0FBVyxHQUF4QixNQUFhLFdBQVc7Q0FrQnZCLENBQUE7QUFoQkM7SUFEQyxJQUFBLHVCQUFhLEVBQUMsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsa0NBQW9CLENBQUMsRUFBRSxDQUFDO3NDQUNuRCxzQkFBUzt1Q0FBQztBQUd0QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQyx3Q0FBMEIsQ0FBQyxFQUFFLENBQUM7c0NBQzNDLHlCQUFlOzhDQUFDO0FBR25DO0lBREMsSUFBQSxnQkFBTSxHQUFFO3NDQUNXLE1BQU07K0NBQUM7QUFHM0I7SUFEQyxJQUFBLGdCQUFNLEdBQUU7O2lEQUNvQjtBQUc3QjtJQURDLElBQUEsZ0JBQU0sRUFBQyxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLGtDQUFvQixDQUFDLEVBQUUsQ0FBQztzQ0FDckQsc0JBQVM7OENBQUM7QUFHN0I7SUFEQyxJQUFBLGdCQUFNLEdBQUU7O21EQUNzQjtBQWpCcEIsV0FBVztJQUZ2QixJQUFBLGdCQUFNLEVBQUMsRUFBRSxJQUFJLEVBQUUsVUFBVSxFQUFFLENBQUM7SUFDNUIsSUFBQSxlQUFLLEVBQUMsQ0FBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUM7R0FDMUMsV0FBVyxDQWtCdkI7QUFsQlksa0NBQVcifQ==