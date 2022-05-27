"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployUniswapBridge = exports.deployUniswap = exports.deployUniswapPair = void 0;
const UniswapV2Factory_json_1 = __importDefault(require("@uniswap/v2-core/build/UniswapV2Factory.json"));
const UniswapV2Pair_json_1 = __importDefault(require("@uniswap/v2-core/build/UniswapV2Pair.json"));
const IWETH_json_1 = __importDefault(require("@uniswap/v2-periphery/build/IWETH.json"));
const UniswapV2Router02_json_1 = __importDefault(require("@uniswap/v2-periphery/build/UniswapV2Router02.json"));
const UniswapBridge_json_1 = __importDefault(require("../../artifacts/contracts/bridges/UniswapBridge.sol/UniswapBridge.json"));
const address_1 = require("@aztec/barretenberg/address");
const ethers_1 = require("ethers");
const WETH9_json_1 = __importDefault(require("../../abis/WETH9.json"));
const gasLimit = 5000000;
const deployUniswapPair = async (owner, router, asset, initialTokenSupply = 1000n * 10n ** 18n, initialEthSupply = 10n ** 18n) => {
    const factory = new ethers_1.Contract(await router.factory(), UniswapV2Factory_json_1.default.abi, owner);
    const weth = new ethers_1.Contract(await router.WETH(), IWETH_json_1.default.abi, owner);
    if (!address_1.EthAddress.fromString(await factory.getPair(asset.address, weth.address)).equals(address_1.EthAddress.ZERO)) {
        console.error(`UniswapPair [${await asset.name()} - WETH] already created.`);
        return;
    }
    console.error(`Creating UniswapPair: ${await asset.name()} / WETH...`);
    {
        const tx = await factory.createPair(asset.address, weth.address, { gasLimit });
        // Deployment sync point. We need the pair to exist to call getPair().
        await tx.wait();
    }
    const pairAddress = await factory.getPair(asset.address, weth.address);
    const pair = new ethers_1.Contract(pairAddress, UniswapV2Pair_json_1.default.abi, owner);
    console.error(`UniswapPair contract address: ${pairAddress}`);
    await asset.mint(pair.address, initialTokenSupply, { gasLimit });
    await weth.deposit({ value: initialEthSupply, gasLimit });
    await weth.transfer(pair.address, initialEthSupply, { gasLimit });
    await pair.mint(await owner.getAddress(), { gasLimit });
    console.error(`Initial token supply: ${initialTokenSupply}`);
    console.error(`Initial ETH supply: ${initialEthSupply}`);
};
exports.deployUniswapPair = deployUniswapPair;
const deployUniswap = async (owner) => {
    console.error('Deploying UniswapFactory...');
    const UniswapFactory = new ethers_1.ContractFactory(UniswapV2Factory_json_1.default.abi, UniswapV2Factory_json_1.default.bytecode, owner);
    const factory = await UniswapFactory.deploy(await owner.getAddress());
    console.error(`UniswapFactory contract address: ${factory.address}`);
    console.error('Deploying WETH...');
    const WETHFactory = new ethers_1.ContractFactory(WETH9_json_1.default.abi, WETH9_json_1.default.bytecode, owner);
    const weth = await WETHFactory.deploy();
    console.error(`WETH contract address: ${weth.address}`);
    console.error('Deploying UniswapV2Router...');
    const UniswapV2Router = new ethers_1.ContractFactory(UniswapV2Router02_json_1.default.abi, UniswapV2Router02_json_1.default.bytecode, owner);
    const router = await UniswapV2Router.deploy(factory.address, weth.address);
    console.error(`UniswapV2Router contract address: ${router.address}`);
    return router;
};
exports.deployUniswap = deployUniswap;
const deployUniswapBridge = async (signer, rollupProcessor, uniswapRouter) => {
    console.error('Deploying UniswapBridge...');
    const defiBridgeLibrary = new ethers_1.ContractFactory(UniswapBridge_json_1.default.abi, UniswapBridge_json_1.default.bytecode, signer);
    const defiBridge = await defiBridgeLibrary.deploy(rollupProcessor.address, uniswapRouter.address);
    console.error(`UniswapBridge contract address: ${defiBridge.address}`);
    await rollupProcessor.setSupportedBridge(defiBridge.address, 300000n, { gasLimit });
    return defiBridge;
};
exports.deployUniswapBridge = deployUniswapBridge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X3VuaXN3YXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGVwbG95L2RlcGxveWVycy9kZXBsb3lfdW5pc3dhcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSx5R0FBZ0Y7QUFDaEYsbUdBQTBFO0FBQzFFLHdGQUEyRDtBQUMzRCxnSEFBdUY7QUFDdkYsZ0lBQW1HO0FBQ25HLHlEQUF5RDtBQUN6RCxtQ0FBMkQ7QUFDM0QsdUVBQTBDO0FBRTFDLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQztBQUVsQixNQUFNLGlCQUFpQixHQUFHLEtBQUssRUFDcEMsS0FBYSxFQUNiLE1BQWdCLEVBQ2hCLEtBQWUsRUFDZixrQkFBa0IsR0FBRyxLQUFLLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFDdkMsZ0JBQWdCLEdBQUcsR0FBRyxJQUFJLEdBQUcsRUFDN0IsRUFBRTtJQUNGLE1BQU0sT0FBTyxHQUFHLElBQUksaUJBQVEsQ0FBQyxNQUFNLE1BQU0sQ0FBQyxPQUFPLEVBQUUsRUFBRSwrQkFBb0IsQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdEYsTUFBTSxJQUFJLEdBQUcsSUFBSSxpQkFBUSxDQUFDLE1BQU0sTUFBTSxDQUFDLElBQUksRUFBRSxFQUFFLG9CQUFLLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRWpFLElBQUksQ0FBQyxvQkFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsb0JBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtRQUN0RyxPQUFPLENBQUMsS0FBSyxDQUFDLGdCQUFnQixNQUFNLEtBQUssQ0FBQyxJQUFJLEVBQUUsMkJBQTJCLENBQUMsQ0FBQztRQUM3RSxPQUFPO0tBQ1I7SUFFRCxPQUFPLENBQUMsS0FBSyxDQUFDLHlC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