"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployFeeDistributor = void 0;
const ethers_1 = require("ethers");
const AztecFeeDistributor_json_1 = __importDefault(require("../../artifacts/contracts/AztecFeeDistributor.sol/AztecFeeDistributor.json"));
const gasLimit = 5000000;
async function deployFeeDistributor(signer, rollupProcessor, uniswapRouterAddress) {
    console.error('Deploying FeeDistributor...');
    const feeDistributorLibrary = new ethers_1.ContractFactory(AztecFeeDistributor_json_1.default.abi, AztecFeeDistributor_json_1.default.bytecode, signer);
    const feeClaimer = await signer.getAddress();
    const feeDistributor = await feeDistributorLibrary.deploy(feeClaimer, rollupProcessor.address, uniswapRouterAddress, {
        gasLimit,
    });
    console.error(`FeeDistributor contract address: ${feeDistributor.address}`);
    return feeDistributor;
}
exports.deployFeeDistributor = deployFeeDistributor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X2ZlZV9kaXN0cmlidXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZXBsb3kvZGVwbG95ZXJzL2RlcGxveV9mZWVfZGlzdHJpYnV0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbUNBQTJEO0FBQzNELDBJQUE2RztBQUU3RyxNQUFNLFFBQVEsR0FBRyxPQUFPLENBQUM7QUFFbEIsS0FBSyxVQUFVLG9CQUFvQixDQUFDLE1BQWMsRUFBRSxlQUF5QixFQUFFLG9CQUE0QjtJQUNoSCxPQUFPLENBQUMsS0FBSyxDQUFDLDZCQUE2QixDQUFDLENBQUM7SUFDN0MsTUFBTSxxQkFBcUIsR0FBRyxJQUFJLHdCQUFlLENBQUMsa0NBQW1CLENBQUMsR0FBRyxFQUFFLGtDQUFtQixDQUFDLFFBQVEsRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNqSCxNQUFNLFVBQVUsR0FBRyxNQUFNLE1BQU0sQ0FBQyxVQUFVLEVBQUUsQ0FBQztJQUM3QyxNQUFNLGNBQWMsR0FBRyxNQUFNLHFCQUFxQixDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUUsZUFBZSxDQUFDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRTtRQUNuSCxRQUFRO0tBQ1QsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxDQUFDLEtBQUssQ0FBQyxvQ0FBb0MsY0FBYyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFFNUUsT0FBTyxjQUFjLENBQUM7QUFDeEIsQ0FBQztBQVZELG9EQVVDIn0=