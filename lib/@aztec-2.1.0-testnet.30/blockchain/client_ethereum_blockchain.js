"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientEthereumBlockchain = void 0;
const address_1 = require("@aztec/barretenberg/address");
const providers_1 = require("@ethersproject/providers");
const contracts_1 = require("./contracts");
const rollup_processor_1 = require("./contracts/rollup_processor");
class ClientEthereumBlockchain {
    constructor(rollupContractAddress, assets, bridges, ethereumProvider, minConfirmations) {
        this.bridges = bridges;
        this.ethereumProvider = ethereumProvider;
        this.minConfirmations = minConfirmations;
        this.rollupProcessor = new rollup_processor_1.RollupProcessor(rollupContractAddress, ethereumProvider);
        this.provider = new providers_1.Web3Provider(this.ethereumProvider);
        this.assets = assets.map(asset => {
            if (asset.address.equals(address_1.EthAddress.ZERO)) {
                return new contracts_1.EthAsset(this.ethereumProvider);
            }
            else {
                return contracts_1.TokenAsset.new(asset, this.ethereumProvider);
            }
        });
    }
    async getChainId() {
        return (await this.provider.getNetwork()).chainId;
    }
    getAsset(assetId) {
        return this.assets[assetId];
    }
    getAssetIdByAddress(address, gasLimit) {
        const assetId = this.assets.findIndex(a => a.getStaticInfo().address.equals(address) &&
            (gasLimit === undefined || a.getStaticInfo().gasLimit === gasLimit));
        if (assetId < 0) {
            throw new Error(`Unknown asset. Address: ${address}. Gas limit: ${gasLimit}.`);
        }
        return assetId;
    }
    getAssetIdBySymbol(symbol, gasLimit) {
        const assetId = this.assets.findIndex(a => a.getStaticInfo().symbol.toLowerCase() === symbol.toLowerCase() &&
            (gasLimit === undefined || a.getStaticInfo().gasLimit === gasLimit));
        if (assetId < 0) {
            throw new Error(`Unknown asset. Symbol: ${symbol}. Gas limit: ${gasLimit}.`);
        }
        return assetId;
    }
    getBridgeAddressId(address, gasLimit) {
        const index = this.bridges.findIndex(b => b.address.equals(address) && (gasLimit === undefined || b.gasLimit === gasLimit));
        if (index < 0) {
            throw new Error(`Unknown bridge. Address: ${address}. Gas limit: ${gasLimit}.`);
        }
        return index + 1;
    }
    async getUserPendingDeposit(assetId, account) {
        return this.rollupProcessor.getUserPendingDeposit(assetId, account);
    }
    async getUserProofApprovalStatus(account, txId) {
        return this.rollupProcessor.getProofApprovalStatus(account, txId);
    }
    async depositPendingFunds(assetId, amount, proofHash, options) {
        return this.rollupProcessor.depositPendingFunds(assetId, amount, proofHash, options);
    }
    async depositPendingFundsPermit(assetId, amount, deadline, signature, proofHash, options) {
        return this.rollupProcessor.depositPendingFundsPermit(assetId, amount, deadline, signature, proofHash, options);
    }
    async depositPendingFundsPermitNonStandard(assetId, amount, nonce, deadline, signature, proofHash, options) {
        return this.rollupProcessor.depositPendingFundsPermitNonStandard(assetId, amount, nonce, deadline, signature, proofHash, options);
    }
    async approveProof(txId, options) {
        return this.rollupProcessor.approveProof(txId, options);
    }
    async processAsyncDefiInteraction(interactionNonce, options) {
        return this.rollupProcessor.processAsyncDefiInteraction(interactionNonce, options);
    }
    async isContract(address) {
        return (await this.provider.getCode(address.toString())) !== '0x';
    }
    async setSupportedAsset(assetAddress, assetGasLimit, options) {
        const txHash = await this.rollupProcessor.setSupportedAsset(assetAddress, assetGasLimit, options);
        return txHash;
    }
    async setSupportedBridge(bridgeAddress, bridgeGasLimit, options) {
        const txHash = await this.rollupProcessor.setSupportedBridge(bridgeAddress, bridgeGasLimit, options);
        return txHash;
    }
    /**
     * Wait for given transaction to be mined, and return receipt.
     */
    async getTransactionReceipt(txHash, interval = 1, timeout = 300, minConfirmations = this.minConfirmations) {
        const started = Date.now();
        while (true) {
            if (timeout && Date.now() - started > timeout * 1000) {
                throw new Error(`Timeout awaiting tx confirmation: ${txHash}`);
            }
            const txReceipt = await this.provider.getTransactionReceipt(txHash.toString());
            if (!minConfirmations || (txReceipt && txReceipt.confirmations >= minConfirmations)) {
                return txReceipt
                    ? { status: !!txReceipt.status, blockNum: txReceipt.blockNumber }
                    : { status: false, blockNum: 0 };
            }
            await new Promise(resolve => setTimeout(resolve, interval * 1000));
        }
    }
}
exports.ClientEthereumBlockchain = ClientEthereumBlockchain;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50X2V0aGVyZXVtX2Jsb2NrY2hhaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi9zcmMvY2xpZW50X2V0aGVyZXVtX2Jsb2NrY2hhaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEseURBQXlEO0FBVXpELHdEQUF3RDtBQUN4RCwyQ0FBbUQ7QUFDbkQsbUVBQStEO0FBRS9ELE1BQWEsd0JBQXdCO0lBS25DLFlBQ0UscUJBQWlDLEVBQ2pDLE1BQXlCLEVBQ1IsT0FBMkIsRUFDM0IsZ0JBQWtDLEVBQ2xDLGdCQUF3QjtRQUZ4QixZQUFPLEdBQVAsT0FBTyxDQUFvQjtRQUMzQixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBQ2xDLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBUTtRQUV6QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksa0NBQWUsQ0FBQyxxQkFBcUIsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3BGLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSx3QkFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3hELElBQUksQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUMvQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLG9CQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pDLE9BQU8sSUFBSSxvQkFBUSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQzVDO2lCQUFNO2dCQUNMLE9BQU8sc0JBQVUsQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO2FBQ3JEO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVU7UUFDckIsT0FBTyxDQUFDLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FB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