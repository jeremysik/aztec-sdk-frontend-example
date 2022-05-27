"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blockchainStatusFromJson = exports.blockchainStatusToJson = exports.blockchainBridgeFromJson = exports.blockchainBridgeToJson = exports.blockchainAssetFromJson = exports.blockchainAssetToJson = exports.isAccountCreation = exports.isDefiDeposit = exports.TxType = void 0;
const address_1 = require("../address");
var TxType;
(function (TxType) {
    TxType[TxType["DEPOSIT"] = 0] = "DEPOSIT";
    TxType[TxType["TRANSFER"] = 1] = "TRANSFER";
    TxType[TxType["WITHDRAW_TO_WALLET"] = 2] = "WITHDRAW_TO_WALLET";
    TxType[TxType["WITHDRAW_TO_CONTRACT"] = 3] = "WITHDRAW_TO_CONTRACT";
    TxType[TxType["ACCOUNT"] = 4] = "ACCOUNT";
    TxType[TxType["DEFI_DEPOSIT"] = 5] = "DEFI_DEPOSIT";
    TxType[TxType["DEFI_CLAIM"] = 6] = "DEFI_CLAIM";
})(TxType = exports.TxType || (exports.TxType = {}));
function isDefiDeposit(txType) {
    return txType === TxType.DEFI_DEPOSIT;
}
exports.isDefiDeposit = isDefiDeposit;
function isAccountCreation(txType) {
    return txType === TxType.ACCOUNT;
}
exports.isAccountCreation = isAccountCreation;
const blockchainAssetToJson = ({ address, ...asset }) => ({
    ...asset,
    address: address.toString(),
});
exports.blockchainAssetToJson = blockchainAssetToJson;
const blockchainAssetFromJson = ({ address, ...asset }) => ({
    ...asset,
    address: address_1.EthAddress.fromString(address),
});
exports.blockchainAssetFromJson = blockchainAssetFromJson;
const blockchainBridgeToJson = ({ address, ...bridge }) => ({
    ...bridge,
    address: address.toString(),
});
exports.blockchainBridgeToJson = blockchainBridgeToJson;
const blockchainBridgeFromJson = ({ address, ...bridge }) => ({
    ...bridge,
    address: address_1.EthAddress.fromString(address),
});
exports.blockchainBridgeFromJson = blockchainBridgeFromJson;
function blockchainStatusToJson(status) {
    return {
        ...status,
        rollupContractAddress: status.rollupContractAddress.toString(),
        feeDistributorContractAddress: status.feeDistributorContractAddress.toString(),
        verifierContractAddress: status.verifierContractAddress.toString(),
        dataRoot: status.dataRoot.toString('hex'),
        nullRoot: status.nullRoot.toString('hex'),
        rootRoot: status.rootRoot.toString('hex'),
        defiRoot: status.defiRoot.toString('hex'),
        defiInteractionHashes: status.defiInteractionHashes.map(v => v.toString('hex')),
        assets: status.assets.map(exports.blockchainAssetToJson),
        bridges: status.bridges.map(exports.blockchainBridgeToJson),
    };
}
exports.blockchainStatusToJson = blockchainStatusToJson;
function blockchainStatusFromJson(json) {
    return {
        ...json,
        rollupContractAddress: address_1.EthAddress.fromString(json.rollupContractAddress),
        feeDistributorContractAddress: address_1.EthAddress.fromString(json.feeDistributorContractAddress),
        verifierContractAddress: address_1.EthAddress.fromString(json.feeDistributorContractAddress),
        dataRoot: Buffer.from(json.dataRoot, 'hex'),
        nullRoot: Buffer.from(json.nullRoot, 'hex'),
        rootRoot: Buffer.from(json.rootRoot, 'hex'),
        defiRoot: Buffer.from(json.defiRoot, 'hex'),
        defiInteractionHashes: json.defiInteractionHashes.map(f => Buffer.from(f, 'hex')),
        assets: json.assets.map(exports.blockchainAssetFromJson),
        bridges: json.bridges.map(exports.blockchainBridgeFromJson),
    };
}
exports.blockchainStatusFromJson = blockchainStatusFromJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxvY2tjaGFpbl9zdGF0dXMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvYmxvY2tjaGFpbi9ibG9ja2NoYWluX3N0YXR1cy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3Q0FBd0M7QUFFeEMsSUFBWSxNQVFYO0FBUkQsV0FBWSxNQUFNO0lBQ2hCLHlDQUFPLENBQUE7SUFDUCwyQ0FBUSxDQUFBO0lBQ1IsK0RBQWtCLENBQUE7SUFDbEIsbUVBQW9CLENBQUE7SUFDcEIseUNBQU8sQ0FBQTtJQUNQLG1EQUFZLENBQUE7SUFDWiwrQ0FBVSxDQUFBO0FBQ1osQ0FBQyxFQVJXLE1BQU0sR0FBTixjQUFNLEtBQU4sY0FBTSxRQVFqQjtBQUVELFNBQWdCLGFBQWEsQ0FBQyxNQUFjO0lBQzFDLE9BQU8sTUFBTSxLQUFLLE1BQU0sQ0FBQyxZQUFZLENBQUM7QUFDeEMsQ0FBQztBQUZELHNDQUVDO0FBRUQsU0FBZ0IsaUJBQWlCLENBQUMsTUFBYztJQUM5QyxPQUFPLE1BQU0sS0FBSyxNQUFNLENBQUMsT0FBTyxDQUFDO0FBQ25DLENBQUM7QUFGRCw4Q0FFQztBQWtCTSxNQUFNLHFCQUFxQixHQUFHLENBQUMsRUFBRSxPQUFPLEVBQUUsR0FBRyxLQUFLLEVBQW1CLEVBQXVCLEVBQUUsQ0FBQyxDQUFDO0lBQ3JHLEdBQUcsS0FBSztJQUNSLE9BQU8sRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFO0NBQzVCLENBQUMsQ0FBQztBQUhVLFFBQUEscUJBQXFCLHlCQUcvQjtBQUVJLE1BQU0sdUJBQXVCLEdBQUcsQ0FBQyxFQUFFLE9BQU8sRUFBRSxHQUFHLEtBQUssRUFBdUIsRUFBbUIsRUFBRSxDQUFDLENBQUM7SUFDdkcsR0FBRyxLQUFLO0lBQ1IsT0FBTyxFQUFFLG9CQUFVLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQztDQUN4QyxDQUFDLENBQUM7QUFIVSxRQUFBLHVCQUF1QiwyQkFHakM7QUFjSSxNQUFNLHNCQUFzQixHQUFH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