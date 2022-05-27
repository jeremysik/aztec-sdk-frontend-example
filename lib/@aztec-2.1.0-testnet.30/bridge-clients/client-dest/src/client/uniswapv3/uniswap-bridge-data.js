"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncUniswapBridgeData = void 0;
const bridge_data_1 = require("../bridge-data");
const typechain_types_1 = require("../../../typechain-types");
const abi_1 = require("@ethersproject/abi");
const ethers_1 = require("ethers");
const provider_1 = require("../aztec/provider");
class SyncUniswapBridgeData {
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
                start: 24,
                length: 24,
                solidityType: bridge_data_1.SolidityType.uint24,
                description: 'tickUpper',
            },
            {
                start: 48,
                length: 16,
                solidityType: bridge_data_1.SolidityType.uint16,
                description: 'fee',
            },
        ];
    }
    static create(uniSwapAddress, provider) {
        return new SyncUniswapBridgeData(typechain_types_1.SyncUniswapV3Bridge__factory.connect(uniSwapAddress.toString(), (0, provider_1.createWeb3Provider)(provider)));
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
    /*
    @dev This function should be implemented for all bridges that use auxData that require onchain data. It's purpose is to tell the developer using the bridge
    @dev the set of possible auxData's that they can use for a given set of inputOutputAssets.
    */
    async getAuxData(inputAssetA, inputAssetB, outputAssetA, outputAssetB) {
        return [0n];
    }
    async getAuxDataLP(data) {
        let tickLower = ethers_1.BigNumber.from(data[0]);
        let tickUpper = ethers_1.BigNumber.from(data[1]);
        let fee = ethers_1.BigNumber.from(data[2]);
        const auxData = await this.bridgeContract.packData(tickLower, tickUpper, fee);
        return [auxData.toBigInt()];
    }
    enumToInt(inputAsset) {
        if (inputAsset.assetType == bridge_data_1.AztecAssetType.ETH) {
            return BigInt(1);
        }
        else if (inputAsset.assetType == bridge_data_1.AztecAssetType.ERC20) {
            return BigInt(2);
        }
        else if (inputAsset.assetType == bridge_data_1.AztecAssetType.VIRTUAL) {
            return BigInt(3);
        }
        else if (inputAsset.assetType == bridge_data_1.AztecAssetType.NOT_USED) {
            return BigInt(4);
        }
        else if (inputAsset == undefined || inputAsset == null) {
            return BigInt(5);
        }
        return BigInt(1);
    }
    async getExpectedOutput(inputAssetA, inputAssetB, outputAssetA, outputAssetB, auxData, precision) {
        //substitute uint8 for enum due to ethers limitations
        let ABI = [
            'function convert( tuple(uint256 id,address erc20Address,uint8 assetType) inputAssetA, tuple(uint256 id,address erc20Address,uint8 assetType) inputAssetB,tuple(uint256 id,address erc20Address,uint8 assetType) outputAssetA,tuple(uint256 id,address erc20Address,uint8 assetType) outputAssetB,uint256 inputValue,uint256 interactionNonce,uint64 auxData)',
        ];
        let iface = new abi_1.Interface(ABI);
        let inA = this.enumToInt(inputAssetA);
        let inB = this.enumToInt(inputAssetB);
        let outA = this.enumToInt(outputAssetA);
        let outB = this.enumToInt(outputAssetB);
        let calldata = iface.encodeFunctionData('convert', [
            {
                id: ethers_1.BigNumber.from(inputAssetA.id),
                assetType: ethers_1.BigNumber.from(inA),
                erc20Address: inputAssetA.erc20Address,
            },
            {
                id: ethers_1.BigNumber.from(inputAssetB.id),
                assetType: ethers_1.BigNumber.from(inB),
                erc20Address: inputAssetB.erc20Address,
            },
            {
                id: ethers_1.BigNumber.from(outputAssetA.id),
                assetType: ethers_1.BigNumber.from(outA),
                erc20Address: outputAssetA.erc20Address,
            },
            {
                id: ethers_1.BigNumber.from(outputAssetB.id),
                assetType: ethers_1.BigNumber.from(outB),
                erc20Address: outputAssetB.erc20Address,
            },
            ethers_1.BigNumber.from(precision),
            ethers_1.BigNumber.from(1),
            ethers_1.BigNumber.from(auxData),
        ]);
        iface = new abi_1.Interface(['function staticcall(address _to, bytes calldata _data) returns (bytes memory)']);
        const data = await this.bridgeContract.staticcall(this.bridgeContract.address, calldata);
        let abiCoder = abi_1.defaultAbiCoder;
        const convertOutput = await abiCoder.decode(['uint256', 'uint256', 'bool'], data);
        return [convertOutput[0], convertOutput[1]];
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
        let balances = await this.bridgeContract.getLiquidity(inA, inB, ethers_1.BigNumber.from(auxData));
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
}
exports.SyncUniswapBridgeData = SyncUniswapBridgeData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcC1icmlkZ2UtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jbGllbnQvdW5pc3dhcHYzL3VuaXN3YXAtYnJpZGdlLWRhdGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZ0RBT3dCO0FBQ3hCLDhEQUE2RjtBQUM3Riw0Q0FBZ0U7QUFDaEUsbUNBQW1DO0FBRW5DLGdEQUF1RDtBQUd2RCxNQUFhLHFCQUFxQjtJQUNoQyxZQUE0QixjQUFtQztRQUFuQyxtQkFBYyxHQUFkLGNBQWMsQ0FBcUI7UUFtRHhELGtCQUFhLEdBQW9CO1lBQ3RDO2dCQUNFLEtBQUssRUFBRSxDQUFDO2dCQUNSLE1BQU0sRUFBRSxFQUFFO2dCQUNWLFlBQVksRUFBRSwwQkFBWSxDQUFDLE1BQU07Z0JBQ2pDLFdBQVcsRUFBRSxXQUFXO2FBQ3pCO1lBQ0Q7Z0JBQ0UsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsTUFBTSxFQUFFLEVBQUU7Z0JBQ1YsWUFBWSxFQUFFLDBCQUFZLENBQUMsTUFBTTtnQkFDakMsV0FBVyxFQUFFLFdBQVc7YUFDekI7WUFDRDtnQkFDRSxLQUFLLEVBQUUsRUFBRTtnQkFDVCxNQUFNLEVBQUUsRUFBRTtnQkFDVixZQUFZLEVBQUUsMEJBQVksQ0FBQyxNQUFNO2dCQUNqQyxXQUFXLEVBQUUsS0FBSzthQUNuQjtTQUNGLENBQUM7SUF0RWdFLENBQUM7SUFFbkUsTUFBTSxDQUFDLE1BQU0sQ0FBQyxjQUEwQixFQUFFLFFBQTBCO1FBQ2xFLE9BQU8sSUFBSSxxQkFBcUIsQ0FDOUIsOENBQTRCLENBQUMsT0FBTyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsRUFBRSxJQUFBLDZCQUFrQixFQUFDLFFBQVEsQ0FBQyxDQUFDLENBQzlGLENBQUM7SUFDSixDQUFDO0lBRUQsMkdBQTJHO0lBQzNHLHVGQUF1RjtJQUN2RiwrRUFBK0U7SUFFL0UsS0FBSyxDQUFDLDBCQUEwQixDQUFDLGdCQUF3QjtRQUN2RCw4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