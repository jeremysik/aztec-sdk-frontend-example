"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAztecSdk = exports.createPlainAztecSdk = exports.createHostedAztecSdk = exports.createSharedWorkerSdk = exports.SdkFlavour = void 0;
const tslib_1 = require("tslib");
const blockchain_1 = require("@aztec/blockchain");
const debug_1 = require("@aztec/barretenberg/debug");
const detect_node_1 = tslib_1.__importDefault(require("detect-node"));
const core_sdk_flavours_1 = require("../core_sdk_flavours");
const aztec_sdk_1 = require("./aztec_sdk");
async function createBlockchain(ethereumProvider, coreSdk, confs = 1) {
    const { chainId, rollupContractAddress } = await coreSdk.getLocalStatus();
    const { blockchainStatus: { assets, bridges }, } = await coreSdk.getRemoteStatus();
    const blockchain = new blockchain_1.ClientEthereumBlockchain(rollupContractAddress, assets, bridges, ethereumProvider, confs);
    const providerChainId = await blockchain.getChainId();
    if (chainId !== providerChainId) {
        throw new Error(`Provider chainId ${providerChainId} does not match rollup provider chainId ${chainId}.`);
    }
    return blockchain;
}
var SdkFlavour;
(function (SdkFlavour) {
    SdkFlavour[SdkFlavour["PLAIN"] = 0] = "PLAIN";
    SdkFlavour[SdkFlavour["SHARED_WORKER"] = 1] = "SHARED_WORKER";
    SdkFlavour[SdkFlavour["HOSTED"] = 2] = "HOSTED";
})(SdkFlavour = exports.SdkFlavour || (exports.SdkFlavour = {}));
/**
 * Creates an AztecSdk that is backed by a CoreSdk that runs inside a shared worker.
 */
async function createSharedWorkerSdk(ethereumProvider, options) {
    console.log(`createSharedWorkerSdk() called`);

    if (detect_node_1.default) {
        throw new Error('Not browser.');
    }
    if (options.debug) {
        (0, debug_1.enableLogs)(options.debug);
    }
    const coreSdk = await (0, core_sdk_flavours_1.createBananaCoreSdk)(options);
    try {
        const blockchain = await createBlockchain(ethereumProvider, coreSdk, options.minConfirmation);
        return new aztec_sdk_1.AztecSdk(coreSdk, blockchain, ethereumProvider);
    }
    catch (err) {
        await coreSdk.destroy();
        throw err;
    }
}
exports.createSharedWorkerSdk = createSharedWorkerSdk;
/**
 * Creates an AztecSdk that is backed by a CoreSdk that is hosted on another domain, via an iframe.
 */
async function createHostedAztecSdk(ethereumProvider, options) {
    console.log(`createHostedAztecSdk() called`);

    if (detect_node_1.default) {
        throw new Error('Not browser.');
    }
    if (options.debug) {
        (0, debug_1.enableLogs)(options.debug);
    }
    const coreSdk = await (0, core_sdk_flavours_1.createStrawberryCoreSdk)(options);
    try {
        const blockchain = await createBlockchain(ethereumProvider, coreSdk, options.minConfirmation);
        return new aztec_sdk_1.AztecSdk(coreSdk, blockchain, ethereumProvider);
    }
    catch (err) {
        await coreSdk.destroy();
        throw err;
    }
}
exports.createHostedAztecSdk = createHostedAztecSdk;
/**
 * Creates an AztecSdk that is backed directly by a CoreSdk (no iframe, no shared worker).
 */
async function createPlainAztecSdk(ethereumProvider, options) {
    if (options.debug) {
        (0, debug_1.enableLogs)(options.debug);
    }
    const coreSdk = await (0, core_sdk_flavours_1.createVanillaCoreSdk)(options);
    try {
        const blockchain = await createBlockchain(ethereumProvider, coreSdk, options.minConfirmation);
        return new aztec_sdk_1.AztecSdk(coreSdk, blockchain, ethereumProvider);
    }
    catch (err) {
        await coreSdk.destroy();
        throw err;
    }
}
exports.createPlainAztecSdk = createPlainAztecSdk;
async function createAztecSdk(ethereumProvider, options) {
    switch (options.flavour) {
        case SdkFlavour.HOSTED:
            return createHostedAztecSdk(ethereumProvider, options);
        case SdkFlavour.SHARED_WORKER:
            return createSharedWorkerSdk(ethereumProvider, options);
        case SdkFlavour.PLAIN:
            return createPlainAztecSdk(ethereumProvider, options);
        default:
            if (detect_node_1.default) {
                return createPlainAztecSdk(ethereumProvider, options);
            }
            else {
                return createHostedAztecSdk(ethereumProvider, options);
            }
    }
}
exports.createAztecSdk = createAztecSdk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX2F6dGVjX3Nkay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9henRlY19zZGsvY3JlYXRlX2F6dGVjX3Nkay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0Esa0RBQTZEO0FBQzdELHFEQUF1RDtBQUN2RCxzRUFBaUM7QUFFakMsNERBTzhCO0FBQzlCLDJDQUF1QztBQUV2QyxLQUFLLFVBQVUsZ0JBQWdCLENBQUMsZ0JBQWtDLEVBQUUsT0FBeUIsRUFBRSxLQUFLLEdBQUcsQ0FBQztJQUN0RyxNQUFNLEVBQUUsT0FBTyxFQUFFLHFCQUFxQixFQUFFLEdBQUcsTUFBTSxPQUFPLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDMUUsTUFBTSxFQUNKLGdCQUFnQixFQUFFLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUN0QyxHQUFHLE1BQU0sT0FBTyxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3BDLE1BQU0sVUFBVSxHQUFHLElBQUkscUNBQXdCLENBQUMscUJBQXFCLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUNqSCxNQUFNLGVBQWUsR0FBRyxNQUFNLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUN0RCxJQUFJLE9BQU8sS0FBSyxlQUFlLEVBQUU7UUFDL0IsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQkFBb0IsZUFBZSwyQ0FBMkMsT0FBTyxHQUFHLENBQUMsQ0FBQztLQUMzRztJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUM7QUFFRCxJQUFZLFVBSVg7QUFKRCxXQUFZLFVBQVU7SUFDcEIsNkNBQUssQ0FBQTtJQUNMLDZEQUFhLENBQUE7SUFDYiwrQ0FBTSxDQUFBO0FBQ1IsQ0FBQyxFQUpXLFVBQVUsR0FBVixrQkFBVSxLQUFWLGtCQUFVLFFBSXJCO0FBVUQ7O0dBRUc7QUFDSSxLQUFLLFVBQVUscUJBQXFCLENBQUMsZ0JBQWtDLEVBQUUsT0FBcUM7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