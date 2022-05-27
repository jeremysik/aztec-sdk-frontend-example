"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefiTxDao = void 0;
const tslib_1 = require("tslib");
const account_id_1 = require("@aztec/barretenberg/account_id");
const bridge_id_1 = require("@aztec/barretenberg/bridge_id");
const tx_id_1 = require("@aztec/barretenberg/tx_id");
const typeorm_1 = require("typeorm");
const transformer_1 = require("./transformer");
let DefiTxDao = class DefiTxDao {
    afterLoad() {
        if (this.settled === null) {
            delete this.settled;
        }
        if (this.interactionNonce === null) {
            delete this.interactionNonce;
        }
        if (this.isAsync === null) {
            delete this.isAsync;
        }
        if (this.success === null) {
            delete this.success;
        }
        if (this.outputValueA === null) {
            delete this.outputValueA;
        }
        if (this.outputValueB === null) {
            delete this.outputValueB;
        }
        if (this.finalised === null) {
            delete this.finalised;
        }
        if (this.claimSettled === null) {
            delete this.claimSettled;
        }
        if (this.claimTxId === null) {
            delete this.claimTxId;
        }
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)('blob', { transformer: [transformer_1.txIdTransformer] }),
    tslib_1.__metadata("design:type", tx_id_1.TxId)
], DefiTxDao.prototype, "txId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Index)({ unique: false }),
    (0, typeorm_1.Column)('blob', { transformer: [transformer_1.accountIdTransformer] }),
    tslib_1.__metadata("design:type", account_id_1.AccountId)
], DefiTxDao.prototype, "userId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('blob', { transformer: [transformer_1.bridgeIdTransformer] }),
    tslib_1.__metadata("design:type", bridge_id_1.BridgeId)
], DefiTxDao.prototype, "bridgeId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', { transformer: [transformer_1.bigintTransformer] }),
    tslib_1.__metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], DefiTxDao.prototype, "depositValue", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', { transformer: [transformer_1.bigintTransformer] }),
    tslib_1.__metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], DefiTxDao.prototype, "txFee", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Buffer)
], DefiTxDao.prototype, "partialStateSecret", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], DefiTxDao.prototype, "txRefNo", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Date)
], DefiTxDao.prototype, "created", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], DefiTxDao.prototype, "settled", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Index)({ unique: false }),
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Number)
], DefiTxDao.prototype, "interactionNonce", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], DefiTxDao.prototype, "isAsync", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Boolean)
], DefiTxDao.prototype, "success", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', { transformer: [transformer_1.bigintTransformer], nullable: true }),
    tslib_1.__metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], DefiTxDao.prototype, "outputValueA", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('text', { transformer: [transformer_1.bigintTransformer], nullable: true }),
    tslib_1.__metadata("design:type", typeof BigInt === "function" ? BigInt : Object)
], DefiTxDao.prototype, "outputValueB", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], DefiTxDao.prototype, "finalised", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    tslib_1.__metadata("design:type", Date)
], DefiTxDao.prototype, "claimSettled", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Column)('blob', { nullable: true, transformer: [transformer_1.txIdTransformer] }),
    tslib_1.__metadata("design:type", tx_id_1.TxId)
], DefiTxDao.prototype, "claimTxId", void 0);
tslib_1.__decorate([
    (0, typeorm_1.AfterLoad)(),
    (0, typeorm_1.AfterInsert)(),
    (0, typeorm_1.AfterUpdate)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], DefiTxDao.prototype, "afterLoad", null);
DefiTxDao = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'defiTx' })
], DefiTxDao);
exports.DefiTxDao = DefiTxDao;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaV90eF9kYW8uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGF0YWJhc2Uvc3FsX2RhdGFiYXNlL2RlZmlfdHhfZGFvLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSwrREFBMkQ7QUFDM0QsNkRBQXlEO0FBQ3pELHFEQUFpRDtBQUNqRCxxQ0FBb0c7QUFDcEcsK0NBQThHO0FBRzlHLElBQWEsU0FBUyxHQUF0QixNQUFhLFNBQVM7SUF5RHBCLFNBQVM7UUFDUCxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQ3pCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztTQUNyQjtRQUNELElBQUksSUFBSSxDQUFDLGdCQUFnQixLQUFLLElBQUksRUFBRTtZQUNsQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQztTQUM5QjtRQUNELElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDekIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtZQUN6QixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUM7U0FDckI7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMxQjtRQUNELElBQUksSUFBSSxDQUFDLFlBQVksS0FBSyxJQUFJLEVBQUU7WUFDOUIsT0FBTyxJQUFJLENBQUMsWUFBWSxDQUFDO1NBQzFCO1FBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxLQUFLLElBQUksRUFBRTtZQUMzQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUM7U0FDdkI7UUFDRCxJQUFJLElBQUksQ0FBQyxZQUFZLEtBQUssSUFBSSxFQUFFO1lBQzlCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztTQUMxQjtRQUNELElBQUksSUFBSSxDQUFDLFNBQVMsS0FB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