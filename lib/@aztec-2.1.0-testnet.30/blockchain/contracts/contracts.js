"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contracts = void 0;
const blockchain_1 = require("@aztec/barretenberg/blockchain");
const providers_1 = require("@ethersproject/providers");
const signer_1 = require("../signer");
const asset_1 = require("./asset");
const fee_distributor_1 = require("./fee_distributor");
const price_feed_1 = require("./price_feed");
const rollup_processor_1 = require("./rollup_processor");
/**
 * Facade around all Aztec smart contract classes.
 * Provides a factory function `fromAddresses` to simplify construction of all contract classes.
 * Exposes a more holistic interface to clients, than having to deal with individual contract classes.
 */
class Contracts {
    constructor(rollupProcessor, feeDistributor, assets, gasPriceFeed, priceFeeds, ethereumProvider, confirmations) {
        this.rollupProcessor = rollupProcessor;
        this.feeDistributor = feeDistributor;
        this.assets = assets;
        this.gasPriceFeed = gasPriceFeed;
        this.priceFeeds = priceFeeds;
        this.ethereumProvider = ethereumProvider;
        this.confirmations = confirmations;
        this.provider = new providers_1.Web3Provider(ethereumProvider);
        this.ethereumRpc = new blockchain_1.EthereumRpc(ethereumProvider);
    }
    static fromAddresses(rollupContractAddress, feeDistributorAddress, priceFeedContractAddresses, ethereumProvider, confirmations) {
        const rollupProcessor = new rollup_processor_1.RollupProcessor(rollupContractAddress, ethereumProvider);
        const feeDistributor = new fee_distributor_1.FeeDistributor(feeDistributorAddress, ethereumProvider);
        const assets = [new asset_1.EthAsset(ethereumProvider)];
        const [gasPriceFeedAddress, ...tokenPriceFeedAddresses] = priceFeedContractAddresses;
        const gasPriceFeed = new price_feed_1.GasPriceFeed(gasPriceFeedAddress, ethereumProvider);
        const priceFeeds = [
            new price_feed_1.EthPriceFeed(),
            ...tokenPriceFeedAddresses.map(a => new price_feed_1.TokenPriceFeed(a, ethereumProvider)),
        ];
        return new Contracts(rollupProcessor, feeDistributor, assets, gasPriceFeed, priceFeeds, ethereumProvider, confirmations);
    }
    async init() {
        await this.updateAssets();
    }
    getProvider() {
        return this.ethereumProvider;
    }
    async updateAssets() {
        const supportedAssets = await this.rollupProcessor.getSupportedAssets();
        const newAssets = await Promise.all(supportedAssets
            .slice(this.assets.length - 1)
            .map(async ({ address, gasLimit }) => asset_1.TokenAsset.fromAddress(address, this.ethereumProvider, gasLimit, this.confirmations)));
        this.assets = [...this.assets, ...newAssets];
    }
    async getPerRollupState() {
        const defiInteractionHashes = await this.rollupProcessor.defiInteractionHashes();
        return {
            defiInteractionHashes,
        };
    }
    async getPerBlockState() {
        const { escapeOpen, blocksRemaining } = await this.rollupProcessor.getEscapeHatchStatus();
        const allowThirdPartyContracts = await this.rollupProcessor.getThirdPartyContractStatus();
        return {
            escapeOpen,
            numEscapeBlocksRemaining: blocksRemaining,
            allowThirdPartyContracts,
        };
    }
    getRollupBalance(assetId) {
        return this.assets[assetId].balanceOf(this.rollupProcessor.address);
    }
    getFeeDistributorBalance(assetId) {
        return this.assets[assetId].balanceOf(this.feeDistributor.address);
    }
    getRollupContractAddress() {
        return this.rollupProcessor.address;
    }
    getFeeDistributorContractAddress() {
        return this.feeDistributor.address;
    }
    async getVerifierContractAddress() {
        return this.rollupProcessor.verifier();
    }
    async createRollupTxs(dataBuf, signatures, offchainTxData) {
        return this.rollupProcessor.createRollupTxs(dataBuf, signatures, offchainTxData);
    }
    async sendTx(data, options = {}) {
        return this.rollupProcessor.sendTx(data, options);
    }
    async estimateGas(data) {
        return this.rollupProcessor.estimateGas(data);
    }
    async getRollupBlocksFrom(rollupId, minConfirmations = this.confirmations) {
        return this.rollupProcessor.getRollupBlocksFrom(rollupId, minConfirmations);
    }
    async getRollupBlock(rollupId) {
        return this.rollupProcessor.getRollupBlock(rollupId);
    }
    async getUserPendingDeposit(assetId, account) {
        return this.rollupProcessor.getUserPendingDeposit(assetId, account);
    }
    async getTransactionByHash(txHash) {
        return this.ethereumRpc.getTransactionByHash(txHash);
    }
    async getTransactionReceipt(txHash) {
        return this.provider.getTransactionReceipt(txHash.toString());
    }
    async getChainId() {
        const { chainId } = await this.provider.getNetwork();
        return chainId;
    }
    async getBlockNumber() {
        return this.provider.getBlockNumber();
    }
    async signPersonalMessage(message, address) {
        const signer = new signer_1.Web3Signer(this.ethereumProvider);
        return signer.signPersonalMessage(message, address);
    }
    async signMessage(message, address) {
        const signer = new signer_1.Web3Signer(this.ethereumProvider);
        return signer.signMessage(message, address);
    }
    async signTypedData(data, address) {
        const signer = new signer_1.Web3Signer(this.ethereumProvider);
        return signer.signTypedData(data, address);
    }
    async getAssetPrice(assetId) {
        return this.priceFeeds[assetId].price();
    }
    getPriceFeed(assetId) {
        if (!this.priceFeeds[assetId]) {
            throw new Error(`Unknown assetId: ${assetId}`);
        }
        return this.priceFeeds[assetId];
    }
    getGasPriceFeed() {
        return this.gasPriceFeed;
    }
    async getUserProofApprovalStatus(address, txId) {
        return this.rollupProcessor.getProofApprovalStatus(address, txId);
    }
    async isContract(address) {
        return (await this.provider.getCode(address.toString())) !== '0x';
    }
    async getFeeData() {
        const { maxFeePerGas, maxPriorityFeePerGas, gasPrice } = await this.provider.getFeeData();
        return {
            maxFeePerGas: maxFeePerGas !== null ? BigInt(maxFeePerGas.toString()) : BigInt(0),
            maxPriorityFeePerGas: maxPriorityFeePerGas !== null ? BigInt(maxPriorityFeePerGas.toString()) : BigInt(0),
            gasPrice: gasPrice !== null ? BigInt(gasPrice.toString()) : BigInt(0),
        };
    }
    getAssets() {
        return this.assets.map(a => a.getStaticInfo());
    }
    async getSupportedBridges() {
        return this.rollupProcessor.getSupportedBridges();
    }
    async getRevertError(txHash) {
        return await this.rollupProcessor.getRevertError(txHash);
    }
}
exports.Contracts = Contracts;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udHJhY3RzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyYWN0cy9jb250cmFjdHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0RBU3dDO0FBQ3hDLHdEQUF3RDtBQUN4RCxzQ0FBdUM7QUFDdkMsbUNBQStDO0FBQy9DLHVEQUFtRDtBQUNuRCw2Q0FBMEU7QUFDMUUseURBQXFEO0FBRXJEOzs7O0dBSUc7QUFDSCxNQUFhLFNBQVM7SUFJcEIsWUFDbUIsZUFBZ0MsRUFDaEMsY0FBOEIsRUFDdkMsTUFBZSxFQUNOLFlBQTBCLEVBQzFCLFVBQXVCLEVBQ3ZCLGdCQUFrQyxFQUNsQyxhQUFxQjtRQU5yQixvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFDaEMsbUJBQWMsR0FBZCxjQUFjLENBQWdCO1FBQ3ZDLFdBQU0sR0FBTixNQUFNLENBQVM7UUFDTixpQkFBWSxHQUFaLFlBQVksQ0FBYztRQUMxQixlQUFVLEdBQVYsVUFBVSxDQUFhO1FBQ3ZCLHFCQUFnQixHQUFoQixnQkFBZ0IsQ0FBa0I7UUFDbEMsa0JBQWEsR0FBYixhQUFhLENBQVE7UUFFdEMsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLHdCQUFZLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksd0JBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxNQUFNLENBQUMsYUFBYSxDQUNsQixxQkFBaUMsRUFDakMscUJBQWlDLEVBQ2pDLDBCQUF3QyxFQUN4QyxnQkFBa0MsRUFDbEMsYUFBcUI7UUFFckIsTUFBTSxlQUFlLEdBQUcsSUFBSSxrQ0FBZSxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFckYsTUFBTSxjQUFjLEdBQUcsSUFBSSxnQ0FBYyxDQUFDLHFCQUFxQixFQUFFLGdCQUFnQixDQUFDLENBQUM7UUFFbkYsTUFBTSxNQUFNLEdBQUcsQ0FBQyxJQUFJ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