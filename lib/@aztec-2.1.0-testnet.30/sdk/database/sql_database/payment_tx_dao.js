"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentTxDao = void 0;
const tslib_1 = require("tslib");
const account_id_1 = require("@aztec/barretenberg/account_id");
const tx_id_1 = require("@aztec/barretenberg/tx_id");
const typeorm_1 = require("typeorm");
const transformer_1 = require("./transformer");
let PaymentTxDao = class PaymentTxDao {
    afterLoad() {
        if (this.settled === null) {
            delete this.settled;
        }
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)('blob', { transformer: [transformer_1.txIdTransformer] }),
    tslib_1.__metadata("design:type", tx_id_1.TxId)
], PaymentTxDao.prototype, "txId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)('blob', { transformer: [transformer_1.accountIdTransformer] }),
    tslib_1.__metadata("design:type", account_id_1.AccountId)
], PaymentTxDao.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], PaymentTxDao.prototype, "proofId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], PaymentTxDao.prototype, "assetId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', { transformer: [transformer_1.bigintTransformer] }),
    tslib_1.__metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], PaymentTxDao.prototype, "publicValue", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('blob', { transformer: [transformer_1.ethAddressTransformer], nullable: true }),
    tslib_1.__metadata("design:type", Object)
], PaymentTxDao.prototype, "publicOwner", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', { transformer: [transformer_1.bigintTransformer] }),
    tslib_1.__metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], PaymentTxDao.prototype, "privateInput", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', { transformer: [transformer_1.bigintTransformer] }),
    tslib_1.__metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], PaymentTxDao.prototype, "recipientPrivateOutput", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', { transformer: [transformer_1.bigintTransformer] }),
    tslib_1.__metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], PaymentTxDao.prototype, "senderPrivateOutput", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], PaymentTxDao.prototype, "isRecipient", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], PaymentTxDao.prototype, "isSender", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], PaymentTxDao.prototype, "txRefNo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], PaymentTxDao.prototype, "created", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], PaymentTxDao.prototype, "settled", void 0);
tslib_1.__decorate([
    (0, typeorm_1.AfterLoad)(),
    (0, typeorm_1.AfterInsert)(),
    (0, typeorm_1.AfterUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], PaymentTxDao.prototype, "afterLoad", null);
PaymentTxDao = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'paymentTx' }),
    (0, typeorm_1.Index)(['txId', 'userId'], { unique: true })
], PaymentTxDao);
exports.PaymentTxDao = PaymentTxDao;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGF5bWVudF90eF9kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGF0YWJhc2Uvc3FsX2RhdGFiYXNlL3BheW1lbnRfdHhfZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwrREFBMkQ7QUFFM0QscURBQWlEO0FBQ2pELHFDQUFvRztBQUVwRywrQ0FBZ0g7QUFJaEgsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQThDdkIsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFqREM7SUFEQyxJQUFBLHVCQUFhLEVBQUMsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsNkJBQWUsQ0FBQyxFQUFFLENBQUM7c0NBQzVDLFlBQUk7MENBQUM7QUFHbkI7SUFEQyxJQUFBLHVCQUFhLEVBQUMsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsa0NBQW9CLENBQUMsRUFBRSxDQUFDO3NDQUMvQyxzQkFBUzs0Q0FBQztBQUcxQjtJQURDLElBQUEsZ0JBQU0sR0FBRTs7NkNBQ2U7QUFHeEI7SUFEQyxJQUFBLGdCQUFNLEdBQUU7OzZDQUNlO0FBR3hCO0lBREMsSUFBQSxnQkFBTSxFQUFDLE1BQU0sRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLCtCQUFpQixDQUFDLEVBQUUsQ0FBQzs7aURBQ3pCO0FBRzVCO0lBREMsSUFBQSxnQkFBTSxFQUFDLE1BQU0sRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLG1DQUFxQixDQUFDLEVBQUUsUUFBUSxFQUFFLElBQUksRUFBRSxDQUFDOztpREFDN0I7QUFHNUM7SUFEQyxJQUFBLGdCQUFNLEVBQUMsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsK0JBQWlCLENBQUMsRUFBRSxDQUFDOztrREFDeEI7QUFHN0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsK0JBQWlCLENBQUMsRUFBRSxDQUFDOzs0REFDZDtBQUd2QztJQURDLElBQUEsZ0JBQU0sRUFBQyxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQywrQkFBaUIsQ0FBQyxFQUFFLENBQUM7O3lEQUNqQjtBQUdwQztJQURDLElBQUEsZ0JBQU0sR0FBRTs7aURBQ29CO0FBRzdCO0lBREMsSUFBQSxnQkFBTSxHQUFFOzs4Q0FDaUI7QUFHMUI7SUFEQyxJQUFBLGdCQUFNLEdBQUU7OzZDQUNlO0FBR3hCO0lBREMsSUFBQSxnQkFBTSxHQUFFO3NDQUNRLElBQUk7NkNBQUM7QUFHdEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7c0NBQ1YsSUFBSTs2Q0FBQztBQUt0QjtJQUhDLElBQUEsbUJBQVMsR0FBRTtJQUNYLElBQUEscUJBQVcsR0FBRTtJQUNiLElBQUEscUJBQVcsR0FBRTs7Ozs2Q0FLYjtBQWxEVSxZQUFZO0lBRnhCLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQztJQUM3QixJQUFBLGVBQUssRUFBQyxDQUFDLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQztHQUMvQixZQUFZLENBbUR4QjtBQW5EWSxvQ0FBWSJ9