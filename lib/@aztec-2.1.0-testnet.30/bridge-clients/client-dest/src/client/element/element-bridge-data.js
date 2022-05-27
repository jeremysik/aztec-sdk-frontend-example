"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ElementBridgeData = exports.SwapType = void 0;
const constants_1 = require("@ethersproject/constants");
const bridge_data_1 = require("../bridge-data");
const typechain_types_1 = require("../../../typechain-types");
const provider_1 = require("../aztec/provider");
const bridge_id_1 = require("@aztec/barretenberg/bridge_id");
var SwapType;
(function (SwapType) {
    SwapType[SwapType["SwapExactIn"] = 0] = "SwapExactIn";
    SwapType[SwapType["SwapExactOut"] = 1] = "SwapExactOut";
})(SwapType = exports.SwapType || (exports.SwapType = {}));
function divide(a, b, precision) {
    return (a * precision) / b;
}
const decodeEvent = async (event) => {
    const { args: [bridgeId, nonce, totalInputValue], } = event;
    const block = await event.getBlock();
    const newEventBlock = {
        nonce: nonce.toBigInt(),
        blockNumber: block.number,
        bridgeId: bridgeId.toBigInt(),
        totalInputValue: totalInputValue.toBigInt(),
        timestamp: block.timestamp,
    };
    return newEventBlock;
};
class ElementBridgeData {
    constructor(elementBridgeContract, balancerContract, rollupContract, chainProperties) {
        this.elementBridgeContract = elementBridgeContract;
        this.balancerContract = balancerContract;
        this.rollupContract = rollupContract;
        this.chainProperties = chainProperties;
        this.scalingFactor = BigInt(1n * 10n ** 18n);
        this.interactionBlockNumbers = [];
        this.auxDataConfig = [
            {
                start: 0,
                length: 64,
                solidityType: bridge_data_1.SolidityType.uint64,
                description: 'Unix Timestamp of the tranch expiry',
            },
        ];
    }
    static create(provider, elementBridgeAddress, balancerAddress, rollupContractAddress, chainProperties = { eventBatchSize: 10000 }) {
        const ethersProvider = (0, provider_1.createWeb3Provider)(provider);
        const elementBridgeContract = typechain_types_1.ElementBridge__factory.connect(elementBridgeAddress.toString(), ethersProvider);
        const rollupContract = typechain_types_1.RollupProcessor__factory.connect(rollupContractAddress.toString(), ethersProvider);
        const vaultContract = typechain_types_1.IVault__factory.connect(balancerAddress.toString(), ethersProvider);
        return new ElementBridgeData(elementBridgeContract, vaultContract, rollupContract, chainProperties);
    }
    async storeEventBlocks(events) {
        if (!events.length) {
            return;
        }
        const storeBlock = async (event) => {
            const newEventBlock = await decodeEvent(event);
            for (let i = 0; i < this.interactionBlockNumbers.length; i++) {
                const currentBlock = this.interactionBlockNumbers[i];
                if (currentBlock.nonce === newEventBlock.nonce) {
                    return;
                }
                if (currentBlock.nonce > newEventBlock.nonce) {
                    this.interactionBlockNumbers.splice(i, 0, newEventBlock);
                    return;
                }
            }
            this.interactionBlockNumbers.push(newEventBlock);
        };
        // store the first event and the last (if there are more than one)
        await storeBlock(events[0]);
        if (events.length > 1) {
            await storeBlock(events[events.length - 1]);
        }
    }
    async getCurrentBlock() {
        const currentBlockNumber = await this.elementBridgeContract.provider.getBlockNumber();
        const currentBlock = await this.elementBridgeContract.provider.getBlock(currentBlockNumber);
        return currentBlock;
    }
    async findDefiEventForNonce(interactionNonce) {
        // start off with the earliest possible block being the block in which the tranche was first deployed
        let earliestBlockNumber = Number(await this.elementBridgeContract.getTrancheDeploymentBlockNumber(interactionNonce));
        // start with the last block being the current block
        let lastBlock = await this.getCurrentBlock();
        let latestBlockNumber = lastBlock.number;
        // try and find previously stored events that encompass the nonce we are looking for
        // also if we find the exact nonce then just return the stored data
        for (let i = 0; i < this.interactionBlockNumbers.length; i++) {
            const storedBlock = this.interactionBlockNumbers[i];
            if (storedBlock.nonce == interactionNonce) {
                return storedBlock;
            }
            if (storedBlock.nonce < interactionNonce) {
                earliestBlockNumber = storedBlock.blockNumber;
            }
            if (storedBlock.nonce > interactionNonce) {
                // this is the first block beyond the one we are looking for, we can break here
                latestBlockNumber = storedBlock.blockNumber;
                break;
            }
        }
        let end = latestBlockNumber;
        let start = end - (this.chainProperties.eventBatchSize - 1);
        start = Math.max(start, earliestBlockNumber);
        while (end > earliestBlockNumber) {
            const events = await this.rollupContract.queryFilter(this.rollupContract.filters.AsyncDefiBridgeProcessed(undefined, interactionNonce), start, end);
            // capture these event markers
            await this.storeEventBlocks(events);
            // there should just be one event, the one we are searching for. but to be sure we will process everything received
            for (const event of events) {
                const newEventBlock = await decodeEvent(event);
                if (newEventBlock.nonce == interactionNonce) {
                    return newEventBlock;
                }
            }
            // if we didn't find an event then go round again but search further back in time
            end = start - 1;
            start = end - (this.chainProperties.eventBatchSize - 1);
            start = Math.max(start, earliestBlockNumber);
        }
    }
    // @dev This function should be implemented for stateful bridges. It should return an array of AssetValue's
    // @dev which define how much a given interaction is worth in terms of Aztec asset ids.
    // @param bigint interactionNonce the interaction nonce to return the value for
    async getInteractionPresentValue(interactionNonce) {
        const interaction = await this.elementBridgeContract.interactions(interactionNonce);
        if (interaction === undefined) {
            return [];
        }
        const exitTimestamp = interaction.expiry;
        const endValue = interaction.quantityPT;
        // we get the present value of the interaction
        const defiEvent = await this.findDefiEventForNonce(interactionNonce);
        if (defiEvent === undefined) {
            return [];
        }
        const latestBlock = await this.getCurrentBlock();
        const now = latestBlock.timestamp;
        const totalInterest = endValue.toBigInt() - defiEvent.totalInputValue;
        const elapsedTime = BigInt(now - defiEvent.timestamp);
        const totalTime = exitTimestamp.toBigInt() - BigInt(defiEvent.timestamp);
        const timeRatio = divide(elapsedTime, totalTime, this.scalingFactor);
        const accruedInterst = (totalInterest * timeRatio) / this.scalingFactor;
        return [
            {
                assetId: BigInt(bridge_id_1.BridgeId.fromBigInt(defiEvent.bridgeId).inputAssetIdA),
                amount: defiEvent.totalInputValue + accruedInterst,
            },
        ];
    }
    async getCurrentYield(interactionNonce) {
        const interaction = await this.elementBridgeContract.interactions(interactionNonce);
        if (interaction === undefined) {
            return [];
        }
        const exitTimestamp = interaction.expiry;
        const endValue = interaction.quantityPT;
        // we get the present value of the interaction
        const defiEvent = await this.findDefiEventForNonce(interactionNonce);
        if (defiEvent === undefined) {
            return [];
        }
        const YEAR = 60n * 60n * 24n * 365n;
        const totalInterest = endValue.toBigInt() - defiEvent.totalInputValue;
        const totalTime = exitTimestamp.toBigInt() - BigInt(defiEvent.timestamp);
        const interestPerSecondScaled = divide(totalInterest, totalTime, this.scalingFactor);
        const yearlyInterest = (interestPerSecondScaled * YEAR) / this.scalingFactor;
        const percentageScaled = divide(yearlyInterest, defiEvent.totalInputValue, this.scalingFactor);
        const percentage2sf = (percentageScaled * 10000n) / this.scalingFactor;
        return [Number(percentage2sf) / 100];
    }
    async getAuxData(inputAssetA, inputAssetB, outputAssetA, outputAssetB) {
        const assetExpiries = await this.elementBridgeContract.getAssetExpiries(inputAssetA.erc20Address);
        if (assetExpiries && assetExpiries.length) {
            return assetExpiries.map(a => a.toBigInt());
        }
        return [];
    }
    async getExpectedOutput(inputAssetA, inputAssetB, outputAssetA, outputAssetB, auxData, precision) {
        // bridge is async the third parameter represents this
        return [BigInt(0), BigInt(0), BigInt(1)];
    }
    async getExpectedYield(inputAssetA, inputAssetB, outputAssetA, outputAssetB, auxData, precision) {
        const assetExpiryHash = await this.elementBridgeContract.hashAssetAndExpiry(inputAssetA.erc20Address, auxData);
        const pool = await this.elementBridgeContract.pools(assetExpiryHash);
        const poolId = pool.poolId;
        const trancheAddress = pool.trancheAddress;
        const funds = {
            sender: constants_1.AddressZero,
            recipient: constants_1.AddressZero,
            fromInternalBalance: false,
            toInternalBalance: false,
        };
        const step = {
            poolId,
            assetInIndex: 0,
            assetOutIndex: 1,
            amount: precision.toString(),
            userData: '0x',
        };
        const deltas = await this.balancerContract.queryBatchSwap(SwapType.SwapExactIn, [step], [inputAssetA.erc20Address, trancheAddress], funds);
        const latestBlock = await this.getCurrentBlock();
        const outputAssetAValue = deltas[1];
        const timeToExpiration = auxData - BigInt(latestBlock.timestamp);
        const YEAR = 60n * 60n * 24n * 365n;
        const interest = -outputAssetAValue.toBigInt() - precision;
        const scaledOutput = divide(interest, timeToExpiration, this.scalingFactor);
        const yearlyOutput = (scaledOutput * YEAR) / this.scalingFactor;
        const percentageScaled = divide(yearlyOutput, precision, this.scalingFactor);
        const percentage2sf = (percentageScaled * 10000n) / this.scalingFactor;
        return [Number(percentage2sf) / 100];
    }
    async getMarketSize(inputAssetA, inputAssetB, outputAssetA, outputAssetB, auxData) {
        const assetExpiryHash = await this.elementBridgeContract.hashAssetAndExpiry(inputAssetA.erc20Address, auxData);
        const pool = await this.elementBridgeContract.pools(assetExpiryHash);
        const poolId = pool.poolId;
        const tokenBalances = await this.balancerContract.getPoolTokens(poolId);
        // todo return the correct aztec assetIds
        return tokenBalances[0].map((address, index) => {
            return {
                assetId: BigInt(address),
                amount: tokenBalances[1][index].toBigInt(),
            };
        });
    }
    async getExpiration(interactionNonce) {
        const interaction = await this.elementBridgeContract.interactions(interactionNonce);
        return BigInt(interaction.expiry.toString());
    }
    async hasFinalised(interactionNonce) {
        const interaction = await this.elementBridgeContract.interactions(interactionNonce);
        return interaction.finalised;
    }
}
exports.ElementBridgeData = ElementBridgeData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudC1icmlkZ2UtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jbGllbnQvZWxlbWVudC9lbGVtZW50LWJyaWRnZS1kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHdEQUF1RDtBQUN2RCxnREFBNkc7QUFDN0csOERBT2tDO0FBR2xDLGdEQUF1RDtBQUV2RCw2REFBeUQ7QUFVekQsSUFBWSxRQUdYO0FBSEQsV0FBWSxRQUFRO0lBQ2xCLHFEQUFXLENBQUE7SUFDWCx1REFBWSxDQUFBO0FBQ2QsQ0FBQyxFQUhXLFFBQVEsR0FBUixnQkFBUSxLQUFSLGdCQUFRLFFBR25CO0FBeUJELFNBQVMsTUFBTSxDQUFDLENBQVMsRUFBRSxDQUFTLEVBQUUsU0FBaUI7SUFDckQsT0FBTyxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDN0IsQ0FBQztBQUVELE1BQU0sV0FBVyxHQUFHLEtBQUssRUFBRSxLQUFvQyxFQUFFLEVBQUU7SUFDakUsTUFBTSxFQUNKLElBQUksRUFBRSxDQUFDLFFBQVEsRUFBRSxLQUFLLEVBQUUsZUFBZSxDQUFDLEdBQ3pDLEdBQUcsS0FBSyxDQUFDO0lBQ1YsTUFBTSxLQUFLLEdBQUcsTUFBTSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDckMsTUFBTSxhQUFhLEdBQUc7UUFDcEIsS0FBSyxFQUFFLEtBQUssQ0FBQyxRQUFRLEVBQUU7UUFDdkIsV0FBVyxFQUFFLEtBQUssQ0FBQyxNQUFNO1FBQ3pCLFFBQVEsRUFBRSxRQUFRLENBQUMsUUFBUSxFQUFFO1FBQzdCLGVBQWUsRUFBRSxlQUFlLENBQUMsUUFBUSxFQUFFO1FBQzNDLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUztLQUMzQixDQUFDO0lBQ0YsT0FBTyxhQUFhLENBQUM7QUFDdkIsQ0FBQyxDQUFDO0FBRUYsTUFBYSxpQkFBaUI7SUFJNUIsWUFDVSxxQkFBb0MsRUFDcEMsZ0JB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