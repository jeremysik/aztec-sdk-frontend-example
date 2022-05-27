"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lido_bridge_data_1 = require("./lido-bridge-data");
const typechain_types_1 = require("../../../typechain-types");
const bridge_data_1 = require("../bridge-data");
const ethers_1 = require("ethers");
const address_1 = require("@aztec/barretenberg/address");
jest.mock('../aztec/provider', () => ({
    createWeb3Provider: jest.fn(),
}));
describe('lido bridge data', () => {
    let lidoBridgeData;
    let wstethContract;
    let curvePoolContract;
    let lidoOracleContract;
    let ethAsset;
    let wstETHAsset;
    let emptyAsset;
    const createLidoBridgeData = (wsteth = wstethContract, curvePool = curvePoolContract, lidoOracle = lidoOracleContract) => {
        typechain_types_1.IWstETH__factory.connect = () => wsteth;
        typechain_types_1.ICurvePool__factory.connect = () => curvePool;
        typechain_types_1.ILidoOracle__factory.connect = () => lidoOracle;
        return lido_bridge_data_1.LidoBridgeData.create({}, address_1.EthAddress.ZERO, address_1.EthAddress.ZERO, address_1.EthAddress.ZERO); // can pass in dummy values here as the above factories do all of the work
    };
    beforeAll(() => {
        ethAsset = {
            id: 1n,
            assetType: bridge_data_1.AztecAssetType.ETH,
            erc20Address: '0x0',
        };
        wstETHAsset = {
            id: 2n,
            assetType: bridge_data_1.AztecAssetType.ERC20,
            erc20Address: '0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0',
        };
        emptyAsset = {
            id: 0n,
            assetType: bridge_data_1.AztecAssetType.NOT_USED,
            erc20Address: '0x0',
        };
    });
    it('should get wstETH when deposit small amount of ETH - curve route', async () => {
        const depositAmount = BigInt(10e18);
        const expectedOutput = depositAmount + 1n;
        curvePoolContract = {
            ...curvePoolContract,
            get_dy: jest.fn().mockResolvedValue(ethers_1.BigNumber.from(expectedOutput)),
        };
        lidoBridgeData = createLidoBridgeData(wstethContract, curvePoolContract, lidoOracleContract);
        const output = await lidoBridgeData.getExpectedOutput(ethAsset, emptyAsset, wstETHAsset, emptyAsset, 0n, depositAmount);
        expect(expectedOutput == output[0]).toBeTruthy();
    });
    it('should get wstETH when deposit a large amount of ETH - lido route', async () => {
        const depositAmount = BigInt(10000000e18);
        const expectedOutput = depositAmount;
        curvePoolContract = {
            ...curvePoolContract,
            get_dy: jest.fn().mockResolvedValue(ethers_1.BigNumber.from(depositAmount - 1n)),
        };
        lidoBridgeData = createLidoBridgeData(wstethContract, curvePoolContract, lidoOracleContract);
        const output = await lidoBridgeData.getExpectedOutput(ethAsset, emptyAsset, wstETHAsset, emptyAsset, 0n, depositAmount);
        expect(expectedOutput == output[0]).toBeTruthy();
    });
    it('should exit to ETH when deposit WstETH', async () => {
        const depositAmount = BigInt(100e18);
        const stethOutputAmount = BigInt(101e18);
        const expectedOutput = BigInt(105e18);
        wstethContract = {
            ...wstethContract,
            getStETHByWstETH: jest.fn().mockResolvedValue(ethers_1.BigNumber.from(stethOutputAmount)),
        };
        curvePoolContract = {
            ...curvePoolContract,
            get_dy: jest.fn().mockResolvedValue(ethers_1.BigNumber.from(expectedOutput)),
        };
        lidoBridgeData = createLidoBridgeData(wstethContract, curvePoolContract, lidoOracleContract);
        const output = await lidoBridgeData.getExpectedOutput(wstETHAsset, emptyAsset, ethAsset, emptyAsset, 0n, depositAmount);
        expect(expectedOutput == output[0]).toBeTruthy();
    });
    it('should correctly return the expectedYearlyOutput', async () => {
        const depositAmount = BigInt(1 * 10e18);
        const expectedOutput = 4.32;
        wstethContract = {
            ...wstethContract,
            getStETHByWstETH: jest.fn().mockImplementation(async (input) => {
                // force WSTETH and STETH to have the same value
                return ethers_1.BigNumber.from((BigInt(input) * 100n) / 100n);
            }),
        };
        curvePoolContract = {
            ...curvePoolContract,
            get_dy: jest.fn().mockImplementation(async (x, y, input) => {
                // force ETH and STETH to have the same value
                return ethers_1.BigNumber.from((BigInt(input) * 100n) / 100n);
            }),
        };
        lidoOracleContract = {
            ...lidoOracleContract,
            getLastCompletedReportDelta: jest.fn().mockResolvedValue({
                timeElapsed: ethers_1.BigNumber.from(86400n),
                postTotalPooledEther: ethers_1.BigNumber.from(2777258873714679039007057n),
                preTotalPooledEther: ethers_1.BigNumber.from(2776930205843708039007057n),
            }),
        };
        lidoBridgeData = createLidoBridgeData(wstethContract, curvePoolContract, lidoOracleContract);
        const output = await lidoBridgeData.getExpectedYield(wstETHAsset, emptyAsset, ethAsset, emptyAsset, 0n, depositAmount);
        expect(expectedOutput).toBe(output[0]);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlkby1icmlkZ2UtZGF0YS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2NsaWVudC9saWRvL2xpZG8tYnJpZGdlLWRhdGEudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLHlEQUFvRDtBQUNwRCw4REFPa0M7QUFDbEMsZ0RBQTREO0FBQzVELG1DQUFtQztBQUNuQyx5REFBeUQ7QUFFekQsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsRUFBRSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ3BDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUU7Q0FDOUIsQ0FBQyxDQUFDLENBQUM7QUFNSixRQUFRLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxFQUFFO0lBQ2hDLElBQUksY0FBOEIsQ0FBQztJQUNuQyxJQUFJLGNBQWdDLENBQUM7SUFDckMsSUFBSSxpQkFBc0MsQ0FBQztJQUMzQyxJQUFJLGtCQUF3QyxDQUFDO0lBRTdDLElBQUksUUFBb0IsQ0FBQztJQUN6QixJQUFJLFdBQXVCLENBQUM7SUFDNUIsSUFBSSxVQUFzQixDQUFDO0lBRTNCLE1BQU0sb0JBQW9CLEdBQUcsQ0FDM0IsU0FBa0IsY0FBcUIsRUFDdkMsWUFBd0IsaUJBQXdCLEVBQ2hELGFBQTBCLGtCQUF5QixFQUNuRCxFQUFFO1FBQ0Ysa0NBQWdCLENBQUMsT0FBTyxHQUFHLEdBQUcsRUFBRSxDQUFDLE1BQWEsQ0FBQztRQUMvQyxxQ0FBbUIsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsU0FBZ0IsQ0FBQztRQUNyRCxzQ0FBb0IsQ0FBQyxPQUFPLEdBQUcsR0FBRyxFQUFFLENBQUMsVUFBaUIsQ0FBQztRQUN2RCxPQUFPLGlDQUFjLENBQUMsTUFBTSxDQUFDLEVBQVMsRUFBRSxvQkFBVSxDQUFDLElBQUksRUFBRSxvQkFBVSxDQUFDLElBQUksRUFBRSxvQkFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsMEVBQTBFO0lBQ3hLLENBQUMsQ0FBQztJQUVGLFNBQVMsQ0FBQyxHQUFHLEVBQUU7UUFDYixRQUFRLEdBQUc7WUFDVCxFQUFFLEVBQUUsRUFBRTtZQUNOLFNBQVMsRUFBRSw0QkFBYyxDQUFDLEdBQUc7WUFDN0IsWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQztRQUNGLFdBQVcsR0FBRztZQUNaLEVBQUUsRUFBRSxFQUFFO1lBQ04sU0FBUyxFQUFFLDRCQUFjLENBQUMsS0FBSztZQUMvQixZQUFZLEVBQUUsNENBQTRDO1NBQzNELENBQUM7UUFDRixVQUFVLEdBQUc7WUFDWCxFQUFFLEVBQUUsRUFBRTtZQUNOLFNBQVMsRUFBRSw0QkFBYyxDQUFDLFFBQVE7WUFDbEMsWUFBWSxFQUFFLEtBQUs7U0FDcEIsQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLGtFQUFrRSxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2hGLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwQyxNQUFNLGNBQWMsR0FBRyxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBRTFDLGlCQUFpQixHQUFHO1lBQ2xCLEdBQUcsaUJBQWlCO1lBQ3BCLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRSxFQUFFLENBQUMsaUJBQWlCLENBQUMsa0JBQVMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUM7U0FDcEUsQ0FBQztRQUVGLGNBQWMsR0FBRyxvQkFBb0IsQ0FBQyxjQUFxQixFQUFFLGlCQUF3QixFQUFFLGtCQUF5QixDQUFDLENBQUM7UUFFbEgsTUFBTSxNQUFNLEdBQUcsTUFBTSxjQUFjLENBQUMsaUJBQWlCLENBQ25ELFFBQVEsRUFDUixVQUFVLEVBQ1YsV0FBVyxFQUNYLFVBQVUsRUFDVixFQUFFLEVBQ0YsYUFBYSxDQUNkLENBQUM7UUFDRixNQUFNLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLG1FQUFtRSxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2pGLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUMxQyxNQUFNLGNBQWMsR0FBRyxhQUFhLENBQUM7UUFFckMsaUJBQWlCLEdBQUc7WUFDbEIsR0FBRyxpQkFBaUI7WUFDcEIsTUFBTSxFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBUyxDQUFDLElBQUksQ0FBQyxhQUFhLEdBQUcsRUFBRSxDQUFDLENBQUM7U0FDeEUsQ0FBQztRQUVGLGNBQWMsR0FBRyxvQkFBb0IsQ0FBQyxjQUFxQixFQUFFLGlCQUF3QixFQUFFLGtCQUF5QixDQUFDLENBQUM7UUFFbEgsTUFBTSxNQUFNLEdBQUcsTUFBTSxjQUFjLENBQUMsaUJBQWlCLENBQ25ELFFBQVEsRUFDUixVQUFVLEVBQ1YsV0FBVyxFQUNYLFVBQVUsRUFDVixFQUFFLEVBQ0YsYUFBYSxDQUNkLENBQUM7UUFDRixNQUFNLENBQUMsY0FBYyxJQUFJLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBQ25ELENBQUMsQ0FBQyxDQUFDO0lBQ0gsRUFBRSxDQUFDLHdDQUF3QyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3RELE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNyQyxNQUFNLGlCQUFpQixHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUN6QyxNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFFdEMsY0FBYyxHQUFHO1lBQ2YsR0FBRyxjQUFjO1lBQ2pCLGdCQUFnQixFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxrQkFBUyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1NBQ2pGLENBQUM7UUFFRixpQkFBaUIsR0FBRztZQUNsQixHQUFHLGlCQUFpQjtZQUNwQixNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLGtCQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1NBQ3BFLENBQUM7UUFFRixjQUFjLEdBQUcsb0JBQW9CLENBQUMsY0FBcUIsRUFBRSxpQkFBd0IsRUFBRSxrQkFBeUIsQ0FBQyxDQUFDO1FBRWxILE1BQU0sTUFBTSxHQUFHLE1BQU0sY0FBYyxDQUFDLGlCQUFpQixDQUNuRCxXQUFXLEVBQ1gsVUFBVSxFQUNWLFFBQVEsRUFDUixVQUFVLEVBQ1YsRUFBRSxFQUNGLGFBQWEsQ0FDZCxDQUFDO1FBRUYsTUFBTSxDQUFDLGNBQWMsSUFBSSxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUNuRCxDQUFDLENBQUMsQ0FBQztJQUVILEVBQUUsQ0FBQyxrREFBa0QsRUFBRSxLQUFLLElBQUksRUFBRTtRQUNoRSxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLE1BQU0sY0FBYyxHQUFHLElBQUksQ0FBQztRQUU1QixjQUFjLEdBQUc7WUFDZixHQUFHLGNBQWM7WUFDakIsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBQyxLQUFLLEVBQUMsRUFBRTtnQkFDM0QsZ0RBQWdEO2dCQUNoRCxPQUFPLGtCQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO1lBQ3ZELENBQUMsQ0FBQztTQUNILENBQUM7UUFFRixpQkFBaUIsR0FBRztZQUNsQixHQUFHLGlCQUFpQjtZQUNwQixNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEtBQUssRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFO2dCQUN6RCw2Q0FBNkM7Z0JBQzdDLE9BQU8sa0JBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLENBQUM7WUFDdkQsQ0FBQyxDQUFDO1NBQ0gsQ0FBQztRQUVGLGtCQUFrQixHQUFHO1lBQ25CLEdBQUcsa0JBQWtCO1lBQ3JCLDJCQUEyQixFQUFFLElBQUksQ0FBQyxFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztnQkFDdkQsV0FBVyxFQUFFLGtCQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztnQkFDbkMsb0JBQW9CLEVBQUUsa0JBQVMsQ0FBQyxJQUFJLENBQUMsMEJBQTBCLENBQUM7Z0JBQ2hFLG1CQUFtQixFQUFFLGtCQUFTLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDO2FBQ2hFLENBQUM7U0FDSCxDQUFDO1FBRUYsY0FBYyxHQUFHLG9CQUFvQixDQUFDLGNBQXFCLEVBQUUsaUJBQXdCLEVBQUUsa0JBQXlCLENBQUMsQ0FBQztRQUVsSCxNQUFNLE1BQU0sR0FBRyxNQUFNLGNBQWMsQ0FBQyxnQkFBZ0IsQ0FDbEQsV0FBVyxFQUNYLFVBQVUsRUFDVixRQUFRLEVBQ1IsVUFBVSxFQUNWLEVBQUUsRUFDRixhQUFhLENBQ2QsQ0FBQztRQUNGLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9