"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MStableBridgeData = void 0;
const tslib_1 = require("tslib");
const node_fetch_1 = tslib_1.__importDefault(require("node-fetch"));
const bridge_data_1 = require("../bridge-data");
const typechain_types_1 = require("../../../typechain-types");
const provider_1 = require("../aztec/provider");
class MStableBridgeData {
    constructor(mStableSavingsContract, mStableAssetContract) {
        this.mStableSavingsContract = mStableSavingsContract;
        this.mStableAssetContract = mStableAssetContract;
        this.dai = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
        this.scalingFactor = 1000000000n;
        this.auxDataConfig = [
            {
                start: 0,
                length: 64,
                solidityType: bridge_data_1.SolidityType.uint64,
                description: 'Unix Timestamp of the tranch expiry',
            },
        ];
    }
    static create(provider, mStableSavingsAddress, mStableAssetAddress) {
        const ethersProvider = (0, provider_1.createWeb3Provider)(provider);
        const savingsContract = typechain_types_1.IMStableSavingsContract__factory.connect(mStableSavingsAddress.toString(), ethersProvider);
        const assetContract = typechain_types_1.IMStableAsset__factory.connect(mStableAssetAddress.toString(), ethersProvider);
        return new MStableBridgeData(savingsContract, assetContract);
    }
    async getAuxData(inputAssetA, inputAssetB, outputAssetA, outputAssetB) {
        return await [50n];
    }
    async getExpectedOutput(inputAssetA, inputAssetB, outputAssetA, outputAssetB, auxData, precision) {
        if (inputAssetA.erc20Address === this.dai) {
            const mintOutput = (await this.mStableAssetContract.getMintOutput(this.dai, precision)).toBigInt();
            const exchangeRate = (await this.mStableSavingsContract.exchangeRate()).toBigInt();
            return [(mintOutput * this.scalingFactor) / exchangeRate];
        }
        else {
            const exchangeRate = (await this.mStableSavingsContract.exchangeRate()).toBigInt();
            const redeemOutput = (await this.mStableAssetContract.getRedeemOutput(this.dai, precision)).toBigInt();
            return [exchangeRate * redeemOutput];
        }
    }
    async getExpectedYield(inputAssetA, inputAssetB, outputAssetA, outputAssetB, auxData, precision) {
        if (outputAssetA.erc20Address === this.dai) {
            // input asset is IMUSD
            const res = await (0, node_fetch_1.default)('https://api.thegraph.com/subgraphs/name/mstable/mstable-protocol', {
                method: 'POST',
                body: JSON.stringify({
                    query: 'query MyQuery {\n  savingsContracts {\n    dailyAPY\n  }\n}\n',
                    variables: null,
                    operationName: 'MyQuery',
                }),
            }).then(response => response.json());
            return [Number(res.data.savingsContracts[2].dailyAPY)];
        }
        return [];
    }
}
exports.MStableBridgeData = MStableBridgeData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXN0YWJsZS1icmlkZ2UtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jbGllbnQvbXN0YWJsZS9tc3RhYmxlLWJyaWRnZS1kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxvRUFBK0I7QUFDL0IsZ0RBQWlHO0FBQ2pHLDhEQUtrQztBQUVsQyxnREFBdUQ7QUFHdkQsTUFBYSxpQkFBaUI7SUFLNUIsWUFDVSxzQkFBK0MsRUFDL0Msb0JBQW1DO1FBRG5DLDJCQUFzQixHQUF0QixzQkFBc0IsQ0FBeUI7UUFDL0MseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFlO1FBTnJDLFFBQUcsR0FBRyw0Q0FBNEMsQ0FBQztRQUVwRCxrQkFBYSxHQUFHLFdBQVcsQ0FBQztRQXVCNUIsa0JBQWEsR0FBb0I7WUFDdEM7Z0JBQ0UsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsWUFBWSxFQUFFLDBCQUFZLENBQUMsTUFBTTtnQkFDakMsV0FBVyxFQUFFLHFDQUFxQzthQUNuRDtTQUNGLENBQUM7SUF6QkMsQ0FBQztJQUVKLE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBMEIsRUFBRSxxQkFBaUMsRUFBRSxtQkFBK0I7UUFDMUcsTUFBTSxjQUFjLEdBQUcsSUFBQSw2QkFBa0IsRUFBQyxRQUFRLENBQUMsQ0FBQztRQUNwRCxNQUFNLGVBQWUsR0FBRyxrREFBZ0MsQ0FBQyxPQUFPLENBQUMscUJBQXFCLENBQUMsUUFBUSxFQUFFLEVBQUUsY0FBYyxDQUFDLENBQUM7UUFDbkgsTUFBTSxhQUFhLEdBQUcsd0NBQXNCLENBQUMsT0FBTyxDQUFDLG1CQUFtQixDQUFDLFFBQVEsRUFBRSxFQUFFLGNBQWMsQ0FBQyxDQUFDO1FBQ3JHLE9BQU8sSUFBSSxpQkFBaUIsQ0FBQyxlQUFlLEVBQUUsYUFBYSxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVELEtBQUssQ0FBQyxVQUFVLENBQ2QsV0FBdUIsRUFDdkIsV0FBdUIsRUFDdkIsWUFBd0IsRUFDeEIsWUFBd0I7UUFFeEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDckIsQ0FBQztJQVdELEtBQUssQ0FBQyxpQkFBaUIsQ0FDckIsV0FBdUIsRUFDdkIsV0FBdUIsRUFDdkIsWUFBd0IsRUFDeEIsWUFBd0IsRUFDeEIsT0FBZSxFQUNmLFNBQWlCO1FBRWpCLElBQUksV0FBVyxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQ3pDLE1BQU0sVUFBVSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNuRyxNQUFNLFlBQVksR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLHNCQUFzQixDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDbkYsT0FBTyxDQUFDLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxZQUFZLENBQUMsQ0FBQztTQUMzRDthQUFNO1lBQ0wsTUFBTSxZQUFZLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25GLE1BQU0sWUFBWSxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsb0JBQW9CLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUN2RyxPQUFPLENBQUMsWUFBWSxHQUFHLFlBQVksQ0FBQyxDQUFDO1NBQ3RDO0lBQ0gsQ0FBQztJQUVELEtBQUssQ0FBQyxnQkFBZ0IsQ0FDcEIsV0FBdUIsRUFDdkIsV0FBdUIsRUFDdkIsWUFBd0IsRUFDeEIsWUFBd0IsRUFDeEIsT0FBZSxFQUNmLFNBQWlCO1FBRWpCLElBQUksWUFBWSxDQUFDLFlBQVksS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFO1lBQzFDLHVCQUF1QjtZQUN2QixNQUFNLEdBQUcsR0FBRyxNQUFNLElBQUEsb0JBQUssRUFBQyxrRUFBa0UsRUFBRTtnQkFDMUYsTUFBTSxFQUFFLE1BQU07Z0JBQ2QsSUFBSSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUM7b0JBQ25CLEtBQUssRUFBRSwrREFBK0Q7b0JBQ3RFLFNBQVMsRUFBRSxJQUFJO29CQUNmLGFBQWEsRUFBRSxTQUFTO2lCQUN6QixDQUFDO2FBQ0gsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBRXJDLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1NBQ3hEO1FBQ0QsT0FBTyxFQUFFLENBQUM7SUFDWixDQUFDO0NBQ0Y7QUE3RUQsOENBNkVDIn0=