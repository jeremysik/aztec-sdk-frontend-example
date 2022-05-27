"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Uniswap = exports.fixEthersStackTrace = exports.addressesAreSame = void 0;
const ISwapRouter_json_1 = __importDefault(require("../abis/ISwapRouter.json"));
const _1 = require(".");
const ethers_1 = require("ethers");
const providers_1 = require("@ethersproject/providers");
const mainnet_addresses_1 = require("./mainnet_addresses");
const address_1 = require("@aztec/barretenberg/address");
const supportedAssets = [
    mainnet_addresses_1.MainnetAddresses.Tokens['DAI'],
    mainnet_addresses_1.MainnetAddresses.Tokens['USDC'],
    mainnet_addresses_1.MainnetAddresses.Tokens['WBTC'],
    mainnet_addresses_1.MainnetAddresses.Tokens['WETH'],
];
const addressesAreSame = (a, b) => a.toLowerCase() === b.toLowerCase();
exports.addressesAreSame = addressesAreSame;
const fixEthersStackTrace = (err) => {
    err.stack += new Error().stack;
    throw err;
};
exports.fixEthersStackTrace = fixEthersStackTrace;
class Uniswap {
    constructor(provider) {
        this.provider = provider;
        this.ethersProvider = new providers_1.Web3Provider(provider);
        this.contract = new ethers_1.Contract(mainnet_addresses_1.MainnetAddresses.Contracts['UNISWAP'], ISwapRouter_json_1.default.abi, this.ethersProvider);
    }
    static isSupportedAsset(assetAddress) {
        return supportedAssets.some(asset => (0, exports.addressesAreSame)(assetAddress.toString(), asset));
    }
    getAddress() {
        return this.contract.address;
    }
    async swapFromEth(spender, recipient, token, amountInMaximum) {
        if (!Uniswap.isSupportedAsset(token.erc20Address)) {
            throw new Error('Asset not supported');
        }
        await (0, _1.depositToWeth)(spender, amountInMaximum, this.provider);
        if ((0, exports.addressesAreSame)(token.erc20Address.toString(), mainnet_addresses_1.MainnetAddresses.Tokens['WETH'])) {
            return BigInt(0);
        }
        const params = {
            tokenIn: mainnet_addresses_1.MainnetAddresses.Tokens['WETH'],
            tokenOut: token.erc20Address.toString(),
            fee: BigInt(3000),
            recipient: recipient.toString(),
            deadline: `0x${BigInt(Date.now() + 36000000).toString(16)}`,
            amountOut: token.amount,
            amountInMaximum,
            sqrtPriceLimitX96: BigInt(0),
        };
        await (0, _1.approveWeth)(spender, address_1.EthAddress.fromString(this.contract.address), params.amountInMaximum, this.provider);
        const amountBefore = await (0, _1.getTokenBalance)(token.erc20Address, recipient, this.provider);
        const swapTx = await this.contract
            .connect(this.ethersProvider.getSigner(spender.toString()))
            .exactOutputSingle(params)
            .catch(exports.fixEthersStackTrace);
        await swapTx.wait();
        const amountAfter = await (0, _1.getTokenBalance)(token.erc20Address, recipient, this.provider);
        const amountReceived = BigInt(amountAfter) - BigInt(amountBefore);
        return amountReceived;
    }
}
exports.Uniswap = Uniswap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidW5pc3dhcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90b2tlbnMvdW5pc3dhcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxnRkFBbUQ7QUFDbkQsd0JBQWdFO0FBRWhFLG1DQUFrQztBQUNsQyx3REFBd0Q7QUFDeEQsMkRBQXVEO0FBRXZELHlEQUF5RDtBQUV6RCxNQUFNLGVBQWUsR0FBRztJQUN0QixvQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDO0lBQzlCLG9DQUFnQixDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDL0Isb0NBQWdCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUMvQixvQ0FBZ0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDO0NBQ2hDLENBQUM7QUFFSyxNQUFNLGdCQUFnQixHQUFHLENBQUMsQ0FBUyxFQUFFLENBQVMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxLQUFLLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUFqRixRQUFBLGdCQUFnQixvQkFBaUU7QUFFdkYsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEdBQVUsRUFBRSxFQUFFO0lBQ2hELEdBQUcsQ0FBQyxLQUFNLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDaEMsTUFBTSxHQUFHLENBQUM7QUFDWixDQUFDLENBQUM7QUFIVyxRQUFBLG1CQUFtQix1QkFHOUI7QUFDRixNQUFhLE9BQU87SUFJbEIsWUFBb0IsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFDNUMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLHdCQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLGlCQUFRLENBQUMsb0NBQWdCLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxFQUFFLDBCQUFXLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxj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