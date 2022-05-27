"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthereumBlockchain = void 0;
const bridge_id_1 = require("@aztec/barretenberg/bridge_id");
const environment_1 = require("@aztec/barretenberg/environment");
const rollup_proof_1 = require("@aztec/barretenberg/rollup_proof");
const timer_1 = require("@aztec/barretenberg/timer");
const world_state_1 = require("@aztec/barretenberg/world_state");
const events_1 = require("events");
const contracts_1 = require("./contracts/contracts");
const validate_signature_1 = require("./validate_signature");
/**
 * Implementation of primary blockchain interface.
 * Provides higher level functionality above directly interfacing with contracts, e.g.:
 * - An asynchronous interface for subscribing to rollup events.
 * - A status query method for providing a complete snapshot of current rollup blockchain state.
 * - Abstracts away chain re-org concerns by ensuring appropriate confirmations for given situations.
 */
class EthereumBlockchain extends events_1.EventEmitter {
    constructor(config, contracts) {
        super();
        this.config = config;
        this.contracts = contracts;
        this.running = false;
        this.latestEthBlock = -1;
        this.latestRollupId = -1;
        this.log = console.log;
        if (config.console === false) {
            this.log = () => { };
        }
    }
    static async new(config, rollupContractAddress, feeDistributorAddress, priceFeedContractAddresses, provider) {
        const confirmations = config.minConfirmation || EthereumBlockchain.DEFAULT_MIN_CONFIRMATIONS;
        const contracts = contracts_1.Contracts.fromAddresses(rollupContractAddress, feeDistributorAddress, priceFeedContractAddresses, provider, confirmations);
        await contracts.init();
        const eb = new EthereumBlockchain(config, contracts);
        await eb.init();
        return eb;
    }
    getProvider() {
        return this.contracts.getProvider();
    }
    /**
     * Initialises the status object. Requires querying for the latest rollup block from the blockchain.
     * This could take some time given how `getRollupBlock` searches backwards over the chain.
     */
    async init() {
        this.log('Seeking latest rollup...');
        const latestBlock = await this.contracts.getRollupBlock(-1);
        if (latestBlock) {
            this.log(`Found latest rollup id ${latestBlock.rollupId}.`);
        }
        else {
            this.log('No rollup found, assuming pristine state.');
        }
        const chainId = await this.contracts.getChainId();
        this.status = {
            chainId,
            rollupContractAddress: this.contracts.getRollupContractAddress(),
            feeDistributorContractAddress: this.contracts.getFeeDistributorContractAddress(),
            verifierContractAddress: await this.contracts.getVerifierContractAddress(),
            ...(await this.getPerRollupState(latestBlock)),
            ...(await this.getPerEthBlockState()),
        };
        this.log(`Ethereum blockchain initialized with assets: ${this.status.assets.map(a => a.symbol)}`);
    }
    /**
     * Start polling for RollupProcessed events.
     * All historical blocks will have been emitted before this function returns.
     */
    async start(fromRollup = 0) {
        this.log(`Ethereum blockchain starting from rollup: ${fromRollup}`);
        const getBlocks = async (fromRollup) => {
            while (true) {
                try {
                    return await this.getBlocks(fromRollup);
                }
                catch (err) {
                    this.log(`getBlocks failed, will retry: ${err.message}`);
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }
            }
        };
        const emitBlocks = async () => {
            const latestBlock = await this.contracts.getBlockNumber().catch(err => {
                this.log(`getBlockNumber failed: ${err.code}`);
                return this.latestEthBlock;
            });
            if (latestBlock === this.latestEthBlock) {
                return;
            }
            this.latestEthBlock = latestBlock;
            await this.updatePerEthBlockState();
            const blocks = await getBlocks(fromRollup);
            if (blocks.length) {
                await this.updatePerRollupState(blocks[blocks.length - 1]);
            }
            for (const block of blocks) {
                this.log(`Block received: ${block.rollupId}`);
                this.latestRollupId = block.rollupId;
                this.emit('block', block);
                fromRollup = block.rollupId + 1;
            }
        };
        // We must have emitted all historical blocks before returning.
        await emitBlocks();
        // After which, we asynchronously kick off a polling loop for the latest blocks.
        this.running = true;
        this.runningPromise = (async () => {
            while (this.running) {
                await new Promise(resolve => setTimeout(resolve, this.config.pollInterval || 10000));
                await emitBlocks().catch(this.log);
            }
        })();
        this.log('Ethereum blockchain started.');
    }
    /**
     * Stop polling for RollupProcessed events
     */
    async stop() {
        this.running = false;
        this.removeAllListeners();
        await this.runningPromise;
    }
    /**
     * Get the status of the rollup contract
     */
    getBlockchainStatus() {
        return this.status;
    }
    async getPerRollupState(block) {
        const state = await this.contracts.getPerRollupState();
        if (block) {
            const rollupProofData = rollup_proof_1.RollupProofData.fromBuffer(block.rollupProofData);
            return {
                ...state,
                nextRollupId: rollupProofData.rollupId + 1,
                dataSize: rollupProofData.dataStartIndex + rollupProofData.rollupSize,
                dataRoot: rollupProofData.newDataRoot,
                nullRoot: rollupProofData.newNullRoot,
                rootRoot: rollupProofData.newDataRootsRoot,
                defiRoot: rollupProofData.newDefiRoot,
            };
        }
        else {
            // No rollups yet.
            const chainId = await this.contracts.getChainId();
            const { dataRoot, nullRoot, rootsRoot } = environment_1.InitHelpers.getInitRoots(chainId);
            return {
                ...state,
                nextRollupId: 0,
                dataSize: 0,
                dataRoot,
                nullRoot,
                rootRoot: rootsRoot,
                defiRoot: world_state_1.WorldStateConstants.EMPTY_DEFI_ROOT,
            };
        }
    }
    async getPerEthBlockState() {
        return {
            ...(await this.contracts.getPerBlockState()),
            assets: this.contracts.getAssets(),
            bridges: await this.contracts.getSupportedBridges(),
        };
    }
    async updatePerRollupState(block) {
        this.status = {
            ...this.status,
            ...(await this.getPerRollupState(block)),
        };
    }
    async updatePerEthBlockState() {
        await this.contracts.updateAssets();
        this.status = {
            ...this.status,
            ...(await this.getPerEthBlockState()),
        };
    }
    getLatestRollupId() {
        return this.latestRollupId;
    }
    async getUserPendingDeposit(assetId, account) {
        return this.contracts.getUserPendingDeposit(assetId, account);
    }
    async getUserProofApprovalStatus(account, txId) {
        return this.contracts.getUserProofApprovalStatus(account, txId);
    }
    async createRollupTxs(dataBuf, signatures, offchainTxData) {
        return this.contracts.createRollupTxs(dataBuf, signatures, offchainTxData);
    }
    sendTx(tx, options = {}) {
        options = { ...options, gasLimit: options.gasLimit || this.config.gasLimit };
        return this.contracts.sendTx(tx, options);
    }
    getRequiredConfirmations() {
        const { escapeOpen, numEscapeBlocksRemaining } = this.status;
        const { minConfirmation = EthereumBlockchain.DEFAULT_MIN_CONFIRMATIONS, minConfirmationEHW = EthereumBlockchain.DEFAULT_MIN_CONFIRMATIONS_EHW, } = this.config;
        return escapeOpen || numEscapeBlocksRemaining <= minConfirmationEHW ? minConfirmationEHW : minConfirmation;
    }
    /**
     * Get all created rollup blocks from `rollupId`.
     */
    async getBlocks(rollupId) {
        const minConfirmations = this.getRequiredConfirmations();
        return await this.contracts.getRollupBlocksFrom(rollupId, minConfirmations);
    }
    /**
     * Wait for given transaction to be mined, and return receipt.
     * Timeout is only considered for pending txs. i.e. If there is at least 1 confirmation, the timeout disables.
     * Timeout can be detected because Receipt blockNum will be undefined.
     */
    async getTransactionReceipt(txHash, timeoutSeconds, confs = this.config.minConfirmation || EthereumBlockchain.DEFAULT_MIN_CONFIRMATIONS) {
        const timer = new timer_1.Timer();
        this.log(`Getting tx receipt for ${txHash}... (${confs} confirmations)`);
        let tx = await this.contracts.getTransactionByHash(txHash);
        while (!tx) {
            if (timeoutSeconds !== undefined && timer.s() > timeoutSeconds) {
                return { status: false };
            }
            await new Promise(resolve => setTimeout(resolve, 1000));
            tx = await this.contracts.getTransactionByHash(txHash);
        }
        let txReceipt = await this.contracts.getTransactionReceipt(txHash);
        while (!txReceipt || txReceipt.confirmations < confs) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            txReceipt = await this.contracts.getTransactionReceipt(txHash);
        }
        const receipt = { status: !!txReceipt.status, blockNum: txReceipt.blockNumber };
        if (!receipt.status) {
            receipt.revertError = await this.contracts.getRevertError(txHash);
        }
        return receipt;
    }
    async getTransactionReceiptSafe(txHash, timeoutSeconds) {
        const confs = this.getRequiredConfirmations();
        return this.getTransactionReceipt(txHash, timeoutSeconds, confs);
    }
    /**
     * Validate locally that a signature was produced by a publicOwner
     */
    validateSignature(publicOwner, signature, signingData) {
        return (0, validate_signature_1.validateSignature)(publicOwner, signature, signingData);
    }
    async signPersonalMessage(message, address) {
        return this.contracts.signPersonalMessage(message, address);
    }
    async signMessage(message, address) {
        return this.contracts.signMessage(message, address);
    }
    async signTypedData(data, address) {
        return this.contracts.signTypedData(data, address);
    }
    async getAssetPrice(assetId) {
        return this.contracts.getAssetPrice(assetId);
    }
    getPriceFeed(assetId) {
        return this.contracts.getPriceFeed(assetId);
    }
    getGasPriceFeed() {
        return this.contracts.getGasPriceFeed();
    }
    async isContract(address) {
        return this.contracts.isContract(address);
    }
    async estimateGas(data) {
        return this.contracts.estimateGas(data);
    }
    async getChainId() {
        return this.contracts.getChainId();
    }
    getRollupBalance(assetId) {
        return this.contracts.getRollupBalance(assetId);
    }
    getFeeDistributorBalance(assetId) {
        return this.contracts.getFeeDistributorBalance(assetId);
    }
    async getFeeData() {
        return this.contracts.getFeeData();
    }
    getBridgeGas(bridgeId) {
        const { addressId } = bridge_id_1.BridgeId.fromBigInt(bridgeId);
        const { gasLimit } = this.status.bridges.find(bridge => bridge.id == addressId) || {};
        if (!gasLimit) {
            throw new Error(`Failed to retrieve bridge cost for bridge ${bridgeId.toString()}`);
        }
        return gasLimit;
    }
}
exports.EthereumBlockchain = EthereumBlockchain;
EthereumBlockchain.DEFAULT_MIN_CONFIRMATIONS = 3;
EthereumBlockchain.DEFAULT_MIN_CONFIRMATIONS_EHW = 12;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXRoZXJldW1fYmxvY2tjaGFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3NyYy9ldGhlcmV1bV9ibG9ja2NoYWluLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVdBLDZEQUF5RDtBQUN6RCxpRUFBOEQ7QUFDOUQsbUVBQW1FO0FBQ25FLHFEQUFrRDtBQUNsRCxpRUFBc0U7QUFDdEUsbUNBQXNDO0FBQ3RDLHFEQUFrRDtBQUNsRCw2REFBeUQ7QUFVekQ7Ozs7OztHQU1HO0FBQ0gsTUFBYSxrQkFBbUIsU0FBUSxxQkFBWTtJQVdsRCxZQUFvQixNQUFnQyxFQUFVLFNBQW9CO1FBQ2hGLEtBQUssRUFBRSxDQUFDO1FBRFUsV0FBTSxHQUFOLE1BQU0sQ0FBMEI7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBVjFFLFlBQU8sR0FBRyxLQUFLLENBQUM7UUFFaEIsbUJBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUNwQixtQkFBYyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXBCLFFBQUcsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDO1FBT3hCLElBQUksTUFBTSxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDNUIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7U0FDckI7SUFDSCxDQUFDO0lBRUQsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQ2QsTUFBZ0MsRUFDaEMscUJBQWlDLEVBQ2pDLHFCQUFpQyxFQUNqQywwQkFBd0MsRUFDeEMsUUFBMEI7UUFFMUIsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLGVBQWUsSUFBSSxrQkFBa0IsQ0FBQyx5QkFBeUIsQ0FBQztRQUM3RixNQUFNLFNBQVMsR0FBRyxxQkFBUyxDQUFDLGFBQWEsQ0FDdkMscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUNyQiwwQkFBMEIsRUFDMUIsUUFBUSxFQUNSLGFBQWEsQ0FDZCxDQUFDO1FBQ0YsTUFBTSxTQUFTLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsTUFBTSxFQUFFLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQyxNQUFNLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDckQsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEIsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0lBRU0sV0FBVztRQUNoQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxJQUFJO1FBQ2YsSUFBSSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1RCxJQUFJLFdBQVcsRUFBRTtZQUNmLElBQUksQ0FBQyxHQUFHLENBQUMsMEJBQTBCLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO1NBQzdEO2FBQU07WUFDTCxJQUFJLENBQUMsR0FBRyxDQUFDLDJDQUEyQyxDQUFDLENBQUM7U0FDdkQ7UUFDRCxNQUFNLE9BQU8sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7UUFDbEQsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNaLE9BQU87WUFDUCxxQkFBcUIsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixFQUFFO1lBQ2hFLDZCQUE2QixFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsZ0NBQWdDLEVBQUU7WUFDaEYsdUJBQXVCLEVBQUUsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLDBCQUEwQixFQUFFO1lBQzFFLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM5QyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUN0QyxDQUFDO1FBQ0YsSUFBSSxDQUFDLEdBQUcsQ0FBQyxnREFBZ0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNwRyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLEtBQUssQ0FBQyxVQUFVLEdBQUcsQ0FBQztRQUMvQixJQUFJLENBQUMsR0FBRyxDQUFDLDZDQUE2QyxVQUFVLEVBQUUsQ0FBQyxDQUFDO1FBRXBFLE1BQU0sU0FBUyxHQUFHLEtBQUssRUFBRSxVQUFrQixFQUFFLEVBQUU7WUFDN0MsT0FBTyxJQUFJLEVBQUU7Z0JBQ1gsSUFBSTtvQkFDRixPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQztpQkFDekM7Z0JBQUMsT0FBTyxHQUFRLEVBQUU7b0JBQ2pCLElBQUksQ0FBQyxHQUFHLENBQUMsaUNBQWlDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO29CQUN6RCxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO2lCQUN6RDthQUNGO1FBQ0gsQ0FBQyxDQUFDO1FBRUYsTUFBTSxVQUFVLEdBQUcsS0FBSyxJQUFJLEVBQUU7WUFDNUIsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsRUFBRSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRTtnQkFDcEUsSUFBSSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQy9DLE9BQU8sSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUM3QixDQUFDLENBQUMsQ0FBQztZQUNILElBQUksV0FBVyxLQUFLLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3ZDLE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxjQUFjLEdBQUcsV0FBVyxDQUFDO1lBQ2xDLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixFQUFFLENBQUM7WUFFcEMsTUFBTSxNQUFNLEdBQUcsTUFBTSxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDM0MsSUFBSSxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNqQixNQUFNLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzVEO1lBRUQsS0FBSyxNQUFNLEtBQUssSUFBSSxNQUFNLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2dCQUM5QyxJQUFJLENBQUMsY0FBYyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUM7Z0JBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUMxQixVQUFVLEdBQUcsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLENBQUM7YUFDakM7UUFDSCxDQUFDLENBQUM7UUFFRiwrREFBK0Q7UUFDL0QsTUFBTSxVQUFVLEVBQUUsQ0FBQztRQUVuQixnRkFBZ0Y7UUFDaEYsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDcEIsSUFBSSxDQUFDLGNBQWMsR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLE9BQU8sRUFBRTtnQkFDbkIsTUFBTSxJQUFJLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxZQUFZLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDckYsTUFBTSxVQUFVLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2FBQ3BDO1FBQ0gsQ0FBQyxDQUFDLEVBQUUsQ0FBQztRQUVMLElBQUksQ0FBQyxHQUFHLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7O09BRUc7SUFDSSxLQUFLLENBQUMsSUFBSTtRQUNmLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3JCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQztJQUM1QixDQUFDO0lBRUQ7O09BRUc7SUFDSSxtQkFBbUI7UUFDeEIsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDO0lBQ3JCLENBQUM7SUFFTyxLQUFLLENBQUMsaUJBQWlCLENBQUMsS0FBYTtRQUMzQyxNQUFNLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztRQUN2RCxJQUFJLEtBQUssRUFBRTtZQUNULE1BQU0sZUFBZSxHQUFHLDhCQUFlLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMxRSxPQUFPO2dCQUNMLEdBQUcsS0FBSztnQkFDUixZQUFZLEVBQUUsZUFBZSxDQUFDLFFBQVEsR0FBRyxDQUFDO2dCQUMxQyxRQUFRLEVBQUUsZUFBZSxDQUFDLGNBQWMsR0FBRyxlQUFlLENBQUMsVUFBVTtnQkFDckUsUUFBUSxFQUFFLGVBQWUsQ0FBQyxXQUFXO2dCQUNyQyxRQUFRLEVBQUUsZUFBZSxDQUFDLFdBQVc7Z0JBQ3JDLFFBQVEsRUFBRSxlQUFlLENBQUMsZ0JBQWdCO2dCQUMxQyxRQUFRLEVBQUUsZUFBZSxDQUFDLFdBQVc7YUFDdEMsQ0FBQztTQUNIO2FBQU07WUFDTCxrQkFBa0I7WUFDbEIsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO1lBQ2xELE1BQU0sRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLHlCQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQzVFLE9BQU87Z0JBQ0wsR0FBRyxLQUFLO2dCQUNSLFlBQVksRUFBRSxDQUFDO2dCQUNmLFFBQVEsRUFBRSxDQUFDO2dCQUNYLFFBQVE7Z0JBQ1IsUUFBUTtnQkFDUixRQUFRLEVBQUUsU0FBUztnQkFDbkIsUUFBUSxFQUFFLGlDQUFtQixDQUFDLGVBQWU7YUFDOUMsQ0FBQztTQUNIO0lBQ0gsQ0FBQztJQUVPLEtBQUssQ0FBQyxtQkFBbUI7UUFDL0IsT0FBTztZQUNMLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztZQUM1QyxNQUFNLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLEVBQUU7WUFDbEMsT0FBTyxFQUFFLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsRUFBRTtTQUNwRCxDQUFDO0lBQ0osQ0FBQztJQUVPLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxLQUFhO1FBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUc7WUFDWixHQUFHLElBQUksQ0FBQyxNQUFNO1lBQ2QsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3pDLENBQUM7SUFDSixDQUFDO0lBRU8sS0FBSyxDQUFDLHNCQUFzQjtRQUNsQyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDcEMsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNaLEdBQUcsSUFBSSxDQUFDLE1BQU07WUFDZCxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsbUJBQW1CLEVBQUUsQ0FBQztTQUN0QyxDQUFDO0lBQ0osQ0FBQztJQUVNLGlCQUFpQjtRQUN0QixPQUFPLElBQUksQ0FBQyxjQUFjLENBQUM7SUFDN0IsQ0FBQztJQUVNLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxPQUFlLEVBQUUsT0FBbUI7UUFDckUsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLHFCQUFxQixDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNoRSxDQUFDO0lBRU0sS0FBSyxDQUFDLDBCQUEwQixDQUFDLE9BQW1CLEVBQUUsSUFBWTtRQUN2RSxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsMEJBQTBCLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQ2xFLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQWUsRUFBRSxVQUFvQixFQUFFLGNBQXdCO1FBQ25GLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLFVBQVUsRUFBRSxjQUFjLENBQUMsQ0FBQztJQUM3RSxDQUFDO0lBRU0sTUFBTSxDQUFDLEVBQVUsRUFBRSxVQUF5QixFQUFFO1FBQ25ELE9BQU8sR0FBRyxFQUFFLEdBQUcsT0FBTyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDN0UsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVPLHdCQUF3QjtRQUM5QixNQUFNLEVBQUUsVUFBVSxFQUFFLHdCQUF3QixFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztRQUM3RCxNQUFNLEVBQ0osZUFBZSxHQUFHLGtCQUFrQixDQUFDLHlCQUF5QixFQUM5RCxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQyw2QkFBNkIsR0FDdEUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2hCLE9BQU8sVUFBVSxJQUFJLHdCQUF3QixJQUFJLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsZUFBZSxDQUFDO0lBQzdHLENBQUM7SUFFRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxTQUFTLENBQUMsUUFBZ0I7UUFDckMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsd0JBQXdCLEVBQUUsQ0FBQztRQUN6RCxPQUFPLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztJQUM5RSxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxxQkFBcUIsQ0FDaEMsTUFBYyxFQUNkLGNBQXVCLEVBQ3ZCLEtBQUssR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsSUFBSSxrQkFBa0IsQ0FBQyx5QkFBeUI7UUFFbkYsTUFBTSxLQUFLLEdBQUcsSUFBSSxhQUFLLEVBQUUsQ0FBQztRQUMxQixJQUFJLENBQUMsR0FBRyxDQUFDLDBCQUEwQixNQUFNLFFBQVEsS0FBSyxpQkFBaUIsQ0FBQyxDQUFDO1FBRXpFLElBQUksRUFBRSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMzRCxPQUFPLENBQUMsRUFBRSxFQUFFO1lBQ1YsSUFBSSxjQUFjLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxDQUFDLEVBQUUsR0FBRyxjQUFjLEVBQUU7Z0JBQzlELE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUM7YUFDMUI7WUFDRCxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3hELEVBQUUsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDeEQ7UUFFRCxJQUFJLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbkUsT0FBTyxDQUFDLFNBQVMsSUFBSSxTQUFTLENBQUMsYUFBYSxHQUFHLEtBQUssRUFBRTtZQUNwRCxNQUFNLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQ3hELFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMscUJBQXFCLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDaEU7UUFDRCxNQUFNLE9BQU8sR0FBWSxFQUFFLE1BQU0sRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQ3pGLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO1lBQ25CLE9BQU8sQ0FBQyxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUNuRTtRQUNELE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxLQUFLLENBQUMseUJBQXlCLENBQUMsTUFBYyxFQUFFLGNBQXVCO1FBQzVFLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyx3QkFBd0IsRUFBRSxDQUFDO1FBQzlDLE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLE1BQU0sRUFBRSxjQUFjLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVEOztPQUVHO0lBQ0ksaUJBQWlCLENBQUMsV0FBdUIsRUFBRSxTQUFpQixFQUFFLFdBQW1CO1FBQ3RGLE9BQU8sSUFBQSxzQ0FBaUIsRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7SUFFTSxLQUFLLENBQUMsbUJBQW1CLENBQUMsT0FBZSxFQUFFLE9BQW1CO1FBQ25FLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDOUQsQ0FBQztJQUVNLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBZSxFQUFFLE9BQW1CO1FBQzNELE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ3RELENBQUM7SUFFTSxLQUFLLENBQUMsYUFBYSxDQUFDLElBQWUsRUFBRSxPQUFtQjtRQUM3RCxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLElBQUksRUFBRSxPQUFPLENBQUMsQ0FBQztJQUNyRCxDQUFDO0lBRU0sS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFlO1FBQ3hDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDL0MsQ0FBQztJQUVNLFlBQVksQ0FBQyxPQUFlO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVNLGVBQWU7UUFDcEIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQzFDLENBQUM7SUFFTSxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQW1CO1FBQ3pDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUMsQ0FBQztJQUVNLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBWTtRQUNuQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSxLQUFLLENBQUMsVUFBVTtRQUNyQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVNLGdCQUFnQixDQUFDLE9BQWU7UUFDckMsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFTSx3QkFBd0IsQ0FBQyxPQUFlO1FBQzdDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUMxRCxDQUFDO0lBRU0sS0FBSyxDQUFDLFVBQVU7UUFDckIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ3JDLENBQUM7SUFFTSxZQUFZLENBQUMsUUFBZ0I7UUFDbEMsTUFBTSxFQUFFLFNBQVMsRUFBRSxHQUFHLG9CQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN0RixJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2IsTUFBTSxJQUFJLEtBQUssQ0FBQyw2Q0FBNkMsUUFBUSxDQUFDLFFBQVEsRUFBRSxFQUFFLENBQUMsQ0FBQztTQUNyRjtRQUNELE9BQU8sUUFBUSxDQUFDO0lBQ2xCLENBQUM7O0FBM1VILGdEQTRVQztBQXBVeUIsNENBQXlCLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLGdEQUE2QixHQUFHLEVBQUUsQ0FBQyJ9