"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bridgeIdTransformer = exports.ethAddressTransformer = exports.txIdTransformer = exports.accountIdTransformer = exports.accountAliasIdTransformer = exports.aliasHashTransformer = exports.grumpkinAddressTransformer = exports.bigintTransformer = void 0;
const account_id_1 = require("@aztec/barretenberg/account_id");
const address_1 = require("@aztec/barretenberg/address");
const bridge_id_1 = require("@aztec/barretenberg/bridge_id");
const tx_id_1 = require("@aztec/barretenberg/tx_id");
exports.bigintTransformer = {
    to: (entityValue) => (entityValue !== undefined ? `${entityValue}` : ''),
    from: (dbValue) => (dbValue ? BigInt(dbValue) : undefined),
};
exports.grumpkinAddressTransformer = {
    to: (entityValue) => entityValue === null || entityValue === void 0 ? void 0 : entityValue.toBuffer(),
    from: (dbValue) => (dbValue ? new address_1.GrumpkinAddress(dbValue) : undefined),
};
exports.aliasHashTransformer = {
    to: (entityValue) => entityValue === null || entityValue === void 0 ? void 0 : entityValue.toBuffer(),
    from: (dbValue) => (dbValue ? new account_id_1.AliasHash(dbValue) : undefined),
};
exports.accountAliasIdTransformer = {
    to: (entityValue) => entityValue === null || entityValue === void 0 ? void 0 : entityValue.toBuffer(),
    from: (dbValue) => (dbValue ? account_id_1.AccountAliasId.fromBuffer(dbValue) : undefined),
};
exports.accountIdTransformer = {
    to: (entityValue) => entityValue === null || entityValue === void 0 ? void 0 : entityValue.toBuffer(),
    from: (dbValue) => (dbValue ? account_id_1.AccountId.fromBuffer(dbValue) : undefined),
};
exports.txIdTransformer = {
    to: (entityValue) => entityValue === null || entityValue === void 0 ? void 0 : entityValue.toBuffer(),
    from: (dbValue) => (dbValue ? new tx_id_1.TxId(dbValue) : undefined),
};
exports.ethAddressTransformer = {
    to: (entityValue) => entityValue === null || entityValue === void 0 ? void 0 : entityValue.toBuffer(),
    from: (dbValue) => (dbValue ? new address_1.EthAddress(dbValue) : undefined),
};
exports.bridgeIdTransformer = {
    to: (entityValue) => entityValue === null || entityValue === void 0 ? void 0 : entityValue.toBuffer(),
    from: (dbValue) => (dbValue ? bridge_id_1.BridgeId.fromBuffer(dbValue) : undefined),
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNmb3JtZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGF0YWJhc2Uvc3FsX2RhdGFiYXNlL3RyYW5zZm9ybWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtEQUFzRjtBQUN0Rix5REFBMEU7QUFDMUUsNkRBQXlEO0FBQ3pELHFEQUFpRDtBQUdwQyxRQUFBLGlCQUFpQixHQUFxQjtJQUNqRCxFQUFFLEVBQUUsQ0FBQyxXQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDLFdBQVcsS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLEdBQUcsV0FBVyxFQUFFLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUNqRixJQUFJLEVBQUUsQ0FBQyxPQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Q0FDcEUsQ0FBQztBQUVXLFFBQUEsMEJBQTBCLEdBQXFCO0lBQzFELEVBQUUsRUFBRSxDQUFDLFdBQTZCLEVBQUUsRUFBRSxDQUFDLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxRQUFRLEVBQUU7SUFDOUQsSUFBSSxFQUFFLENBQUMsT0FBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUkseUJBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0NBQ2pGLENBQUM7QUFFVyxRQUFBLG9CQUFvQixHQUFxQjtJQUNwRCxFQUFFLEVBQUUsQ0FBQyxXQUF1QixFQUFFLEVBQUUsQ0FBQyxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsUUFBUSxFQUFFO0lBQ3hELElBQUksRUFBRSxDQUFDLE9BQWdCLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLHNCQUFTLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztDQUMzRSxDQUFDO0FBRVcsUUFBQSx5QkFBeUIsR0FBcUI7SUFDekQsRUFBRSxFQUFFLENBQUMsV0FBNEIsRUFBRSxFQUFFLENBQUMsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLFFBQVEsRUFBRTtJQUM3RCxJQUFJLEVBQUUsQ0FBQyxPQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsMkJBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztDQUN2RixDQUFDO0FBRVcsUUFBQSxvQkFBb0IsR0FBcUI7SUFDcEQsRUFBRSxFQUFFLENBQUMsV0FBdUIsRUFBRSxFQUFFLENBQUMsV0FBVyxhQUFYLFdBQVcsdUJBQVgsV0FBVyxDQUFFLFFBQVEsRUFBRTtJQUN4RCxJQUFJLEVBQUUsQ0FBQyxPQUFnQixFQUFFLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsc0JBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztDQUNsRixDQUFDO0FBRVcsUUFBQSxlQUFlLEdBQXFCO0lBQy9DLEVBQUUsRUFBRSxDQUFDLFdBQWtCLEVBQUUsRUFBRSxDQUFDLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxRQUFRLEVBQUU7SUFDbkQsSUFBSSxFQUFFLENBQUMsT0FBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksWUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUM7Q0FDdEUsQ0FBQztBQUVXLFFBQUEscUJBQXFCLEdBQXFCO0lBQ3JELEVBQUUsRUFBRSxDQUFDLFdBQXdCLEVBQUUsRUFBRSxDQUFDLFdBQVcsYUFBWCxXQUFXLHVCQUFYLFdBQVcsQ0FBRSxRQUFRLEVBQUU7SUFDekQsSUFBSSxFQUFFLENBQUMsT0FBZ0IsRUFBRSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksb0JBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0NBQzVFLENBQUM7QUFFVyxRQUFBLG1CQUFtQixHQUFxQjtJQUNuRCxFQUFFLEVBQUUsQ0FBQyxXQUFzQixFQUFFLEVBQUUsQ0FBQyxXQUFXLGFBQVgsV0FBVyx1QkFBWCxXQUFXLENBQUUsUUFBUSxFQUFFO0lBQ3ZELElBQUksRUFBRSxDQUFDLE9BQWdCLEVBQUUsRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxvQkFBUSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0NBQ2pGLENBQUMifQ==