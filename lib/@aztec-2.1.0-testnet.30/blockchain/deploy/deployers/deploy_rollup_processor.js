"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployRollupProcessor = void 0;
const ethers_1 = require("ethers");
const RollupProcessor_json_1 = __importDefault(require("../../artifacts/contracts/RollupProcessor.sol/RollupProcessor.json"));
const gasLimit = 5000000;
async function deployRollupProcessor(signer, verifier, defiProxy, escapeHatchBlockLower, escapeHatchBlockUpper, initDataRoot, initNullRoot, initRootsRoot, initDataSize, allowThirdPartyContracts) {
    console.error('Deploying RollupProcessor...');
    const rollupFactory = new ethers_1.ContractFactory(RollupProcessor_json_1.default.abi, RollupProcessor_json_1.default.bytecode, signer);
    const rollup = await rollupFactory.deploy();
    const address = await signer.getAddress();
    await rollup.initialize(verifier.address, escapeHatchBlockLower, escapeHatchBlockUpper, defiProxy.address, address, initDataRoot, initNullRoot, initRootsRoot, initDataSize, allowThirdPartyContracts, { gasLimit });
    await rollup.setRollupProvider(address, true, { gasLimit });
    console.error(`RollupProcessor contract address: ${rollup.address}`);
    return rollup;
}
exports.deployRollupProcessor = deployRollupProcessor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X3JvbGx1cF9wcm9jZXNzb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZGVwbG95L2RlcGxveWVycy9kZXBsb3lfcm9sbHVwX3Byb2Nlc3Nvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSxtQ0FBMkQ7QUFDM0QsOEhBQWlHO0FBRWpHLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQztBQUVsQixLQUFLLFVBQVUscUJBQXFCLENBQ3pDLE1BQWMsRUFDZCxRQUFrQixFQUNsQixTQUFtQixFQUNuQixxQkFBNkIsRUFDN0IscUJBQTZCLEVBQzdCLFlBQW9CLEVBQ3BCLFlBQW9CLEVBQ3BCLGFBQXFCLEVBQ3JCLFlBQW9CLEVBQ3BCLHdCQUFpQztJQUVqQyxPQUFPLENBQUMsS0FBSyxDQUFDLDhCQUE4QixDQUFDLENBQUM7SUFDOUMsTUFBTSxhQUFhLEdBQUcsSUFBSSx3QkFBZSxDQUFDLDhCQUFlLENBQUMsR0FBRyxFQUFFLDhCQUFlLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQ2pHLE1BQU0sTUFBTSxHQUFHLE1BQU0sYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzVDLE1BQU0sT0FBTyxHQUFHLE1BQU0sTUFBTSxDQUFDLFVBQVUsRUFBRSxDQUFDO0lBRTFDLE1BQU0sTUFBTSxDQUFDLFVBQVUsQ0FDckIsUUFBUSxDQUFDLE9BQU8sRUFDaEIscUJBQXFCLEVBQ3JCLHFCQUFxQixFQUNyQixTQUFTLENBQUMsT0FBTyxFQUNqQixPQUFPLEVBQ1AsWUFBWSxFQUNaLFlBQVksRUFDWixhQUFhLEVBQ2IsWUFBWSxFQUNaLHdCQUF3QixFQUN4QixFQUFFLFFBQVEsRUFBRSxDQUNiLENBQUM7SUFFRixNQUFNLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztJQUU1RCxPQUFPLENBQUMsS0FBSyxDQUFDLHFDQUFxQyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUVyRSxPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDO0FBcENELHNEQW9DQyJ9