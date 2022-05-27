"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountTxDao = void 0;
const tslib_1 = require("tslib");
const account_id_1 = require("@aztec/barretenberg/account_id");
const tx_id_1 = require("@aztec/barretenberg/tx_id");
const typeorm_1 = require("typeorm");
const transformer_1 = require("./transformer");
let AccountTxDao = class AccountTxDao {
    afterLoad() {
        if (this.settled === null) {
            delete this.settled;
        }
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)('blob', { transformer: [transformer_1.txIdTransformer] }),
    tslib_1.__metadata("design:type", tx_id_1.TxId)
], AccountTxDao.prototype, "txId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Index)({ unique: false }),
    (0, typeorm_1.Column)('blob', { transformer: [transformer_1.accountIdTransformer] }),
    tslib_1.__metadata("design:type", account_id_1.AccountId)
], AccountTxDao.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('blob', { nullable: true, transformer: [transformer_1.aliasHashTransformer] }),
    tslib_1.__metadata("design:type", account_id_1.AliasHash)
], AccountTxDao.prototype, "aliasHash", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Buffer)
], AccountTxDao.prototype, "newSigningPubKey1", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Buffer)
], AccountTxDao.prototype, "newSigningPubKey2", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Boolean)
], AccountTxDao.prototype, "migrated", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], AccountTxDao.prototype, "txRefNo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], AccountTxDao.prototype, "created", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], AccountTxDao.prototype, "settled", void 0);
tslib_1.__decorate([
    (0, typeorm_1.AfterLoad)(),
    (0, typeorm_1.AfterInsert)(),
    (0, typeorm_1.AfterUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], AccountTxDao.prototype, "afterLoad", null);
AccountTxDao = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'accountTx' })
], AccountTxDao);
exports.AccountTxDao = AccountTxDao;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudF90eF9kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGF0YWJhc2Uvc3FsX2RhdGFiYXNlL2FjY291bnRfdHhfZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwrREFBc0U7QUFDdEUscURBQWlEO0FBQ2pELHFDQUFvRztBQUNwRywrQ0FBNEY7QUFHNUYsSUFBYSxZQUFZLEdBQXpCLE1BQWEsWUFBWTtJQWdDdkIsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3JCO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFuQ0M7SUFEQyxJQUFBLHVCQUFhLEVBQUMsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsNkJBQWUsQ0FBQyxFQUFFLENBQUM7c0NBQzVDLFlBQUk7MENBQUM7QUFJbkI7SUFGQyxJQUFBLGVBQUssRUFBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUN4QixJQUFBLGdCQUFNLEVBQUMsTUFBTSxFQUFFLEVBQUUsV0FBVyxFQUFFLENBQUMsa0NBQW9CLENBQUMsRUFBRSxDQUFDO3NDQUN4QyxzQkFBUzs0Q0FBQztBQUcxQjtJQURDLElBQUEsZ0JBQU0sRUFBQyxNQUFNLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLFdBQVcsRUFBRSxDQUFDLGtDQUFvQixDQUFDLEVBQUUsQ0FBQztzQ0FDckQsc0JBQVM7K0NBQUM7QUFHN0I7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7c0NBQ0EsTUFBTTt1REFBQztBQUdsQztJQURDLElBQUEsZ0JBQU0sRUFBQyxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsQ0FBQztzQ0FDQSxNQUFNO3VEQUFDO0FBR2xDO0lBREMsSUFBQSxnQkFBTSxHQUFFOzs4Q0FDaUI7QUFHMUI7SUFEQyxJQUFBLGdCQUFNLEdBQUU7OzZDQUNlO0FBR3hCO0lBREMsSUFBQSxnQkFBTSxHQUFFO3NDQUNRLElBQUk7NkNBQUM7QUFHdEI7SUFEQyxJQUFBLGdCQUFNLEVBQUMsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLENBQUM7c0NBQ1YsSUFBSTs2Q0FBQztBQUt0QjtJQUhDLElBQUEsbUJBQVMsR0FBRTtJQUNYLElBQUEscUJBQVcsR0FBRTtJQUNiLElBQUEscUJBQVcsR0FBRTs7Ozs2Q0FLYjtBQXBDVSxZQUFZO0lBRHhCLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsQ0FBQztHQUNqQixZQUFZLENBcUN4QjtBQXJDWSxvQ0FBWSJ9