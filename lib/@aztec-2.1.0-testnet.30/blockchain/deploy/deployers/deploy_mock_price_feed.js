"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployMockPriceFeed = void 0;
const ethers_1 = require("ethers");
const MockPriceFeed_json_1 = __importDefault(require("../../artifacts/contracts/test/MockPriceFeed.sol/MockPriceFeed.json"));
async function deployMockPriceFeed(signer, initialPrice = 10n ** 18n) {
    console.error('Deploying MockPriceFeed...');
    const priceFeedLibrary = new ethers_1.ContractFactory(MockPriceFeed_json_1.default.abi, MockPriceFeed_json_1.default.bytecode, signer);
    const priceFeed = await priceFeedLibrary.deploy(initialPrice);
    console.error(`MockPriceFeed contract address: ${priceFeed.address}. Initial price: ${initialPrice}.`);
    return priceFeed;
}
exports.deployMockPriceFeed = deployMockPriceFeed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X21vY2tfcHJpY2VfZmVlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZXBsb3kvZGVwbG95ZXJzL2RlcGxveV9tb2NrX3ByaWNlX2ZlZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsbUNBQWlEO0FBQ2pELDZIQUFnRztBQUV6RixLQUFLLFVBQVUsbUJBQW1CLENBQUMsTUFBYyxFQUFFLFlBQVksR0FBRyxHQUFHLElBQUksR0FBRztJQUNqRixPQUFPLENBQUMsS0FBSyxDQUFDLDRCQUE0QixDQUFDLENBQUM7SUFDNUMsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLHdCQUFlLENBQUMsNEJBQWEsQ0FBQyxHQUFHLEVBQUUsNEJBQWEsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDaEcsTUFBTSxTQUFTLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsWUFBWSxDQUFDLENBQUM7SUFDOUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxtQ0FBbUMsU0FBUyxDQUFDLE9BQU8sb0JBQW9CLFlBQVksR0FBRyxDQUFDLENBQUM7SUFFdkcsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQVBELGtEQU9DIn0=