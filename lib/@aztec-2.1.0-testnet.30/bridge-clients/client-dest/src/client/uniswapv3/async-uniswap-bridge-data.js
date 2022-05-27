"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AsyncUniswapBridgeData = void 0;
const bridge_data_1 = require("../bridge-data");
const typechain_types_1 = require("../../../typechain-types");
const bignumber_1 = require("@ethersproject/bignumber");
const provider_1 = require("../aztec/provider");
class AsyncUniswapBridgeData {
    constructor(bridgeContract) {
        this.bridgeContract = bridgeContract;
        this.auxDataConfig = [
            {
                start: 0,
                length: 24,
                solidityType: bridge_data_1.SolidityType.uint24,
                description: 'tickLower',
            },
            {
                start: 0,
                length: 24,
                solidityType: bridge_data_1.SolidityType.uint24,
                description: 'tickLower',
            },
            {
                start: 48,
                length: 56,
                solidityType: bridge_data_1.SolidityType.uint8,
                description: 'fee',
            },
            {
                start: 56,
                length: 64,
                solidityType: bridge_data_1.SolidityType.uint8,
                description: 'expiry (in terms of days from now)',
            },
        ];
    }
    static create(uniSwapAddress, provider) {
        return new AsyncUniswapBridgeData(typechain_types_1.AsyncUniswapV3Bridge__factory.connect(uniSwapAddress.toString(), (0, provider_1.createWeb3Provider)(provider)));
    }
    // @dev This function should be implemented for stateful bridges. It should return an array of AssetValue's
    // @dev which define how much a given interaction is worth in terms of Aztec asset ids.
    // @param bigint interactionNonce the interaction nonce to return the value for
    async getInteractionPresentValue(interactionNonce) {
        // we get the present value of the interaction
        const amounts = await this.bridgeContract.getPresentValue(interactionNonce);
        return [
            {
                assetId: interactionNonce,
                amount: BigInt(amounts[0].toBigInt()),
            },
            {
                assetId: interactionNonce,
                amount: BigInt(amounts[1].toBigInt()),
            },
        ];
    }
    async getAuxData(inputAssetA, inputAssetB, outputAssetA, outputAssetB) {
        return [0n, 0n, 0n];
    }
    async getExpectedOutput(inputAssetA, inputAssetB, outputAssetA, outputAssetB, auxData, precision) {
        // bridge is async the third parameter represents this
        return [BigInt(0), BigInt(0), BigInt(1)];
    }
    async getMarketSize(inputAssetA, inputAssetB, outputAssetA, outputAssetB, auxData) {
        const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
        const zero = '0x0000000000000000000000000000000000000000';
        let inA = zero;
        let inB = zero;
        //gets the liquidity of the AMM pair in the tick range indicated by the provided auxData
        //the user should input the pairs via inputAssetA and inputAssetB , rather than
        //following the structure of the convert call they would actually take, since the limitations of
        //the convert call don't really matter here
        if (inputAssetA.assetType == bridge_data_1.AztecAssetType.ETH) {
            inA = WETH;
        }
        else if (inputAssetA.assetType == bridge_data_1.AztecAssetType.ERC20) {
            inA = inputAssetA.erc20Address;
        }
        if (inputAssetB.assetType == bridge_data_1.AztecAssetType.ETH) {
            inB = WETH;
        }
        else if (inputAssetB.assetType == bridge_data_1.AztecAssetType.ERC20) {
            inB = inputAssetB.erc20Address;
        }
        let balances = await this.bridgeContract.getLiquidity(inA, inB, bignumber_1.BigNumber.from(auxData));
        return [
            {
                assetId: BigInt(inputAssetA.erc20Address) < BigInt(inputAssetB.erc20Address)
                    ? BigInt(inputAssetA.erc20Address)
                    : BigInt(inputAssetB.erc20Address),
                amount: balances[0].toBigInt(),
            },
            {
                assetId: BigInt(inputAssetA.erc20Address) < BigInt(inputAssetB.erc20Address)
                    ? BigInt(inputAssetB.erc20Address)
                    : BigInt(inputAssetA.erc20Address),
                amount: balances[1].toBigInt(),
            },
        ];
    }
    async getAuxDataLP(data) {
        let tickLower = bignumber_1.BigNumber.from(data[0]);
        let tickUpper = bignumber_1.BigNumber.from(data[1]);
        let fee = bignumber_1.BigNumber.from(data[2]);
        let days = bignumber_1.BigNumber.from(data[3]);
        const auxData = await this.bridgeContract.packData(tickLower, tickUpper, fee, days);
        return [auxData.toBigInt()];
    }
    async getExpiration(interactionNonce) {
        const expiry = await this.bridgeContract.getExpiry(interactionNonce);
        return BigInt(expiry.toBigInt());
    }
    async hasFinalised(interactionNonce) {
        const finalised = await this.bridgeContract.finalised(interactionNonce);
        return finalised;
    }
}
exports.AsyncUniswapBridgeData = AsyncUniswapBridgeData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXN5bmMtdW5pc3dhcC1icmlkZ2UtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jbGllbnQvdW5pc3dhcHYzL2FzeW5jLXVuaXN3YXAtYnJpZGdlLWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0RBT3dCO0FBQ3hCLDhEQUErRjtBQUMvRix3REFBcUQ7QUFFckQsZ0RBQXVEO0FBR3ZELE1BQWEsc0JBQXNCO0lBQ2pDLFlBQTRCLGNBQW9DO1FBQXBDLG1CQUFjLEdBQWQsY0FBYyxDQUFzQjtRQW9DekQsa0JBQWEsR0FBb0I7WUFDdEM7Z0JBQ0UsS0FBSyxFQUFFLENBQUM7Z0JBQ1IsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsWUFBWSxFQUFFLDBCQUFZLENBQUMsTUFBTTtnQkFDakMsV0FBVyxFQUFFLFdBQVc7YUFDekI7WUFFRDtnQkFDRSxLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsRUFBRTtnQkFDVixZQUFZLEVBQUUsMEJBQVksQ0FBQyxNQUFNO2dCQUNqQyxXQUFXLEVBQUUsV0FBVzthQUN6QjtZQUVEO2dCQUNFLEtBQUssRUFBRSxFQUFFO2dCQUNULE1BQU0sRUFBRSxFQUFFO2dCQUNWLFlBQVksRUFBRSwwQkFBWSxDQUFDLEtBQUs7Z0JBQ2hDLFdBQVcsRUFBRSxLQUFLO2FBQ25CO1lBRUQ7Z0JBQ0UsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsWUFBWSxFQUFFLDBCQUFZLENBQUMsS0FBSztnQkFDaEMsV0FBVyxFQUFFLG9DQUFvQzthQUNsRDtTQUNGLENBQUM7SUFoRWlFLENBQUM7SUFFcEUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUEwQixFQUFFLFFBQTBCO1FBQ2xFLE9BQU8sSUFBSSxzQkFBc0IsQ0FDL0IsK0NBQTZCLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFBLDZCQUFrQixFQUFDLFFBQVEsQ0FB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