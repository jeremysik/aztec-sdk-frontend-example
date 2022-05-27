#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployDummyBridge = void 0;
const ethers_1 = require("ethers");
const DummyDefiBridge_json_1 = __importDefault(require("../../artifacts/contracts/test/DummyDefiBridge.sol/DummyDefiBridge.json"));
const gasLimit = 5000000;
const dummyDefiBridgeLibrary = new ethers_1.ContractFactory(DummyDefiBridge_json_1.default.abi, DummyDefiBridge_json_1.default.bytecode);
async function deployDummyBridge(rollupProcessor, signer, assets) {
    console.error('Deploying DummyDefiBridge...');
    const outputValueEth = 10n ** 15n; // 0.001
    const outputValueToken = 10n ** 20n; // 100
    const outputVirtualValueA = BigInt('0x123456789abcdef0123456789abcdef0123456789abcdef');
    const outputVirtualValueB = 10n;
    const dummyDefiBridge = await dummyDefiBridgeLibrary
        .connect(signer)
        .deploy(rollupProcessor.address, outputValueEth, outputValueToken, outputVirtualValueA, outputVirtualValueB);
    console.error(`DummyDefiBridge contract address: ${dummyDefiBridge.address}`);
    const topupTokenValue = outputValueToken * 100n;
    for (const asset of assets) {
        await asset.mint(dummyDefiBridge.address, topupTokenValue, { gasLimit });
    }
    await rollupProcessor.setSupportedBridge(dummyDefiBridge.address, 300000n, { gasLimit });
    return dummyDefiBridge;
}
exports.deployDummyBridge = deployDummyBridge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X2R1bW15X2JyaWRnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9kZXBsb3kvZGVwbG95ZXJzL2RlcGxveV9kdW1teV9icmlkZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUNBLG1DQUEyRDtBQUMzRCxtSUFBcUc7QUFFckcsTUFBTSxRQUFRLEdBQUcsT0FBTyxDQUFDO0FBQ3pCLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSx3QkFBZSxDQUFDLDhCQUFjLENBQUMsR0FBRyxFQUFFLDhCQUFjLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFekYsS0FBSyxVQUFVLGlCQUFpQixDQUFDLGVBQXlCLEVBQUUsTUFBYyxFQUFFLE1BQWtCO0lBQ25HLE9BQU8sQ0FBQyxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztJQUM5QyxNQUFNLGNBQWMsR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLENBQUMsUUFBUTtJQUMzQyxNQUFNLGdCQUFnQixHQUFHLEdBQUcsSUFBSSxHQUFHLENBQUMsQ0FBQyxNQUFNO0lBQzNDLE1BQU0sbUJBQW1CLEdBQUcsTUFBTSxDQUFDLG1EQUFtRCxDQUFDLENBQUM7SUFDeEYsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUM7SUFDaEMsTUFBTSxlQUFlLEdBQUcsTUFBTSxzQkFBc0I7U0FDakQsT0FBTyxDQUFDLE1BQU0sQ0FBQztTQUNmLE1BQU0sQ0FBQyxlQUFlLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxnQkFBZ0IsRUFBRSxtQkFBbUIsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO0lBQy9HLE9BQU8sQ0FBQyxLQUFLLENBQUMscUNBQXFDLGVBQWUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBRTlFLE1BQU0sZUFBZSxHQUFHLGdCQUFnQixHQUFHLElBQUksQ0FBQztJQUNoRCxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtRQUMxQixNQUFNLEtBQUssQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxlQUFlLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQzFFO0lBRUQsTUFBTSxlQUFlLENBQUMsa0JBQWtCLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBRSxRQUFRLEVBQUUsQ0FBQyxDQUFDO0lBRXpGLE9BQU8sZUFBZSxDQUFDO0FBQ3pCLENBQUM7QUFuQkQsOENBbUJDIn0=