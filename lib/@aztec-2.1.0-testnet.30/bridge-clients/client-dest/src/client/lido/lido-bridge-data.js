"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LidoBridgeData = void 0;
const bridge_data_1 = require("../bridge-data");
const typechain_types_1 = require("../../../typechain-types");
const provider_1 = require("../aztec/provider");
class LidoBridgeData {
    constructor(wstETHContract, lidoOracleContract, curvePoolContract) {
        this.wstETHContract = wstETHContract;
        this.lidoOracleContract = lidoOracleContract;
        this.curvePoolContract = curvePoolContract;
        this.scalingFactor = 1n * 10n ** 18n;
        // Unused
        this.auxDataConfig = [
            {
                start: 0,
                length: 64,
                solidityType: bridge_data_1.SolidityType.uint64,
                description: 'Not Used',
            },
        ];
    }
    static create(provider, wstEthAddress, lidoOracleAddress, curvePoolAddress) {
        const ethersProvider = (0, provider_1.createWeb3Provider)(provider);
        const wstEthContract = typechain_types_1.IWstETH__factory.connect(wstEthAddress.toString(), ethersProvider);
        const lidoContract = typechain_types_1.ILidoOracle__factory.connect(lidoOracleAddress.toString(), ethersProvider);
        const curvePoolContract = typechain_types_1.ICurvePool__factory.connect(curvePoolAddress.toString(), ethersProvider);
        return new LidoBridgeData(wstEthContract, lidoContract, curvePoolContract);
    }
    // Lido bridge contract is stateless
    async getInteractionPresentValue(interactionNonce) {
        return [];
    }
    // Not applicable
    async getAuxData(inputAssetA, inputAssetB, outputAssetA, outputAssetB) {
        return [0n];
    }
    async getExpectedOutput(inputAssetA, inputAssetB, outputAssetA, outputAssetB, auxData, inputValue) {
        // ETH -> wstETH
        if (inputAssetA.assetType == bridge_data_1.AztecAssetType.ETH) {
            const curveMinOutput = await this.curvePoolContract.get_dy(0, 1, inputValue);
            if (curveMinOutput.toBigInt() > inputValue) {
                return [curveMinOutput.toBigInt()];
            }
            else {
                return [inputValue];
            }
        }
        // wstETH -> ETH
        if (inputAssetA.assetType == bridge_data_1.AztecAssetType.ERC20) {
            const stETHBalance = await this.wstETHContract.getStETHByWstETH(inputValue);
            const ETHBalance = await this.curvePoolContract.get_dy(1, 0, stETHBalance);
            return [ETHBalance.toBigInt()];
        }
        return [0n];
    }
    async getExpectedYield(inputAssetA, inputAssetB, outputAssetA, outputAssetB, auxData, precision) {
        const YEAR = 60n * 60n * 24n * 365n;
        if (outputAssetA.assetType === bridge_data_1.AztecAssetType.ETH) {
            const { postTotalPooledEther, preTotalPooledEther, timeElapsed } = await this.lidoOracleContract.getLastCompletedReportDelta();
            const scaledAPR = ((postTotalPooledEther.toBigInt() - preTotalPooledEther.toBigInt()) * YEAR * this.scalingFactor) /
                (preTotalPooledEther.toBigInt() * timeElapsed.toBigInt());
            return [Number(scaledAPR / (this.scalingFactor / 10000n)) / 100];
        }
        return [0];
    }
    async getMarketSize(inputAssetA, inputAssetB, outputAssetA, outputAssetB, auxData) {
        const { postTotalPooledEther } = await this.lidoOracleContract.getLastCompletedReportDelta();
        return [
            {
                assetId: inputAssetA.id,
                amount: postTotalPooledEther.toBigInt(),
            },
        ];
    }
}
exports.LidoBridgeData = LidoBridgeData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlkby1icmlkZ2UtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jbGllbnQvbGlkby9saWRvLWJyaWRnZS1kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdEQU93QjtBQUV4Qiw4REFPa0M7QUFFbEMsZ0RBQXVEO0FBR3ZELE1BQWEsY0FBYztJQUd6QixZQUNVLGNBQXVCLEVBQ3ZCLGtCQUErQixFQUMvQixpQkFBNkI7UUFGN0IsbUJBQWMsR0FBZCxjQUFjLENBQVM7UUFDdkIsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFhO1FBQy9CLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBWTtRQUxoQyxrQkFBYSxHQUFXLEVBQUUsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDO1FBcUIvQyxTQUFTO1FBQ0Ysa0JBQWEsR0FBb0I7WUFDdEM7Z0JBQ0UsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsWUFBWSxFQUFFLDBCQUFZLENBQUMsTUFBTTtnQkFDakMsV0FBVyxFQUFFLFVBQVU7YUFDeEI7U0FDRixDQUFDO0lBdkJDLENBQUM7SUFFSixNQUFNLENBQUMsTUFBTSxDQUNYLFFBQTBCLEVBQzFCLGFBQXlCLEVBQ3pCLGlCQUE2QixFQUM3QixnQkFBNEI7UUFFNUIsTUFBTSxjQUFjLEdBQUcsSUFBQSw2QkFBa0IsRUFBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxNQUFNLGNBQWMsR0FBRyxrQ0FBZ0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFFBQVEsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQzFGLE1BQU0sWUFBWSxHQUFHLHNDQUFvQixDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxjQUFjLENBQUMsQ0FBQztRQUNoRyxNQUFNLGlCQUFpQixHQUFHLHFDQUFtQixDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsRUFBRSxj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