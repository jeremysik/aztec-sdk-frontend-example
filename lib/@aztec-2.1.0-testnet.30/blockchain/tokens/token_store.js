"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenStore = void 0;
const ethers_1 = require("ethers");
const ICurveProvider_json_1 = __importDefault(require("../abis/ICurveProvider.json"));
const ICurveFactory_json_1 = __importDefault(require("../abis/ICurveFactory.json"));
const ICurveRegistry_json_1 = __importDefault(require("../abis//ICurveRegistry.json"));
const ICurveZap_json_1 = __importDefault(require("../abis//ICurveZap.json"));
const ICurveStablePool_json_1 = __importDefault(require("../abis/ICurveStablePool.json"));
const uniswap_1 = require("./uniswap");
const _1 = require(".");
const mainnet_addresses_1 = require("./mainnet_addresses");
const providers_1 = require("@ethersproject/providers");
const address_1 = require("@aztec/barretenberg/address");
class TokenStore {
    constructor(provider) {
        this.provider = provider;
        this.ethersProvider = new providers_1.Web3Provider(provider);
    }
    async init() {
        this.providerContract = new ethers_1.Contract(mainnet_addresses_1.MainnetAddresses.Contracts['CURVE_PROVIDER'], ICurveProvider_json_1.default.abi, this.ethersProvider);
        const registryAddress = await this.providerContract.get_registry();
        this.registryContract = new ethers_1.Contract(registryAddress, ICurveRegistry_json_1.default.abi, this.ethersProvider);
        this.factoryContract = new ethers_1.Contract(mainnet_addresses_1.MainnetAddresses.Contracts['CURVE_FACTORY'], ICurveFactory_json_1.default.abi, this.ethersProvider);
    }
    static async create(provider) {
        const store = new TokenStore(provider);
        await store.init();
        return store;
    }
    async logAllStablePools() {
        const poolCount = (await this.registryContract.pool_count()).toNumber();
        const mappings = new Map();
        for (let i = 0; i < poolCount; i++) {
            const poolAddress = (await this.registryContract.pool_list(i)).toString();
            const tokenAddress = await this.registryContract.get_lp_token(poolAddress);
            mappings.set(poolAddress, tokenAddress);
        }
        console.log('Token mappings ', mappings);
    }
    async logAllMetaPools() {
        const poolCount = (await this.factoryContract.pool_count()).toNumber();
        const tokens = [];
        for (let i = 0; i < poolCount; i++) {
            const poolAddress = (await this.factoryContract.pool_list(i)).toString();
            tokens.push(poolAddress);
        }
        console.log('Tokens ', tokens);
    }
    async depositToStablePool(spender, recipient, token, amountInMaximum) {
        let amountToDeposit = token.amount;
        const poolAddress = (await this.registryContract.get_pool_from_lp_token(token.erc20Address.toString())).toString();
        const numCoinsResult = await this.registryContract.get_n_coins(poolAddress);
        const numCoins = numCoinsResult[1].toNumber();
        const coins = (await this.registryContract.get_coins(poolAddress)).map((x) => address_1.EthAddress.fromString(x));
        const inputAssetIndex = this.findPreferredAssset(coins);
        if (inputAssetIndex === -1) {
            throw new Error('Asset not supported');
        }
        const inputAsset = coins[inputAssetIndex];
        const signer = this.ethersProvider.getSigner(spender.toString());
        if (!(0, uniswap_1.addressesAreSame)(inputAsset.toString(), mainnet_addresses_1.MainnetAddresses.Tokens['ETH'])) {
            // need to uniswap to the preferred input asset
            const uniswap = new uniswap_1.Uniswap(this.provider);
            amountToDeposit = await uniswap.swapFromEth(spender, spender, { erc20Address: inputAsset, amount: token.amount }, amountInMaximum);
        }
        await (0, _1.approveToken)(inputAsset, spender, poolAddress, this.provider, amountToDeposit);
        const amounts = new Array(numCoins).fill(BigInt(0));
        amounts[inputAssetIndex] = amountToDeposit;
        const poolContract = new ethers_1.Contract(poolAddress, ICurveStablePool_json_1.default.abi, signer);
        const depositFunc = poolContract.functions[`add_liquidity(uint256[${numCoins}],uint256)`];
        const amountBefore = await (0, _1.getTokenBalance)(token.erc20Address, spender, this.provider);
        const depositResponse = await depositFunc(amounts, BigInt(0), {
            value: (0, uniswap_1.addressesAreSame)(inputAsset.toString(), mainnet_addresses_1.MainnetAddresses.Tokens['ETH']) ? amountToDeposit : BigInt(0),
        }).catch(uniswap_1.fixEthersStackTrace);
        await depositResponse.wait();
        const amountAfter = await (0, _1.getTokenBalance)(token.erc20Address, spender, this.provider);
        const amountMinted = BigInt(amountAfter) - BigInt(amountBefore);
        await (0, _1.transferToken)(token.erc20Address, spender, recipient, this.provider, amountMinted);
        return amountMinted;
    }
    findPreferredAssset(availableAssets) {
        const ethIndex = availableAssets.findIndex(asset => (0, uniswap_1.addressesAreSame)(asset.toString(), mainnet_addresses_1.MainnetAddresses.Tokens['ETH']));
        if (ethIndex !== -1) {
            return ethIndex;
        }
        const wethIndex = availableAssets.findIndex(asset => (0, uniswap_1.addressesAreSame)(asset.toString(), mainnet_addresses_1.MainnetAddresses.Tokens['WETH']));
        if (wethIndex !== -1) {
            return wethIndex;
        }
        const stableIndex = availableAssets.findIndex(asset => uniswap_1.Uniswap.isSupportedAsset(asset));
        return stableIndex;
    }
    async depositToMetaPool(spender, recipient, token, amountInMaximum) {
        let amountToDeposit = token.amount;
        const numCoinsResult = await this.factoryContract.get_n_coins(token.erc20Address.toString());
        const numCoins = numCoinsResult[1].toNumber();
        const coins = (await this.factoryContract.get_underlying_coins(token.erc20Address.toString())).map((x) => address_1.EthAddress.fromString(x));
        const inputAssetIndex = this.findPreferredAssset(coins);
        if (inputAssetIndex === -1) {
            throw new Error('Asset not supported');
        }
        const inputAsset = coins[inputAssetIndex];
        if (!(0, uniswap_1.addressesAreSame)(inputAsset.toString(), mainnet_addresses_1.MainnetAddresses.Tokens['ETH'])) {
            // need to uniswap to the preferred input asset
            const uniswap = new uniswap_1.Uniswap(this.provider);
            amountToDeposit = await uniswap.swapFromEth(spender, spender, { erc20Address: inputAsset, amount: token.amount }, amountInMaximum);
        }
        await (0, _1.approveToken)(inputAsset, spender, address_1.EthAddress.fromString(mainnet_addresses_1.MainnetAddresses.Contracts['CURVE_ZAP']), this.provider, amountToDeposit);
        const amounts = new Array(numCoins).fill(BigInt(0));
        amounts[inputAssetIndex] = amountToDeposit;
        const signer = this.ethersProvider.getSigner(spender.toString());
        const zapDepositor = new ethers_1.Contract(mainnet_addresses_1.MainnetAddresses.Contracts['CURVE_ZAP'], ICurveZap_json_1.default.abi, signer);
        const depositFunc = zapDepositor.functions[`add_liquidity(address,uint256[${numCoins}],uint256,address)`];
        const amountBefore = await (0, _1.getTokenBalance)(token.erc20Address, recipient, this.provider);
        const depositResponse = await depositFunc(token.erc20Address.toString(), amounts, BigInt(0), recipient.toString(), {
            value: (0, uniswap_1.addressesAreSame)(inputAsset.toString(), mainnet_addresses_1.MainnetAddresses.Tokens['ETH']) ? amountToDeposit : BigInt(0),
        }).catch(uniswap_1.fixEthersStackTrace);
        await depositResponse.wait();
        const amountAfter = await (0, _1.getTokenBalance)(token.erc20Address, recipient, this.provider);
        const amountMinted = BigInt(amountAfter) - BigInt(amountBefore);
        return amountMinted;
    }
    async getPoolForLpToken(lpTokenAddress) {
        const poolAddress = (await this.registryContract.get_pool_from_lp_token(lpTokenAddress.toString())).toString();
        return poolAddress;
    }
    async isMetaPool(lpTokenAddress) {
        const poolAddress = await this.getPoolForLpToken(lpTokenAddress);
        // for meta pools, the pool is the lp token. for stable pools, it's not
        return (0, uniswap_1.addressesAreSame)(poolAddress, lpTokenAddress.toString());
    }
    /**
     * Will attempt to purchase or mint tokens from uniswap or curve
     * The desired token is specified by the erc20 address and quantity
     * We will attempt to achieve this quantity by
     * 1. Attempting to purchase from uniswap if it is one of our supported uniswap assets or
     * 2. Attempting to deposit to a curve pool and minting the requested tokens, this may first require us to purchase a stablecoin from uniswap
     *
     * In the case of 1 above, we ask uniswap for outputToken.amount of the requested asset and specify amountInMaximum as the maximum amount to spend
     *
     * In the case of 2 above. If we have to purchase a stable coin then we ask uniswap for outputToken.amount of the stable coin and specify amountInMaximum as the maximum amount to spend
     * Once we have the stablecoin, we deposit it all into curve to extract the lp tokens. If we don't need to purchase a stable coin, then we deposit outputToken.amount of ETH/WETH
     * to curve and mint the resulting tokens.
     */
    async purchase(spender, recipient, outputToken, amountInMaximum) {
        const uniswap = new uniswap_1.Uniswap(this.provider);
        if (uniswap_1.Uniswap.isSupportedAsset(outputToken.erc20Address)) {
            return await uniswap.swapFromEth(spender, recipient, outputToken, amountInMaximum);
        }
        const isMetaPool = await this.isMetaPool(outputToken.erc20Address);
        if (isMetaPool) {
            return await this.depositToMetaPool(spender, recipient, outputToken, amountInMaximum);
        }
        else {
            return await this.depositToStablePool(spender, recipient, outputToken, amountInMaximum);
        }
    }
}
exports.TokenStore = TokenStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW5fc3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdG9rZW5zL3Rva2VuX3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1DQUFrQztBQUNsQyxzRkFBc0Q7QUFDdEQsb0ZBQW9EO0FBQ3BELHVGQUF1RDtBQUN2RCw2RUFBMEM7QUFDMUMsMEZBQTREO0FBQzVELHVDQUEyRTtBQUMzRSx3QkFBaUU7QUFDakUsMkRBQXVEO0FBRXZELHdEQUF3RDtBQUN4RCx5REFBeUQ7QUFFekQsTUFBYSxVQUFVO0lBTXJCLFlBQTRCLFFBQTBCO1FBQTFCLGFBQVEsR0FBUixRQUFRLENBQWtCO1FBQ3BELElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSx3QkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ25ELENBQUM7SUFFTyxLQUFLLENBQUMsSUFBSTtRQUNoQixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxpQkFBUSxDQUNsQyxvQ0FBZ0IsQ0FBQyxTQUFTLENBQUMsZ0JBQWdCLENBQUMsRUFDNUMsNkJBQVcsQ0FBQyxHQUFHLEVBQ2YsSUFBSSxDQUFDLGNBQWMsQ0FDcEIsQ0FBQztRQUNGLE1BQU0sZUFBZSxHQUFHLE1BQU0sSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ25FLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxJQUFJLGlCQUFRLENBQUMsZUFBZSxFQUFFLDZCQUFXLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztRQUM1RixJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksaUJBQVEsQ0FDakMsb0NBQWdCLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQyxFQUMzQyw0QkFBVSxDQUFDLEdBQUcsRUFDZCxJQUFJLENBQUMsY0FBYyxDQUNwQixDQUFDO0lBQ0osQ0FBQztJQUVELE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFFBQTBCO1FBQzVDLE1BQU0sS0FBSyxHQUFHLElBQUksVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ25CLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQztJQUVPLEtBQUssQ0FBQyxpQkFBaUI7UUFDN0IsTUFBTSxTQUFTLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxnQkFBaUIsQ0FBQyxVQUFVLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3pFLE1BQU0sUUFBUSxHQUFHLElBQUksR0FBRyxFQUFrQixDQUFDO1FBQzNDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLEVBQUUsQ0FBQyxFQUFFLEVBQUU7WUFDbEMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxnQkFBaUIsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUMzRSxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBaUIsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxXQUFXLEVBQUUsWUFBWSxDQUFDLENBQUM7U0FDekM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFTyxLQUFLLENBQUMsZUFBZTtRQUMzQixNQUFNLFNBQVMsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLGVBQWdCLENBQUMsVUFBVSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN4RSxNQUFNLE1BQU0sR0FBRyxFQUFFLENBQUM7UUFDbEIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUNsQyxNQUFNLFdBQVcsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLGVBQWdCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDMUUsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUMxQjtRQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsU0FBUyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2pDLENBQUM7SUFFTyxLQUFLLENBQUMsbUJBQW1CLENBQy9CLE9BQW1CLEVBQ25CLFNBQXFCLEVBQ3JCLEtBQW1ELEVBQ25ELGVBQXVCO1FBRXZCLElBQUksZUFBZSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUM7UUFDbkMsTUFBTSxXQUFXLEdBQUcsQ0FBQyxNQUFNLElBQUksQ0FBQyxnQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwSCxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBaUIsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDN0UsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQzlDLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsZ0JBQWlCLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBUyxFQUFFLEVBQUUsQ0FBQyxvQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ2pILE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RCxJQUFJLGVBQWUsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDeEM7UUFDRCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLElBQUEsMEJBQWdCLEVBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLG9DQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzVFLCtDQUErQztZQUMvQyxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLGVBQWUsR0FBRyxNQUFNLE9BQU8sQ0FBQyxXQUFXLENBQ3pDLE9BQU8sRUFDUCxPQUFPLEVBQ1AsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQ2xELGVBQWUsQ0FDaEIsQ0FBQztTQUNIO1FBQ0QsTUFBTSxJQUFBLGVBQVksRUFBQyxVQUFVLEVBQUUsT0FBTyxFQUFFLFdBQVcsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBQ3JGLE1BQU0sT0FBTyxHQUFHLElBQUksS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwRCxPQUFPLENBQUMsZUFBZSxDQUFDLEdBQUcsZUFBZSxDQUFDO1FBQzNDLE1BQU0sWUFBWSxHQUFHLElBQUksaUJBQVEsQ0FBQyxXQUFXLEVBQUUsK0JBQWUsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDNUUsTUFBTSxXQUFXLEdBQUcsWUFBWSxDQUFDLFNBQVMsQ0FBQyx5QkFBeUIsUUFBUSxZQUFZLENBQUMsQ0FBQztRQUMxRixNQUFNLFlBQVksR0FBRyxNQUFNLElBQUEsa0JBQWUsRUFBQyxLQUFLLENBQUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDdkYsTUFBTSxlQUFlLEdBQUcsTUFBTSxXQUFXLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM1RCxLQUFLLEVBQUUsSUFBQSwwQkFBZ0IsRUFBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsb0NBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUM3RyxDQUFDLENBQUMsS0FBSyxDQUFDLDZCQUFtQixDQUFDLENBQUM7UUFDOUIsTUFBTSxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLGtCQUFlLEVBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3RGLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEUsTUFBTSxJQUFBLGdCQUFhLEVBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxPQUFPLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekYsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVPLG1CQUFtQixDQUFDLGVBQTZCO1FBQ3ZELE1BQU0sUUFBUSxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FDakQsSUFBQSwwQkFBZ0IsRUFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsb0NBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQ25FLENBQUM7UUFDRixJQUFJLFFBQVEsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNuQixPQUFPLFFBQVEsQ0FBQztTQUNqQjtRQUNELE1BQU0sU0FBUyxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FDbEQsSUFBQSwwQkFBZ0IsRUFBQyxLQUFLLENBQUMsUUFBUSxFQUFFLEVBQUUsb0NBQWdCLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQ3BFLENBQUM7UUFDRixJQUFJLFNBQVMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUNwQixPQUFPLFNBQVMsQ0FBQztTQUNsQjtRQUNELE1BQU0sV0FBVyxHQUFHLGVBQWUsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxpQkFBTyxDQUFDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFDeEYsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVPLEtBQUssQ0FBQyxpQkFBaUIsQ0FDN0IsT0FBbUIsRUFDbkIsU0FBcUIsRUFDckIsS0FBbUQsRUFDbkQsZUFBdUI7UUFFdkIsSUFBSSxlQUFlLEdBQUcsS0FBSyxDQUFDLE1BQU0sQ0FBQztRQUNuQyxNQUFNLGNBQWMsR0FBRyxNQUFNLElBQUksQ0FBQyxlQUFnQixDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDOUYsTUFBTSxRQUFRLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBRTlDLE1BQU0sS0FBSyxHQUFHLENBQUMsTUFBTSxJQUFJLENBQUMsZUFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUNoSCxvQkFBVSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FDekIsQ0FBQztRQUNGLE1BQU0sZUFBZSxHQUFHLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4RCxJQUFJLGVBQWUsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLHFCQUFxQixDQUFDLENBQUM7U0FDeEM7UUFDRCxNQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDMUMsSUFBSSxDQUFDLElBQUEsMEJBQWdCLEVBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxFQUFFLG9DQUFnQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzVFLCtDQUErQztZQUMvQyxNQUFNLE9BQU8sR0FBRyxJQUFJLGlCQUFPLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQzNDLGVBQWUsR0FBRyxNQUFNLE9BQU8sQ0FBQyxXQUFXLENBQ3pDLE9BQU8sRUFDUCxPQUFPLEVBQ1AsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxLQUFLLENBQUMsTUFBTSxFQUFFLEVBQ2xELGVBQWUsQ0FDaEIsQ0FBQztTQUNIO1FBQ0QsTUFBTSxJQUFBLGVBQVksRUFDaEIsVUFBVSxFQUNWLE9BQU8sRUFDUCxvQkFBVSxDQUFDLFVBQVUsQ0FBQyxvQ0FBZ0IsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUMsRUFDOUQsSUFBSSxDQUFDLFFBQVEsRUFDYixlQUFlLENBQ2hCLENBQUM7UUFDRixNQUFNLE9BQU8sR0FBRyxJQUFJLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEQsT0FBTyxDQUFDLGVBQWUsQ0FBQyxHQUFHLGVBQWUsQ0FBQztRQUMzQyxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUNqRSxNQUFNLFlBQVksR0FBRyxJQUFJLGlCQUFRLENBQUMsb0NBQWdCLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxFQUFFLHdCQUFHLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVGLE1BQU0sV0FBVyxHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUMsaUNBQWlDLFFBQVEsb0JBQW9CLENBQUMsQ0FBQztRQUMxRyxNQUFNLFlBQVksR0FBRyxNQUFNLElBQUEsa0JBQWUsRUFBQyxLQUFLLENBQUMsWUFBWSxFQUFFLFNBQVMsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDekYsTUFBTSxlQUFlLEdBQUcsTUFBTSxXQUFXLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLFNBQVMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtZQUNqSCxLQUFLLEVBQUUsSUFBQSwwQkFBZ0IsRUFBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsb0NBQWdCLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztTQUM3RyxDQUFDLENBQUMsS0FBSyxDQUFDLDZCQUFtQixDQUFDLENBQUM7UUFDOUIsTUFBTSxlQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0IsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFBLGtCQUFlLEVBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3hGLE1BQU0sWUFBWSxHQUFHLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDaEUsT0FBTyxZQUFZLENBQUM7SUFDdEIsQ0FBQztJQUVPLEtBQUssQ0FBQyxpQkFBaUIsQ0FBQyxjQUEwQjtRQUN4RCxNQUFNLFdBQVcsR0FBRyxDQUFDLE1BQU0sSUFBSSxDQUFDLGdCQUFpQixDQUFDLHNCQUFzQixDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEgsT0FBTyxXQUFXLENBQUM7SUFDckIsQ0FBQztJQUVPLEtBQUssQ0FBQyxVQUFVLENBQUMsY0FBMEI7UUFDakQsTUFBTSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDakUsdUVBQXVFO1FBQ3ZFLE9BQU8sSUFBQSwwQkFBZ0IsRUFBQyxXQUFXLEVBQUUsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFDbEUsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILEtBQUssQ0FBQyxRQUFRLENBQ1osT0FBbUIsRUFDbkIsU0FBcUIsRUFDckIsV0FBeUQsRUFDekQsZUFBdUI7UUFFdkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxpQkFBTyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzQyxJQUFJLGlCQUFPLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3RELE9BQU8sTUFBTSxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLGVBQWUsQ0FBQyxDQUFDO1NBQ3BGO1FBQ0QsTUFBTSxVQUFVLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuRSxJQUFJLFVBQVUsRUFBRTtZQUNkLE9BQU8sTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDdkY7YUFBTTtZQUNMLE9BQU8sTUFBTSxJQUFJLENBQUMsbUJBQW1CLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsZUFBZSxDQUFDLENBQUM7U0FDekY7SUFDSCxDQUFDO0NBQ0Y7QUEzTUQsZ0NBMk1DIn0=