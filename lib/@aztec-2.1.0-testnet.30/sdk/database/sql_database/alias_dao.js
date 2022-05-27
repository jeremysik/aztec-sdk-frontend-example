"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AliasDao = void 0;
const tslib_1 = require("tslib");
const account_id_1 = require("@aztec/barretenberg/account_id");
const address_1 = require("@aztec/barretenberg/address");
const typeorm_1 = require("typeorm");
const database_1 = require("../database");
const transformer_1 = require("./transformer");
let AliasDao = class AliasDao {
    constructor(init) {
        Object.assign(this, init);
    }
};
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)('blob', { transformer: [transformer_1.aliasHashTransformer] }),
    tslib_1.__metadata("design:type", account_id_1.AliasHash)
], AliasDao.prototype, "aliasHash", void 0);
tslib_1.__decorate([
    (0, typeorm_1.PrimaryColumn)('blob', { transformer: [transformer_1.grumpkinAddressTransformer] }),
    tslib_1.__metadata("design:type", address_1.GrumpkinAddress)
], AliasDao.prototype, "address", void 0);
tslib_1.__decorate([
    (0, typeorm_1.Index)({ unique: false }),
    (0, typeorm_1.Column)(),
    tslib_1.__metadata("design:type", Number)
], AliasDao.prototype, "latestNonce", void 0);
AliasDao = tslib_1.__decorate([
    (0, typeorm_1.Entity)({ name: 'alias' }),
    (0, typeorm_1.Index)(['aliasHash', 'address'], { unique: true }),
    tslib_1.__metadata("design:paramtypes", [database_1.Alias])
], AliasDao);
exports.AliasDao = AliasDao;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpYXNfZGFvLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RhdGFiYXNlL3NxbF9kYXRhYmFzZS9hbGlhc19kYW8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtEQUEyRDtBQUMzRCx5REFBOEQ7QUFDOUQscUNBQStEO0FBQy9ELDBDQUFvQztBQUNwQywrQ0FBaUY7QUFJakYsSUFBYSxRQUFRLEdBQXJCLE1BQWEsUUFBUTtJQUNuQixZQUFZLElBQVk7UUFDdEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFDNUIsQ0FBQztDQVdGLENBQUE7QUFSQztJQURDLElBQUEsdUJBQWEsRUFBQyxNQUFNLEVBQUUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxrQ0FBb0IsQ0FBQyxFQUFFLENBQUM7c0NBQzVDLHNCQUFTOzJDQUFDO0FBRzdCO0lBREMsSUFBQSx1QkFBYSxFQUFDLE1BQU0sRUFBRSxFQUFFLFdBQVcsRUFBRSxDQUFDLHdDQUEwQixDQUFDLEVBQUUsQ0FBQztzQ0FDcEQseUJBQWU7eUNBQUM7QUFJakM7SUFGQyxJQUFBLGVBQUssRUFBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQztJQUN4QixJQUFBLGdCQUFNLEdBQUU7OzZDQUNtQjtBQWJqQixRQUFRO0lBRnBCLElBQUEsZ0JBQU0sRUFBQyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztJQUN6QixJQUFBLGVBQUssRUFBQyxDQUFDLFdBQVcsRUFBRSxTQUFTLENBQUMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQzs2Q0FFN0IsZ0JBQUs7R0FEYixRQUFRLENBY3BCO0FBZFksNEJBQVEifQ==