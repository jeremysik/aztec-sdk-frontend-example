"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mstable_bridge_data_1 = require("./mstable-bridge-data");
const ethers_1 = require("ethers");
const typechain_types_1 = require("../../../typechain-types");
const bridge_data_1 = require("../bridge-data");
const constants_1 = require("@ethersproject/constants");
const address_1 = require("@aztec/barretenberg/address");
jest.mock('../aztec/provider', () => ({
    createWeb3Provider: jest.fn(),
}));
describe('mstable bridge data', () => {
    let mStableAsset;
    let mStableSavingsContract;
    const createMStableBridgeData = (asset = mStableAsset, savings = mStableSavingsContract) => {
        typechain_types_1.IMStableAsset__factory.connect = () => asset;
        typechain_types_1.IMStableSavingsContract__factory.connect = () => savings;
        return mstable_bridge_data_1.MStableBridgeData.create({}, address_1.EthAddress.ZERO, address_1.EthAddress.ZERO); // can pass in dummy values here as the above factories do all of the work
    };
    it('should return the correct expected output for dai -> imUSD', async () => {
        const exchangeRateOutput = 116885615338892891n;
        const inputValue = 10e18;
        mStableAsset = {
            ...mStableAsset,
            getMintOutput: jest.fn().mockImplementation((...args) => {
                const amount = args[1];
                return Promise.resolve(ethers_1.BigNumber.from(BigInt(amount)));
            }),
        };
        mStableSavingsContract = {
            ...mStableSavingsContract,
            exchangeRate: jest.fn().mockImplementation((...args) => {
                return Promise.resolve(ethers_1.BigNumber.from(BigInt(exchangeRateOutput)));
            }),
        };
        const mStableBridgeData = createMStableBridgeData(mStableAsset, mStableSavingsContract);
        const output = await mStableBridgeData.getExpectedOutput({
            assetType: bridge_data_1.AztecAssetType.ERC20,
            erc20Address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
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
        }, 50n, BigInt(inputValue));
        expect(output[0]).toBe(85553726786n);
    });
    it('should return the correct expected output for imUSD -> dai', async () => {
        const exchangeRateOutput = 116885615338892891n;
        const inputValue = 10e18;
        mStableAsset = {
            ...mStableAsset,
            getRedeemOutput: jest.fn().mockImplementation((...args) => {
                const amount = args[1];
                return Promise.resolve(ethers_1.BigNumber.from(BigInt(amount)));
            }),
        };
        mStableSavingsContract = {
            ...mStableSavingsContract,
            exchangeRate: jest.fn().mockImplementation((...args) => {
                return Promise.resolve(ethers_1.BigNumber.from(BigInt(exchangeRateOutput)));
            }),
        };
        const mStableBridgeData = createMStableBridgeData(mStableAsset, mStableSavingsContract);
        const output = await mStableBridgeData.getExpectedOutput({
            assetType: bridge_data_1.AztecAssetType.ERC20,
            erc20Address: '',
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
        }, 50n, BigInt(inputValue));
        expect(output[0]).toBe(1168856153388928910000000000000000000n);
    });
    it('should return the correct yearly output', async () => {
        const exchangeRateOutput = 116885615338892891n;
        const inputValue = 10e18;
        mStableAsset = {
            ...mStableAsset,
            getRedeemOutput: jest.fn().mockImplementation((...args) => {
                const amount = args[0];
                return Promise.resolve(ethers_1.BigNumber.from(BigInt(amount)));
            }),
        };
        mStableSavingsContract = {
            ...mStableSavingsContract,
            exchangeRate: jest.fn().mockImplementation((...args) => {
                return Promise.resolve(ethers_1.BigNumber.from(BigInt(exchangeRateOutput)));
            }),
        };
        const mStableBridgeData = createMStableBridgeData(mStableAsset, mStableSavingsContract);
        const output = await mStableBridgeData.getExpectedYield({
            assetType: bridge_data_1.AztecAssetType.ERC20,
            erc20Address: '0x30647a72dc82d7fbb1123ea74716ab8a317eac19',
            id: 1n,
        }, {
            assetType: bridge_data_1.AztecAssetType.NOT_USED,
            erc20Address: constants_1.AddressZero,
            id: 0n,
        }, {
            assetType: bridge_data_1.AztecAssetType.ERC20,
            erc20Address: '0x6B175474E89094C44Da98b954EedeAC495271d0F',
            id: 1n,
        }, {
            assetType: bridge_data_1.AztecAssetType.NOT_USED,
            erc20Address: constants_1.AddressZero,
            id: 0n,
        }, 50n, BigInt(inputValue));
        expect(output[0]).toBeGreaterThan(0);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXN0YWJsZS1icmlkZ2UtZGF0YS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NsaWVudC9tc3RhYmxlL21zdGFibGUtYnJpZGdlLWRhdGEudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtEQUEwRDtBQUMxRCxtQ0FBbUM7QUFDbkMsOERBS2tDO0FBQ2xDLGdEQUFnRDtBQUNoRCx3REFBdUQ7QUFDdkQseURBQXlEO0FBRXpELElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQztJQUNwQyxrQkFBa0IsRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFO0NBQzlCLENBQUMsQ0FBQyxDQUFDO0FBTUosUUFBUSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsRUFBRTtJQUNuQyxJQUFJLFlBQW9DLENBQUM7SUFDekMsSUFBSSxzQkFBd0QsQ0FBQztJQUU3RCxNQUFNLHVCQUF1QixHQUFHLENBQzlCLFFBQXVCLFlBQW1CLEVBQzFDLFVBQW1DLHNCQUE2QixFQUNoRSxFQUFFO1FBQ0Ysd0NBQXNCLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLEtBQVksQ0FBQztRQUNwRCxrREFBZ0MsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsT0FBYyxDQUFDO1FBQ2hFLE9BQU8sdUNBQWlCLENBQUMsTUFBTSxDQUFDLEVBQVMsRUFBRSxvQkFBVSxDQUFDLElBQUksRUFBRSxvQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsMEVBQTBFO0lBQzFKLENBQUMsQ0FBQztJQUVGLEVBQUUsQ0FBQyw0REFBNEQsRUFBRSxLQUFLLElBQUksRUFBRTtRQUMxRSxNQUFNLGtCQUFrQixHQUFHLG1CQUFtQixDQUFDO1FBQy9DLE1BQU0sVUFBVSxHQUFHLEtBQUssQ0FBQztRQUN6QixZQUFZLEdBQUc7WUFDYixHQUFHLFlBQVk7WUFDZixhQUFhLEVBQUUsSUFBSSxDQUFDLEVB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