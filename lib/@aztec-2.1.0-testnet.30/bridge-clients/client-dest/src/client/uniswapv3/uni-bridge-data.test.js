"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const async_uniswap_bridge_data_1 = require("./async-uniswap-bridge-data");
const uniswap_bridge_data_1 = require("./uniswap-bridge-data");
const ethers_1 = require("ethers");
const typechain_types_1 = require("../../../typechain-types");
const bridge_data_1 = require("../bridge-data");
const constants_1 = require("@ethersproject/constants");
const abi_1 = require("@ethersproject/abi");
const address_1 = require("@aztec/barretenberg/address");
//import '@types/jest';
jest.mock('../aztec/provider', () => ({
    createWeb3Provider: jest.fn(),
}));
describe('sync bridge data && async bridge data', () => {
    let syncBridgeData;
    let asyncBridgeData;
    let syncBridge;
    let asyncBridge;
    let ethAsset;
    let DAI;
    let WETH;
    let emptyAsset;
    let virtualAsset;
    const createSyncBridgeData = (bridge = syncBridge) => {
        typechain_types_1.SyncUniswapV3Bridge__factory.connect = () => bridge;
        return uniswap_bridge_data_1.SyncUniswapBridgeData.create(address_1.EthAddress.ZERO, {}); // can pass in dummy values here as the above factories do all of the work
    };
    const createASyncBridgeData = (bridge = syncBridge) => {
        typechain_types_1.AsyncUniswapV3Bridge__factory.connect = () => bridge;
        return async_uniswap_bridge_data_1.AsyncUniswapBridgeData.create(address_1.EthAddress.ZERO, {}); // can pass in dummy values here as the above factories do all of the work
    };
    beforeAll(() => {
        ethAsset = {
            id: 1n,
            assetType: bridge_data_1.AztecAssetType.ETH,
            erc20Address: constants_1.AddressZero,
        };
        DAI = {
            id: 2n,
            assetType: bridge_data_1.AztecAssetType.ERC20,
            erc20Address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
        };
        WETH = {
            id: 2n,
            assetType: bridge_data_1.AztecAssetType.ERC20,
            erc20Address: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2',
        };
        emptyAsset = {
            id: 0n,
            assetType: bridge_data_1.AztecAssetType.NOT_USED,
            erc20Address: constants_1.AddressZero,
        };
        virtualAsset = {
            id: 2n,
            assetType: bridge_data_1.AztecAssetType.VIRTUAL,
            erc20Address: constants_1.AddressZero,
        };
    });
    it('should return market liquidity', async () => {
        syncBridge = {
            ...syncBridge,
            getLiquidity: jest.fn().mockResolvedValue([ethers_1.BigNumber.from(100), ethers_1.BigNumber.from(100)]),
        };
        syncBridgeData = createSyncBridgeData(syncBridge);
        const output = await syncBridgeData.getMarketSize(WETH, DAI, emptyAsset, emptyAsset, 0n);
        expect(100n == output[0].amount && 100n == output[1].amount).toBeTruthy();
    });
    it('should get presentvalue', async () => {
        syncBridge = {
            ...syncBridge,
            getPresentValue: jest.fn().mockResolvedValue([ethers_1.BigNumber.from(1000), ethers_1.BigNumber.from(1000)]),
        };
        syncBridgeData = createSyncBridgeData(syncBridge);
        const output = await syncBridgeData.getInteractionPresentValue(BigInt(1));
        expect(1000n == output[0].amount && 1000n == output[1].amount).toBeTruthy();
    });
    it('should get the expected output', async () => {
        const depositAmount = 1000n;
        const out0 = BigInt(1000n);
        const out1 = BigInt(1000n);
        let abicoder = abi_1.defaultAbiCoder;
        let mockData = abicoder.encode(['uint256', 'uint256', 'bool'], [out0, out1, false]);
        //we encode 100 and 100
        syncBridge = {
            ...syncBridge,
            staticcall: jest.fn().mockResolvedValue(mockData),
        };
        syncBridgeData = createSyncBridgeData(syncBridge);
        const output = await syncBridgeData.getExpectedOutput(WETH, emptyAsset, virtualAsset, emptyAsset, 0n, depositAmount);
        expect(out0 == output[0] && out1 == output[1]).toBeTruthy();
    });
    it('should correctly return the auxData', async () => {
        syncBridge = {
            ...syncBridge,
            packData: jest.fn().mockResolvedValue(ethers_1.BigNumber.from(300000)),
        };
        syncBridgeData = createSyncBridgeData(syncBridge);
        let data = [100n, 100n, 100n];
        const output = await syncBridgeData.getAuxDataLP(data);
        expect(output[0]).toBe(300000n);
    });
    //asyncBridge
    it('should return market liquidity', async () => {
        asyncBridge = {
            ...asyncBridge,
            getLiquidity: jest.fn().mockResolvedValue([ethers_1.BigNumber.from(100), ethers_1.BigNumber.from(100)]),
        };
        asyncBridgeData = createASyncBridgeData(asyncBridge);
        const output = await asyncBridgeData.getMarketSize(WETH, DAI, emptyAsset, emptyAsset, 0n);
        expect(100n == output[0].amount && 100n == output[1].amount).toBeTruthy();
    });
    it('should get presentvalue', async () => {
        asyncBridge = {
            ...asyncBridge,
            getPresentValue: jest.fn().mockResolvedValue([ethers_1.BigNumber.from(100), ethers_1.BigNumber.from(100)]),
        };
        asyncBridgeData = createASyncBridgeData(asyncBridge);
        const output = await asyncBridgeData.getInteractionPresentValue(BigInt(1));
        expect(output[0].amount == BigInt(100) && output[1].amount == BigInt(100)).toBeTruthy();
    });
    it('should get the expiration', async () => {
        const interactionNonce = 100n;
        asyncBridge = {
            ...asyncBridge,
            getExpiry: jest.fn().mockResolvedValue(ethers_1.BigNumber.from(1000n)),
        };
        asyncBridgeData = createASyncBridgeData(asyncBridge);
        const output = await asyncBridgeData.getExpiration(interactionNonce);
        expect(1000n == output).toBeTruthy();
    });
    it('should correctly return the auxData', async () => {
        asyncBridge = {
            ...asyncBridge,
            packData: jest.fn().mockResolvedValue(ethers_1.BigNumber.from(300000n)),
        };
        //tickLower, tickUpper, fee, days
        let data = [100n, 100n, 100n, 100n];
        asyncBridgeData = createASyncBridgeData(asyncBridge);
        const output = await asyncBridgeData.getAuxDataLP(data);
        expect(output[0]).toBe(300000n);
    });
    it('should correctly check finalisability', async () => {
        const interactionNonce = 1000n;
        asyncBridge = {
            ...asyncBridge,
            finalised: jest.fn().mockResolvedValue(true),
        };
        asyncBridgeData = createASyncBridgeData(asyncBridge);
        const output = await asyncBridgeData.hasFinalised(interactionNonce);
        expect(output).toBe(true);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pLWJyaWRnZS1kYXRhLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvY2xpZW50L3VuaXN3YXB2My91bmktYnJpZGdlLWRhdGEudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDJFQUFxRTtBQUNyRSwrREFBOEQ7QUFDOUQsbUNBQW1DO0FBQ25DLDhEQUtrQztBQUNsQyxnREFBNEQ7QUFDNUQsd0RBQXVEO0FBQ3ZELDRDQUFxRDtBQUNyRCx5REFBeUQ7QUFDekQsdUJBQXVCO0FBRXZCLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNwQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO0NBQzlCLENBQUMsQ0FBQyxDQUFDO0FBTUosUUFBUSxDQUFDLHVDQUF1QyxFQUFFLEdBQUcsRUFBRTtJQUNyRCxJQUFJLGNBQXFDLENBQUM7SUFDMUMsSUFBSSxlQUF1QyxDQUFDO0lBQzVDLElBQUksVUFBd0MsQ0FBQztJQUM3QyxJQUFJLFdBQTBDLENBQUM7SUFFL0MsSUFBSSxRQUFvQixDQUFDO0lBQ3pCLElBQUksR0FBZSxDQUFDO0lBQ3BCLElBQUksSUFBZ0IsQ0FBQztJQUNyQixJQUFJLFVBQXNCLENBQUM7SUFDM0IsSUFBSSxZQUF3QixDQUFDO0lBRTdCLE1BQU0sb0JBQW9CLEdBQUcsQ0FBQyxTQUE4QixVQUFpQixFQUFFLEVBQUU7UUFDL0UsOENBQTRCLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQWEsQ0FBQztRQUMzRCxPQUFPLDJDQUFxQixDQUFDLE1BQU0sQ0FBQyxvQkFBVSxDQUFDLElBQUksRUFBRSxFQUFTLENBQUMsQ0FBQyxDQUFDLDBFQUEwRTtJQUM3SSxDQUFDLENBQUM7SUFFRixNQUFNLHFCQUFxQixHQUFHLENBQUMsU0FBK0IsVUFBaUIsRUFBRSxFQUFFO1FBQ2pGLCtDQUE2QixDQUFDLE9BQU8sR0FB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