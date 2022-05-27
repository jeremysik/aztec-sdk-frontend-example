"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClaimTxDao = void 0;
const tslib_1 = require("tslib");
const account_id_1 = require("@aztec/barretenberg/account_id");
const tx_id_1 = require("@aztec/barretenberg/tx_id");
const typeorm_1 = require("typeorm");
const transformer_1 = require("./transformer");
let ClaimTxDao = class ClaimTxDao {
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)(),
    tslib_1.__metadata("design:type", Buffer)
], ClaimTxDao.prototype, "nullifier", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('blob', { transformer: [transformer_1.txIdTransformer] }),
    tslib_1.__metadata("design:type", tx_id_1.TxId)
], ClaimTxDao.prototype, "defiTxId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('blob', { transformer: [transformer_1.accountIdTransformer] }),
    tslib_1.__metadata("design:type", account_id_1.AccountId)
], ClaimTxDao.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Buffer)
], ClaimTxDao.prototype, "secret", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], ClaimTxDao.prototype, "interactionNonce", void 0);
ClaimTxDao = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'claimTx' })
], ClaimTxDao);
exports.ClaimTxDao = ClaimTxDao;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xhaW1fdHhfZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RhdGFiYXNlL3NxbF9kYXRhYmFzZS9jbGFpbV90eF9kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtEQUEyRDtBQUMzRCxxREFBaUQ7QUFDakQscUNBQXdEO0FBRXhELCtDQUFzRTtBQUd0RSxJQUFhLFVBQVUsR0FBdkIsTUFBYSxVQUFVO0NBZXRCLENBQUE7QUFiQztJQURDLElBQUEsdUJBQWEsR0FBRTtzQ0FDRyxNQUFNOzZDQUFDO0FBRzFCO0lBREMsSUFBQSxnQkFBTSxFQUFDLE1BQU0sRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLDZCQUFlLENBQUMsRUFBRSxDQUFDO3NDQUNqQyxZQUFJOzRDQUFDO0FBR3ZCO0lBREMsSUFBQSxnQkFBTSxFQUFDLE1BQU0sRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLGtDQUFvQixDQUFDLEVBQUUsQ0FBQztzQ0FDeEMsc0JBQVM7MENBQUM7QUFHMUI7SUFEQyxJQUFBLGdCQUFNLEdBQUU7c0NBQ08sTUFBTTswQ0FBQztBQUd2QjtJQURDLElBQUEsZ0JBQU0sR0FBRTs7b0RBQ3dCO0FBZHRCLFVBQVU7SUFEdEIsSUFBQSxnQkFBTSxFQUFDLEVBQUUsSUFBSSxFQUFFLFNBQVMsRUFBRSxDQUFDO0dBQ2YsVUFBVSxDQWV0QjtBQWZZLGdDQUFVIn0=