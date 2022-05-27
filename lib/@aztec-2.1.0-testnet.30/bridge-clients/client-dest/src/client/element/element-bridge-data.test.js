"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const element_bridge_data_1 = require("./element-bridge-data");
const ethers_1 = require("ethers");
const crypto_1 = require("crypto");
const typechain_types_1 = require("../../../typechain-types");
const bridge_id_1 = require("@aztec/barretenberg/bridge_id");
const bridge_data_1 = require("../bridge-data");
const constants_1 = require("@ethersproject/constants");
const address_1 = require("@aztec/barretenberg/address");
jest.mock('../aztec/provider', () => ({
    createWeb3Provider: jest.fn(),
}));
const randomAddress = () => `0x${(0, crypto_1.randomBytes)(20).toString('hex')}`;
const tranche1DeploymentBlockNumber = 45n;
const tranche2DeploymentBlockNumber = 87n;
const interactions = {};
describe('element bridge data', () => {
    let rollupContract;
    let elementBridge;
    let balancerContract;
    const now = Math.floor(Date.now() / 1000);
    const expiration1 = BigInt(now + 86400 * 60);
    const expiration2 = BigInt(now + 86400 * 90);
    const startDate = BigInt(now - 86400 * 30);
    const bridge1 = new bridge_id_1.BridgeId(1, 4, 4, undefined, undefined, Number(expiration1));
    const bridge2 = new bridge_id_1.BridgeId(1, 5, 5, undefined, undefined, Number(expiration2));
    const outputValue = 10n * 10n ** 18n;
    const defiEvents = [
        { bridgeId: bridge1.toBigInt(), nonce: 56, totalInputValue: 56n * 10n ** 16n, blockNumber: 59 },
        { bridgeId: bridge1.toBigInt(), nonce: 158, totalInputValue: 158n * 10n ** 16n, blockNumber: 62 },
        { bridgeId: bridge1.toBigInt(), nonce: 190, totalInputValue: 190n * 10n ** 16n, blockNumber: 76 },
        { bridgeId: bridge2.toBigInt(), nonce: 194, totalInputValue: 194n * 10n ** 16n, blockNumber: 91 },
        { bridgeId: bridge1.toBigInt(), nonce: 203, totalInputValue: 203n * 10n ** 16n, blockNumber: 103 },
        { bridgeId: bridge2.toBigInt(), nonce: 216, totalInputValue: 216n * 10n ** 16n, blockNumber: 116 },
        { bridgeId: bridge2.toBigInt(), nonce: 227, totalInputValue: 227n * 10n ** 16n, blockNumber: 125 },
        { bridgeId: bridge1.toBigInt(), nonce: 242, totalInputValue: 242n * 10n ** 16n, blockNumber: 134 },
        { bridgeId: bridge1.toBigInt(), nonce: 289, totalInputValue: 289n * 10n ** 16n, blockNumber: 147 },
    ];
    const getDefiEvents = (nonce, from, to) => {
        return defiEvents.filter(x => x.nonce == nonce && x.blockNumber >= from && x.blockNumber <= to);
    };
    const getDefiEvent = (nonce) => {
        return defiEvents.find(x => x.nonce == nonce);
    };
    const getTrancheDeploymentBlockNumber = (nonce) => {
        const bridge = defiEvents.find(x => x.nonce == Number(nonce));
        if (bridge?.bridgeId ?? 1n == 1n) {
            return tranche1DeploymentBlockNumber;
        }
        return tranche2DeploymentBlockNumber;
    };
    elementBridge = {
        interactions: jest.fn().mockImplementation(async (nonce) => {
            return interactions[Number(nonce)];
        }),
        getTrancheDeploymentBlockNumber: jest.fn().mockImplementation(async (nonce) => {
            const promise = Promise.resolve(getTrancheDeploymentBlockNumber(nonce));
            return promise;
        }),
        provider: {
            getBlockNumber: jest.fn().mockResolvedValue(200),
            getBlock: jest.fn().mockResolvedValue({ timestamp: +now.toString(), number: 200 }),
        },
    };
    rollupContract = {
        queryFilter: jest.fn().mockImplementation((filter, from, to) => {
            const nonce = filter.interactionNonce;
            const [defiEvent] = getDefiEvents(nonce, from, to);
            if (defiEvent === undefined) {
                return [];
            }
            const bridgeId = bridge_id_1.BridgeId.fromBigInt(defiEvent.bridgeId);
            return [
                {
                    getBlock: jest.fn().mockResolvedValue({ timestamp: +startDate.toString(), number: defiEvent.blockNumber }),
                    args: [
                        ethers_1.BigNumber.from(bridgeId.toBigInt()),
                        ethers_1.BigNumber.from(defiEvent.nonce),
                        ethers_1.BigNumber.from(defiEvent.totalInputValue),
                    ],
                },
            ];
        }),
        filters: {
            AsyncDefiBridgeProcessed: jest.fn().mockImplementation((bridgeId, interactionNonce) => {
                return {
                    bridgeId,
                    interactionNonce,
                };
            }),
        },
    };
    const createElementBridgeData = (element = elementBridge, balancer = balancerContract, rollup = rollupContract, chainProperties = { eventBatchSize: 10 }) => {
        typechain_types_1.ElementBridge__factory.connect = () => element;
        typechain_types_1.IVault__factory.connect = () => balancer;
        typechain_types_1.RollupProcessor__factory.connect = () => rollup;
        return element_bridge_data_1.ElementBridgeData.create({}, address_1.EthAddress.ZERO, address_1.EthAddress.ZERO, address_1.EthAddress.ZERO, chainProperties); // can pass in dummy values here as the above factories do all of the work
    };
    it('should return the correct amount of interest', async () => {
        const elementBridgeData = createElementBridgeData();
        interactions[56] = {
            quantityPT: ethers_1.BigNumber.from(outputValue),
            expiry: ethers_1.BigNumber.from(expiration1),
            trancheAddress: '',
            finalised: false,
            failed: false,
        };
        const defiEvent = getDefiEvent(56);
        const [daiValue] = await elementBridgeData.getInteractionPresentValue(56n);
        const delta = outputValue - defiEvent.totalInputValue;
        const scalingFactor = elementBridgeData.scalingFactor;
        const ratio = ((BigInt(now) - startDate) * scalingFactor) / (expiration1 - startDate);
        const out = defiEvent.totalInputValue + (delta * ratio) / scalingFactor;
        expect(daiValue.amount).toStrictEqual(out);
        expect(Number(daiValue.assetId)).toStrictEqual(bridge1.inputAssetIdA);
    });
    it('should return the correct amount of interest for multiple interactions', async () => {
        const elementBridgeData = createElementBridgeData();
        const testInteraction = async (nonce) => {
            const defiEvent = getDefiEvent(nonce);
            const bridgeId = bridge_id_1.BridgeId.fromBigInt(defiEvent.bridgeId);
            interactions[nonce] = {
                quantityPT: ethers_1.BigNumber.from(10n * 10n ** 18n),
                expiry: ethers_1.BigNumber.from(bridgeId.auxData),
                trancheAddress: '',
                finalised: false,
                failed: false,
            };
            const [daiValue] = await elementBridgeData.getInteractionPresentValue(BigInt(nonce));
            const delta = interactions[nonce].quantityPT.toBigInt() - defiEvent.totalInputValue;
            const scalingFactor = elementBridgeData.scalingFactor;
            const ratio = ((BigInt(now) - startDate) * scalingFactor) / (BigInt(bridgeId.auxData) - startDate);
            const out = defiEvent.totalInputValue + (delta * ratio) / scalingFactor;
            expect(daiValue.amount).toStrictEqual(out);
            expect(Number(daiValue.assetId)).toStrictEqual(bridgeId.inputAssetIdA);
        };
        await testInteraction(56);
        await testInteraction(190);
        await testInteraction(242);
        await testInteraction(216);
        await testInteraction(194);
        await testInteraction(203);
        await testInteraction(216);
        await testInteraction(190);
    });
    it('requesting the present value of an unknown interaction should return empty values', async () => {
        const elementBridgeData = createElementBridgeData();
        const values = await elementBridgeData.getInteractionPresentValue(57n);
        expect(values).toStrictEqual([]);
    });
    it('should return the correct expiration of the tranche', async () => {
        const endDate = Math.floor(Date.now() / 1000) + 86400 * 60;
        elementBridge = {
            interactions: jest.fn().mockImplementation(async () => {
                return {
                    quantityPT: ethers_1.BigNumber.from(1),
                    trancheAddress: '',
                    expiry: ethers_1.BigNumber.from(endDate),
                    finalised: false,
                    failed: false,
                };
            }),
            provider: {
                getBlockNumber: jest.fn().mockResolvedValue(200),
                getBlock: jest.fn().mockResolvedValue({ timestamp: +now.toString(), number: 200 }),
            },
        };
        const elementBridgeData = createElementBridgeData(elementBridge);
        const expiration = await elementBridgeData.getExpiration(1n);
        expect(expiration).toBe(BigInt(endDate));
    });
    it('should return the correct yield of the tranche', async () => {
        const now = Math.floor(Date.now() / 1000);
        const expiry = BigInt(now + 86400 * 30);
        const trancheAddress = '0x90ca5cef5b29342b229fb8ae2db5d8f4f894d652';
        const poolId = '0x90ca5cef5b29342b229fb8ae2db5d8f4f894d6520002000000000000000000b5';
        const interest = BigInt(1e16);
        const inputValue = BigInt(10e18), elementBridge = {
            hashAssetAndExpiry: jest.fn().mockResolvedValue('0xa'),
            pools: jest.fn().mockResolvedValue([trancheAddress, '', poolId]),
            provider: {
                getBlockNumber: jest.fn().mockResolvedValue(200),
                getBlock: jest.fn().mockResolvedValue({ timestamp: +now.toString(), number: 200 }),
            },
        };
        balancerContract = {
            ...balancerContract,
            queryBatchSwap: jest.fn().mockImplementation((...args) => {
                return Promise.resolve([ethers_1.BigNumber.from(inputValue), ethers_1.BigNumber.from(-BigInt(inputValue + interest))]);
            }),
        };
        const elementBridgeData = createElementBridgeData(elementBridge, balancerContract, rollupContract);
        const output = await elementBridgeData.getExpectedYield({
            assetType: bridge_data_1.AztecAssetType.ERC20,
            erc20Address: 'test',
            id: 1n,
        }, {
            assetType: bridge_data_1.AztecAssetType.NOT_USED,
            erc20Address: constants_1.AddressZero,
            id: 0n,
        }, {
            assetType: bridge_data_1.AztecAssetType.ERC20,
            erc20Address: 'test',
            id: 1n,
        }, {
            assetType: bridge_data_1.AztecAssetType.NOT_USED,
            erc20Address: constants_1.AddressZero,
            id: 0n,
        }, expiry, BigInt(inputValue));
        const YEAR = 60 * 60 * 24 * 365;
        const timeToExpiration = expiry - BigInt(now);
        const scaledOut = (BigInt(interest) * elementBridgeData.scalingFactor) / timeToExpiration;
        const yearlyOut = (scaledOut * BigInt(YEAR)) / elementBridgeData.scalingFactor;
        const scaledPercentage = (yearlyOut * elementBridgeData.scalingFactor) / inputValue;
        const percentage2sf = scaledPercentage / (elementBridgeData.scalingFactor / 10000n);
        const percent = Number(percentage2sf) / 100;
        expect(output[0]).toBe(percent);
    });
    it('should return the correct market size for a given tranche', async () => {
        const expiry = BigInt(Date.now() + 86400 * 30);
        const tokenAddress = randomAddress();
        const poolId = '0x90ca5cef5b29342b229fb8ae2db5d8f4f894d6520002000000000000000000b5';
        const tokenBalance = 10e18, elementBridge = {
            hashAssetAndExpiry: jest.fn().mockResolvedValue('0xa'),
            pools: jest.fn().mockResolvedValue([tokenAddress, '', poolId]),
            provider: {
                getBlockNumber: jest.fn().mockResolvedValue(200),
                getBlock: jest.fn().mockResolvedValue({ timestamp: +now.toString(), number: 200 }),
            },
        };
        balancerContract = {
            ...balancerContract,
            getPoolTokens: jest.fn().mockResolvedValue([[tokenAddress], [ethers_1.BigNumber.from(BigInt(tokenBalance))]]),
        };
        const elementBridgeData = createElementBridgeData(elementBridge, balancerContract, rollupContract);
        const marketSize = await elementBridgeData.getMarketSize({
            assetType: bridge_data_1.AztecAssetType.ERC20,
            erc20Address: 'test',
            id: 1n,
        }, {
            assetType: bridge_data_1.AztecAssetType.NOT_USED,
            erc20Address: constants_1.AddressZero,
            id: 0n,
        }, {
            assetType: bridge_data_1.AztecAssetType.ERC20,
            erc20Address: 'test',
            id: 1n,
        }, {
            assetType: bridge_data_1.AztecAssetType.NOT_USED,
            erc20Address: constants_1.AddressZero,
            id: 0n,
        }, expiry);
        expect(marketSize[0].assetId).toBe(BigInt(tokenAddress));
        expect(marketSize[0].amount).toBe(BigInt(tokenBalance));
        expect(marketSize.length).toBe(1);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWxlbWVudC1icmlkZ2UtZGF0YS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NsaWVudC9lbGVtZW50L2VsZW1lbnQtYnJpZGdlLWRhdGEudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUEyRTtBQUMzRSxtQ0FBbUM7QUFDbkMsbUNBQXFDO0FBQ3JDLDhEQU9rQztBQUNsQyw2REFBeUQ7QUFDekQsZ0RBQWdEO0FBQ2hELHdEQUF1RDtBQUN2RCx5REFBeUQ7QUFFekQsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7Q0FDOUIsQ0FBQyxDQUFDLENBQUM7QUFNSixNQUFNLGFBQWEsR0FBRyxHQUFHLEVBQUUsQ0FBQyxLQUFLLElBQUEsb0JBQVcsRUFBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQztBQUVuRSxNQUFNLDZCQUE2QixHQUFHLEdBQUcsQ0FBQztBQUMxQyxNQUFNLDZCQUE2QixHQUFHLEdBQUcsQ0FBQztBQWlCMUMsTUFBTSxZQUFZLEdBQW1DLEVBQUUsQ0FBQztBQUV4RCxRQUFRLENBQUMscUJBQXFCLEVBQUUsR0FBRyxFQUFFO0lBQ25DLElBQUksY0FBd0MsQ0FBQztJQUM3QyxJQUFJLGFBQXFDLENBQUM7SUFDMUMsSUFBSSxnQkFBaUMsQ0FBQztJQUN0QyxNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUMxQyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM3QyxNQUFNLFdBQVcsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztJQUM3QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsR0FBRyxHQUFHLEtBQUssR0FBRyxFQUFFLENBQUMsQ0FBQztJQUMzQyxNQUFNLE9BQU8sR0FBRyxJQUFJLG9CQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNqRixNQUFNLE9BQU8sR0FBRyxJQUFJLG9CQUFRLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztJQUNqRixNQUFNLFdBQVcsR0FBRyxHQUFHLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQztJQUVyQyxNQUFNLFVBQVUsR0FBRztRQUNqQixFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLEVBQUUsRUFBRSxlQUFlLEVBQUUsR0FBRyxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBZTtRQUM1RyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxlQUFlLEVBQUUsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBZTtRQUM5RyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxlQUFlLEVBQUUsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBZTtRQUM5RyxFQUFFLFFBQVEsRUFBRSxPQUFPLENBQUMsUUFBUSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxlQUFlLEVBQUUsSUFBSSxHQUFHLEdBQUcsSUFBSSxHQUFHLEVBQUUsV0FBVyxFQUFFLEVBQUUsRUFBZTtRQUM5RyxFQUFFLFFBQVEsRUFBRSxP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