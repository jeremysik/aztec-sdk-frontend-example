"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RollupProcessor = void 0;
const address_1 = require("@aztec/barretenberg/address");
const blockchain_1 = require("@aztec/barretenberg/blockchain");
const block_source_1 = require("@aztec/barretenberg/block_source");
const bridge_id_1 = require("@aztec/barretenberg/bridge_id");
const note_algorithms_1 = require("@aztec/barretenberg/note_algorithms");
const timer_1 = require("@aztec/barretenberg/timer");
const offchain_tx_data_1 = require("@aztec/barretenberg/offchain_tx_data");
const rollup_proof_1 = require("@aztec/barretenberg/rollup_proof");
const providers_1 = require("@ethersproject/providers");
const debug_1 = __importDefault(require("debug"));
const ethers_1 = require("ethers");
const RollupProcessor_json_1 = require("../../artifacts/contracts/RollupProcessor.sol/RollupProcessor.json");
const decode_error_1 = require("../decode_error");
const defi_interaction_event_1 = require("@aztec/barretenberg/block_source/defi_interaction_event");
const solidity_format_signatures_1 = require("./solidity_format_signatures");
const fixEthersStackTrace = (err) => {
    err.stack += new Error().stack;
    throw err;
};
/**
 * Thin wrapper around the rollup processor contract. Provides a direct 1 to 1 interface for
 * querying contract state, creating and sending transactions, and querying for rollup blocks.
 */
class RollupProcessor {
    // taken from the rollup contract
    constructor(rollupContractAddress, ethereumProvider) {
        this.rollupContractAddress = rollupContractAddress;
        this.ethereumProvider = ethereumProvider;
        this.log = (0, debug_1.default)('bb:rollup_processor');
        this.provider = new providers_1.Web3Provider(ethereumProvider);
        this.rollupProcessor = new ethers_1.Contract(rollupContractAddress.toString(), RollupProcessor_json_1.abi, this.provider);
    }
    get address() {
        return this.rollupContractAddress;
    }
    get contract() {
        return this.rollupProcessor;
    }
    async verifier() {
        return address_1.EthAddress.fromString(await this.rollupProcessor.verifier());
    }
    async dataSize() {
        return +(await this.rollupProcessor.getDataSize());
    }
    async defiInteractionHashes() {
        const res = (await this.rollupProcessor.getDefiInteractionHashes());
        return res.map(v => Buffer.from(v.slice(2), 'hex'));
    }
    async asyncDefiInteractionHashes() {
        const res = (await this.rollupProcessor.getAsyncDefiInteractionHashes());
        return res.map(v => Buffer.from(v.slice(2), 'hex'));
    }
    async stateHash() {
        return Buffer.from((await this.rollupProcessor.rollupStateHash()).slice(2), 'hex');
    }
    async getSupportedBridge(bridgeAddressId) {
        return address_1.EthAddress.fromString(await this.rollupProcessor.getSupportedBridge(bridgeAddressId));
    }
    async getSupportedBridges() {
        const [bridgeAddresses, gasLimits] = await this.rollupProcessor.getSupportedBridges();
        return bridgeAddresses.map((a, i) => ({
            id: i + 1,
            address: address_1.EthAddress.fromString(a),
            gasLimit: +gasLimits[i],
        }));
    }
    async getBridgeGasLimit(bridgeAddressId) {
        return +(await this.rollupProcessor.getBridgeGasLimit(bridgeAddressId));
    }
    async getSupportedAsset(assetId) {
        return address_1.EthAddress.fromString(await this.rollupProcessor.getSupportedAsset(assetId));
    }
    async getSupportedAssets() {
        const [assetAddresses, gasLimits] = await this.rollupProcessor.getSupportedAssets();
        return assetAddresses.map((a, i) => ({
            address: address_1.EthAddress.fromString(a),
            gasLimit: +gasLimits[i],
        }));
    }
    async setVerifier(address, options = {}) {
        const { gasLimit } = { ...options };
        const rollupProcessor = this.getContractWithSigner(options);
        const tx = await rollupProcessor.setVerifier(address.toString(), { gasLimit }).catch(fixEthersStackTrace);
        return blockchain_1.TxHash.fromString(tx.hash);
    }
    async setThirdPartyContractStatus(flag, options = {}) {
        const { gasLimit } = { ...options };
        const rollupProcessor = this.getContractWithSigner(options);
        const tx = await rollupProcessor.setAllowThirdPartyContracts(flag, { gasLimit });
        return blockchain_1.TxHash.fromString(tx.hash);
    }
    async setSupportedBridge(bridgeAddress, bridgeGasLimit = 0, options = {}) {
        const { gasLimit } = { ...options };
        const rollupProcessor = this.getContractWithSigner(options);
        const tx = await rollupProcessor.setSupportedBridge(bridgeAddress.toString(), bridgeGasLimit, { gasLimit });
        return blockchain_1.TxHash.fromString(tx.hash);
    }
    async setSupportedAsset(assetAddress, assetGasLimit = 0, options = {}) {
        const { gasLimit } = { ...options };
        const rollupProcessor = this.getContractWithSigner(options);
        const tx = await rollupProcessor.setSupportedAsset(assetAddress.toString(), assetGasLimit, {
            gasLimit,
        });
        return blockchain_1.TxHash.fromString(tx.hash);
    }
    async processAsyncDefiInteraction(interactionNonce, options = {}) {
        const { gasLimit } = { ...options };
        const rollupProcessor = this.getContractWithSigner(options);
        const tx = await rollupProcessor
            .processAsyncDefiInteraction(interactionNonce, { gasLimit })
            .catch(fixEthersStackTrace);
        return blockchain_1.TxHash.fromString(tx.hash);
    }
    async getEscapeHatchStatus() {
        const [escapeOpen, blocksRemaining] = await this.rollupProcessor.getEscapeHatchStatus();
        return { escapeOpen, blocksRemaining: +blocksRemaining };
    }
    // Deprecated: Used by lots of tests. We now use createRollupTxs() to produce two txs, one with broadcast data,
    // the other with the actual rollup proof.
    async createRollupProofTx(dataBuf, signatures, offchainTxData) {
        return (await this.createRollupTxs(dataBuf, signatures, offchainTxData)).rollupProofTx;
    }
    /**
     * Given the raw "root verifier" data buffer returned by the proof generator, slice off the the broadcast
     * data and the proof data, encode the broadcast data, create a new buffer ready for a processRollup tx.
     * The given offchainTxData is chunked into multiple offchainData txs.
     * Openethereum will accept a maximum tx size of 300kb. Pick 280kb to allow for overheads.
     * Returns the txs to be published.
     */
    async createRollupTxs(dataBuf, signatures, offchainTxData, offchainChunkSize = 280000) {
        const broadcastData = rollup_proof_1.RollupProofData.fromBuffer(dataBuf);
        const broadcastDataLength = broadcastData.toBuffer().length;
        const encodedBroadcastData = broadcastData.encode();
        const proofData = dataBuf.slice(broadcastDataLength);
        const encodedData = Buffer.concat([encodedBroadcastData, proofData]);
        const formattedSignatures = (0, solidity_format_signatures_1.solidityFormatSignatures)(signatures);
        const rollupProofTxRaw = await this.rollupProcessor.populateTransaction
            .processRollup(encodedData, formattedSignatures)
            .catch(fixEthersStackTrace);
        const rollupProofTx = Buffer.from(rollupProofTxRaw.data.slice(2), 'hex');
        const ocData = Buffer.concat(offchainTxData);
        const chunks = Math.ceil(ocData.length / offchainChunkSize);
        // We should always publish at least 1 chunk, even if it's 0 length.
        // We want the log event to be emitted so we can can be sure things are working as intended.
        const ocdChunks = chunks
            ? Array.from({ length: chunks }).map((_, i) => ocData.slice(i * offchainChunkSize, (i + 1) * offchainChunkSize))
            : [Buffer.alloc(0)];
        const offchainDataTxsRaw = await Promise.all(ocdChunks.map((c, i) => this.rollupProcessor.populateTransaction.offchainData(broadcastData.rollupId, i, ocdChunks.length, c))).catch(fixEthersStackTrace);
        const offchainDataTxs = offchainDataTxsRaw.map(tx => Buffer.from(tx.data.slice(2), 'hex'));
        const result = {
            rollupProofTx,
            offchainDataTxs,
        };
        return result;
    }
    async sendRollupTxs({ rollupProofTx, offchainDataTxs }) {
        for (const tx of offchainDataTxs) {
            await this.sendTx(tx);
        }
        await this.sendTx(rollupProofTx);
    }
    async sendTx(data, options = {}) {
        const { signingAddress, gasLimit, nonce } = { ...options };
        const signer = signingAddress ? this.provider.getSigner(signingAddress.toString()) : this.provider.getSigner(0);
        const from = await signer.getAddress();
        const txRequest = {
            to: this.rollupContractAddress.toString(),
            from,
            gasLimit,
            data,
            nonce,
        };
        const txResponse = await signer.sendTransaction(txRequest).catch(fixEthersStackTrace);
        return blockchain_1.TxHash.fromString(txResponse.hash);
    }
    async depositPendingFunds(assetId, amount, proofHash = Buffer.alloc(32), options = {}) {
        const { gasLimit } = { ...options };
        const rollupProcessor = this.getContractWithSigner(options);
        const depositor = await rollupProcessor.signer.getAddress();
        const tx = await rollupProcessor
            .depositPendingFunds(assetId, amount, depositor, proofHash, {
            value: assetId === 0 ? amount : undefined,
            gasLimit,
        })
            .catch(fixEthersStackTrace);
        return blockchain_1.TxHash.fromString(tx.hash);
    }
    async depositPendingFundsPermit(assetId, amount, deadline, signature, proofHash = Buffer.alloc(32), options = {}) {
        const { gasLimit } = { ...options };
        const rollupProcessor = this.getContractWithSigner(options);
        const depositor = await rollupProcessor.signer.getAddress();
        const tx = await rollupProcessor
            .depositPendingFundsPermit(assetId, amount, depositor, proofHash, deadline, signature.v, signature.r, signature.s, { gasLimit })
            .catch(fixEthersStackTrace);
        return blockchain_1.TxHash.fromString(tx.hash);
    }
    async depositPendingFundsPermitNonStandard(assetId, amount, nonce, deadline, signature, proofHash = Buffer.alloc(32), options = {}) {
        const { gasLimit } = { ...options };
        const rollupProcessor = this.getContractWithSigner(options);
        const depositor = await rollupProcessor.signer.getAddress();
        const tx = await rollupProcessor
            .depositPendingFundsPermitNonStandard(assetId, amount, depositor, proofHash, nonce, deadline, signature.v, signature.r, signature.s, { gasLimit })
            .catch(fixEthersStackTrace);
        return blockchain_1.TxHash.fromString(tx.hash);
    }
    async approveProof(proofHash, options = {}) {
        const { gasLimit } = { ...options };
        const rollupProcessor = this.getContractWithSigner(options);
        const tx = await rollupProcessor.approveProof(proofHash, { gasLimit }).catch(fixEthersStackTrace);
        return blockchain_1.TxHash.fromString(tx.hash);
    }
    async getProofApprovalStatus(address, txId) {
        return await this.rollupProcessor.depositProofApprovals(address.toString(), txId);
    }
    async getUserPendingDeposit(assetId, account) {
        return BigInt(await this.rollupProcessor.getUserPendingDeposit(assetId, account.toString()));
    }
    async getThirdPartyContractStatus(options = {}) {
        const { gasLimit } = { ...options };
        return await this.rollupProcessor.allowThirdPartyContracts({ gasLimit });
    }
    async getEarliestBlock() {
        const net = await this.provider.getNetwork();
        switch (net.chainId) {
            case 1:
                return { earliestBlock: 14728000, chunk: 100000, offchainSearchLead: 6 * 60 * 24 };
            case 0xa57ec:
            case 0xe2e:
                return { earliestBlock: 14728000, chunk: 10, offchainSearchLead: 10 };
            default:
                return { earliestBlock: 0, chunk: 100000, offchainSearchLead: 6 * 60 * 24 };
        }
    }
    /**
     * Returns all rollup blocks from (and including) the given rollupId, with >= minConfirmations.
     *
     * A normal geth node has terrible performance when searching event logs. To ensure we are not dependent
     * on third party services such as Infura, we apply an algorithm to mitigate the poor performance.
     * The algorithm will search for rollup events from the end of the chain, in chunks of blocks.
     * If it finds a rollup <= to the given rollupId, we can stop searching.
     *
     * The worst case situation is when requesting all rollups from rollup 0, or when there are no events to find.
     * In this case, we will have ever degrading performance as we search from the end of the chain to the
     * block returned by getEarliestBlock() (hardcoded on mainnet). This is a rare case however.
     *
     * The more normal case is we're given a rollupId that is not 0. In this case we know an event must exist.
     * Further, the usage pattern is that anyone making the request will be doing so with an ever increasing rollupId.
     * This lends itself well to searching backwards from the end of the chain.
     *
     * The chunk size affects performance. If no previous query has been made, or the rollupId < the previous requested
     * rollupId, the chunk size is to 100,000. This is the case when the class is queried the first time.
     * 100,000 blocks is ~10 days of blocks, so assuming there's been a rollup in the last 10 days, or the client is not
     * over 10 days behind, a single query will suffice. Benchmarks suggest this will take ~2 seconds per chunk.
     *
     * If a previous query has been made and the rollupId >= previous query, the first chunk will be from the last result
     * rollups block to the end of the chain. This provides best performance for polling clients.
     */
    async getRollupBlocksFrom(rollupId, minConfirmations) {
        const { earliestBlock, chunk } = await this.getEarliestBlock();
        let end = await this.provider.getBlockNumber();
        let start = this.lastQueriedRollupId === undefined || rollupId < this.lastQueriedRollupId
            ? Math.max(end - chunk, earliestBlock)
            : this.lastQueriedRollupBlockNum + 1;
        let events = [];
        const totalStartTime = new Date().getTime();
        while (end > earliestBlock) {
            const rollupFilter = this.rollupProcessor.filters.RollupProcessed();
            this.log(`fetching rollup events between blocks ${start} and ${end}...`);
            const startTime = new Date().getTime();
            const rollupEvents = await this.rollupProcessor.queryFilter(rollupFilter, start, end);
            this.log(`${rollupEvents.length} fetched in ${(new Date().getTime() - startTime) / 1000}s`);
            events = [...rollupEvents, ...events];
            if (events.length && events[0].args.rollupId.toNumber() <= rollupId) {
                this.lastQueriedRollupId = rollupId;
                this.lastQueriedRollupBlockNum = events[events.length - 1].blockNumber;
                break;
            }
            end = Math.max(start - 1, earliestBlock);
            start = Math.max(end - chunk, earliestBlock);
        }
        this.log(`done: ${events.length} fetched in ${(new Date().getTime() - totalStartTime) / 1000}s`);
        return this.getRollupBlocksFromEvents(events.filter(e => e.args.rollupId.toNumber() >= rollupId), minConfirmations);
    }
    /**
     * The same as getRollupBlocksFrom, but just search for a specific rollup.
     * If `rollupId == -1` return the latest rollup.
     */
    async getRollupBlock(rollupId) {
        const { earliestBlock, chunk } = await this.getEarliestBlock();
        let end = await this.provider.getBlockNumber();
        let start = Math.max(end - chunk, earliestBlock);
        while (end > earliestBlock) {
            this.log(`fetching rollup events between blocks ${start} and ${end}...`);
            const rollupFilter = this.rollupProcessor.filters.RollupProcessed(rollupId == -1 ? undefined : rollupId);
            const events = await this.rollupProcessor.queryFilter(rollupFilter, start, end);
            if (events.length) {
                return (await this.getRollupBlocksFromEvents(events.slice(-1), 1))[0];
            }
            end = Math.max(start - 1, earliestBlock);
            start = Math.max(end - chunk, earliestBlock);
        }
    }
    /**
     * Given an array of rollup events, fetches all the necessary data for each event in order to return a Block.
     * This somewhat arbitrarily chunks the requests 10 at a time, as that ensures we don't overload the node by
     * hitting it with thousands of requests at once, while also enabling some degree of parallelism.
     * WARNING: `rollupEvents` is mutated.
     */
    async getRollupBlocksFromEvents(rollupEvents, minConfirmations) {
        if (rollupEvents.length === 0) {
            return [];
        }
        this.log(`fetching data for ${rollupEvents.length} rollups...`);
        const allTimer = new timer_1.Timer();
        const defiBridgeEventsTimer = new timer_1.Timer();
        const allDefiNotes = await this.getDefiBridgeEventsForRollupEvents(rollupEvents);
        this.log(`defi bridge events fetched in ${defiBridgeEventsTimer.s()}s.`);
        const offchainEventsTimer = new timer_1.Timer();
        const allOffchainDataEvents = await this.getOffchainDataEvents(rollupEvents);
        this.log(`offchain data events fetched in ${offchainEventsTimer.s()}s.`);
        const blocks = [];
        while (rollupEvents.length) {
            const events = rollupEvents.splice(0, 10);
            const chunkedOcdEvents = allOffchainDataEvents.splice(0, 10);
            const meta = await Promise.all(events.map(async (event, i) => {
                const meta = await Promise.all([
                    event.getTransaction(),
                    event.getBlock(),
                    event.getTransactionReceipt(),
                    ...chunkedOcdEvents[i].map(e => e.getTransaction()),
                ]);
                return {
                    event,
                    tx: meta[0],
                    block: meta[1],
                    receipt: meta[2],
                    offchainDataTxs: meta.slice(3),
                };
            }));
            // we now have the tx details and defi notes for this batch of rollup events
            // we need to assign the defi notes to their specified rollup
            const newBlocks = meta
                .filter(m => m.tx.confirmations >= minConfirmations)
                .map(meta => {
                // assign the set of defi notes for this rollup and decode the block
                const hashesForThisRollup = this.extractDefiHashesFromRollupEvent(meta.event);
                const defiNotesForThisRollup = [];
                for (const hash of hashesForThisRollup) {
                    if (!allDefiNotes[hash]) {
                        console.log(`Unable to locate defi interaction note for hash ${hash}!`);
                        continue;
                    }
                    defiNotesForThisRollup.push(allDefiNotes[hash]);
                }
                return this.decodeBlock({ ...meta.tx, timestamp: meta.block.timestamp }, meta.receipt, defiNotesForThisRollup, meta.offchainDataTxs);
            });
            blocks.push(...newBlocks);
        }
        this.log(`fetched in ${allTimer.s()}s`);
        return blocks;
    }
    extractDefiHashesFromRollupEvent(rollupEvent) {
        // the rollup contract publishes a set of hash values with each rollup event
        const rollupLog = { blockNumber: rollupEvent.blockNumber, topics: rollupEvent.topics, data: rollupEvent.data };
        const { args: { nextExpectedDefiHashes }, } = this.contract.interface.parseLog(rollupLog);
        return nextExpectedDefiHashes.map((hash) => hash.slice(2));
    }
    async getDefiBridgeEventsForRollupEvents(rollupEvents) {
        // retrieve all defi interaction notes from the DefiBridgeProcessed stream for the set of rollup events given
        const rollupHashes = rollupEvents.flatMap(ev => this.extractDefiHashesFromRollupEvent(ev));
        const hashMapping = {};
        for (const hash of rollupHashes) {
            hashMapping[hash] = undefined;
        }
        let numHashesToFind = rollupHashes.length;
        // hashMapping now contains all of the required note hashes in it's keys
        // we need to search back through the DefiBridgeProcessed stream and find all of the notes that correspond to that stream
        const { earliestBlock, chunk } = await this.getEarliestBlock();
        // the highest block number should be the event at the end, but calculate the max to be sure
        const highestBlockNumber = Math.max(...rollupEvents.map(ev => ev.blockNumber));
        let endBlock = Math.max(highestBlockNumber, earliestBlock);
        let startBlock = Math.max(endBlock - chunk, earliestBlock);
        // search back through the stream until all of our notes have been found or we have exhausted the blocks
        while (endBlock > earliestBlock && numHashesToFind > 0) {
            this.log(`searching for defi notes from blocks ${startBlock} - ${endBlock}`);
            const filter = this.rollupProcessor.filters.DefiBridgeProcessed();
            const defiBridgeEvents = await this.rollupProcessor.queryFilter(filter, startBlock, endBlock);
            // decode the retrieved events into actual defi interaction notes
            const decodedEvents = defiBridgeEvents.map((log) => {
                const { args: { bridgeId, nonce, totalInputValue, totalOutputValueA, totalOutputValueB, result, errorReason }, } = this.contract.interface.parseLog(log);
                return new defi_interaction_event_1.DefiInteractionEvent(bridge_id_1.BridgeId.fromBigInt(BigInt(bridgeId)), +nonce, BigInt(totalInputValue), BigInt(totalOutputValueA), BigInt(totalOutputValueB), result, Buffer.from(errorReason.slice(2), 'hex'));
            });
            this.log(`found ${decodedEvents.length} notes between blocks ${startBlock} - ${endBlock}, nonces: `, decodedEvents.map(note => note.nonce));
            // compute the hash and store the notes against that hash in our mapping
            for (const decodedNote of decodedEvents) {
                const noteHash = (0, note_algorithms_1.computeInteractionHashes)([decodedNote])[0].toString('hex');
                if (Object.prototype.hasOwnProperty.call(hashMapping, noteHash) && hashMapping[noteHash] === undefined) {
                    hashMapping[noteHash] = decodedNote;
                    --numHashesToFind;
                }
            }
            endBlock = Math.max(startBlock - 1, earliestBlock);
            startBlock = Math.max(endBlock - chunk, earliestBlock);
        }
        return hashMapping;
    }
    async getOffchainDataEvents(rollupEvents) {
        const rollupLogs = rollupEvents.map(e => this.contract.interface.parseLog(e));
        // If we only have one rollup event, use the rollup id as a filter.
        const filter = this.rollupProcessor.filters.OffchainData(rollupLogs.length === 1 ? rollupLogs[0].args.rollupId : undefined);
        // Search from 1 days worth of blocks before, up to the last rollup block.
        const { offchainSearchLead } = await this.getEarliestBlock();
        const offchainEvents = await this.rollupProcessor.queryFilter(filter, rollupEvents[0].blockNumber - offchainSearchLead, rollupEvents[rollupEvents.length - 1].blockNumber);
        // Key the offchain data event on the rollup id and sender.
        const offchainEventMap = offchainEvents.reduce((a, e) => {
            const { args: { rollupId, chunk, totalChunks, sender }, } = this.contract.interface.parseLog(e);
            const key = `${rollupId}:${sender}`;
            if (!a[key]) {
                a[key] = Array.from({ length: totalChunks });
            }
            // Store by chunk index. Copes with chunks being re-published.
            if (!a[key][chunk]) {
                a[key][chunk] = e;
            }
            return a;
        }, {});
        // Finally, for each rollup log, lookup the offchain events for the rollup id from the same sender.
        return rollupLogs.map(rollupLog => {
            const { args: { rollupId, sender }, } = rollupLog;
            const key = `${rollupId}:${sender}`;
            const offchainEvents = offchainEventMap[key];
            if (!offchainEvents || offchainEvents.some(e => !e)) {
                console.log(`Missing offchain data chunks for rollup: ${rollupId}`);
                return [];
            }
            this.log(`rollup ${rollupId} has ${offchainEvents.length} offchain data event(s).`);
            return offchainEvents;
        });
    }
    decodeBlock(rollupTx, receipt, interactionResult, offchainDataTxs) {
        const rollupAbi = new ethers_1.utils.Interface(RollupProcessor_json_1.abi);
        const parsedRollupTx = rollupAbi.parseTransaction({ data: rollupTx.data });
        const offchainTxDataBuf = Buffer.concat(offchainDataTxs
            .map(tx => rollupAbi.parseTransaction({ data: tx.data }))
            .map(parsed => Buffer.from(parsed.args[3].slice(2), 'hex')));
        const [proofData] = parsedRollupTx.args;
        const rollupProofData = rollup_proof_1.RollupProofData.decode(Buffer.from(proofData.slice(2), 'hex'));
        const proofIds = rollupProofData.innerProofData.filter(p => !p.isPadding()).map(p => p.proofId);
        const offchainTxData = (0, offchain_tx_data_1.sliceOffchainTxData)(proofIds, offchainTxDataBuf);
        return new block_source_1.Block(blockchain_1.TxHash.fromString(rollupTx.hash), new Date(rollupTx.timestamp * 1000), rollupProofData.rollupId, rollupProofData.rollupSize, rollupProofData.toBuffer(), offchainTxData, interactionResult, receipt.gasUsed.toNumber(), BigInt(rollupTx.gasPrice.toString()));
    }
    getContractWithSigner(options) {
        const { signingAddress } = options;
        const provider = options.provider ? new providers_1.Web3Provider(options.provider) : this.provider;
        const ethSigner = provider.getSigner(signingAddress ? signingAddress.toString() : 0);
        return new ethers_1.Contract(this.rollupContractAddress.toString(), RollupProcessor_json_1.abi, ethSigner);
    }
    async estimateGas(data) {
        const signer = this.provider.getSigner(0);
        const from = await signer.getAddress();
        const txRequest = {
            to: this.address.toString(),
            from,
            data: `0x${data.toString('hex')}`,
        };
        try {
            const estimate = await this.provider.estimateGas(txRequest);
            return estimate.toNumber();
        }
        catch (err) {
            const rep = await this.ethereumProvider
                .request({ method: 'eth_call', params: [txRequest, 'latest'] })
                .catch(err => err);
            if (rep.data) {
                const revertError = (0, decode_error_1.decodeErrorFromContract)(this.contract, rep.data);
                if (revertError) {
                    const message = `${revertError.name}(${revertError.params.join(', ')})`;
                    throw new Error(message);
                }
            }
            throw err;
        }
    }
    async getRevertError(txHash) {
        return await (0, decode_error_1.decodeErrorFromContractByTxHash)(this.contract, txHash, this.ethereumProvider);
    }
}
exports.RollupProcessor = RollupProcessor;
RollupProcessor.DEFAULT_BRIDGE_GAS_LIMIT = 300000;
RollupProcessor.DEFAULT_ERC20_GAS_LIMIT = 55000;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sbHVwX3Byb2Nlc3Nvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb250cmFjdHMvcm9sbHVwX3Byb2Nlc3Nvci9yb2xsdXBfcHJvY2Vzc29yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlEQUF5RDtBQUN6RCwrREFBdUg7QUFDdkgsbUVBQXlEO0FBQ3pELDZEQUF5RDtBQUN6RCx5RUFBK0U7QUFDL0UscURBQWtEO0FBQ2xELDJFQUEyRTtBQUMzRSxtRUFBbUU7QUFFbkUsd0RBQXdEO0FBQ3hELGtEQUFnQztBQUNoQyxtQ0FBZ0Q7QUFDaEQsNkdBQXlGO0FBQ3pGLGtEQUEyRjtBQUMzRixvR0FBK0Y7QUFDL0YsNkVBQXdFO0FBRXhFLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxHQUFVLEVBQUUsRUFBRTtJQUN6QyxHQUFHLENBQUMsS0FBTSxJQUFJLElBQUksS0FBSyxFQUFFLENBQUMsS0FBSyxDQUFDO0lBQ2hDLE1BQU0sR0FBRyxDQUFDO0FBQ1osQ0FBQyxDQUFDO0FBRUY7OztHQUdHO0FBQ0gsTUFBYSxlQUFlO0lBUzFCLGlDQUFpQztJQUVqQyxZQUFzQixxQkFBaUMsRUFBVSxnQkFBa0M7UUFBN0UsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFZO1FBQVUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUgzRixRQUFHLEdBQUcsSUFBQSxlQUFXLEVBQUMscUJBQXFCLENBQUMsQ0FBQztRQUkvQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksd0JBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25ELElBQUksQ0FBQyxlQUFlLEdBQUcsSUFBSSxpQkFBUSxDQUFDLHFCQUFxQixDQUFDLFFBQVEsRUFBRSxFQUFFLDBCQUFHLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzVGLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQztJQUNwQyxD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