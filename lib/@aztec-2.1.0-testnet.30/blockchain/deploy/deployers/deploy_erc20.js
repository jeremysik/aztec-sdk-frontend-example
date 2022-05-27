"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployErc20 = void 0;
const ethers_1 = require("ethers");
const ERC20Permit_json_1 = __importDefault(require("../../artifacts/contracts/test/ERC20Permit.sol/ERC20Permit.json"));
const ERC20Mintable_json_1 = __importDefault(require("../../artifacts/contracts/test/ERC20Mintable.sol/ERC20Mintable.json"));
const gasLimit = 5000000;
async function deployErc20(rollup, signer, supportsPermit, symbol = 'TEST', decimals = 18) {
    if (supportsPermit) {
        console.error('Deploying ERC20 with permit support...');
        const erc20Factory = new ethers_1.ContractFactory(ERC20Permit_json_1.default.abi, ERC20Permit_json_1.default.bytecode, signer);
        const erc20 = await erc20Factory.deploy(symbol);
        console.error(`ERC20 contract address: ${erc20.address}`);
        if (decimals !== 18) {
            console.error(`Changing decimals to: ${decimals}...`);
            await erc20.setDecimals(decimals);
        }
        await rollup.setSupportedAsset(erc20.address, 0, { gasLimit });
        return erc20;
    }
    else {
        console.error('Deploying ERC20...');
        const erc20Factory = new ethers_1.ContractFactory(ERC20Mintable_json_1.default.abi, ERC20Mintable_json_1.default.bytecode, signer);
        const erc20 = await erc20Factory.deploy(symbol);
        console.error(`ERC20 contract address: ${erc20.address}`);
        if (decimals !== 18) {
            console.error(`Changing decimals to: ${decimals}...`);
            await erc20.setDecimals(decimals, { gasLimit });
        }
        await rollup.setSupportedAsset(erc20.address, 0, { gasLimit });
        return erc20;
    }
}
exports.deployErc20 = deployErc20;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X2VyYzIwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RlcGxveS9kZXBsb3llcnMvZGVwbG95X2VyYzIwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1DQUEyRDtBQUMzRCx1SEFBMEY7QUFDMUYsNkhBQWdHO0FBRWhHLE1BQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQztBQUVsQixLQUFLLFVBQVUsV0FBVyxDQUMvQixNQUFnQixFQUNoQixNQUFjLEVBQ2QsY0FBdUIsRUFDdkIsTUFBTSxHQUFHLE1BQU0sRUFDZixRQUFRLEdBQUcsRUFBRTtJQUViLElBQUksY0FBYyxFQUFFO1FBQ2xCLE9BQU8sQ0FBQyxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztRQUN4RCxNQUFNLFlBQVksR0FBRyxJQUFJLHdCQUFlLENBQUMsMEJBQVcsQ0FBQyxHQUFHLEVBQUUsMEJBQVcsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDeEYsTUFBTSxLQUFLLEdBQUcsTUFBTSxZQUFZLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzFELElBQUksUUFBUSxLQUFLLEVBQUUsRUFBRTtZQUNuQixPQUFPLENBQUMsS0FBSyxDQUFDLHlCQUF5QixRQUFRLEtBQUssQ0FBQyxDQUFDO1lBQ3RELE1BQU0sS0FBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNuQztRQUNELE1BQU0sTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvRCxPQUFPLEtBQUssQ0FBQztLQUNkO1NBQU07UUFDTCxPQUFPLENBQUMsS0FBSyxDQUFDLG9CQUFvQixDQUFDLENBQUM7UUFDcEMsTUFBTSxZQUFZLEdBQUcsSUFBSSx3QkFBZSxDQUFDLDRCQUFhLENBQUMsR0FBRyxFQUFFLDRCQUFhLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzVGLE1BQU0sS0FBSyxHQUFHLE1BQU0sWUFBWSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNoRCxPQUFPLENBQUMsS0FBSyxDQUFDLDJCQUEyQixLQUFLLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUMxRCxJQUFJLFFBQVEsS0FBSyxFQUFFLEVBQUU7WUFDbkIsT0FBTyxDQUFDLEtBQUssQ0FBQyx5QkFBeUIsUUFBUSxLQUFLLENBQUMsQ0FBQztZQUN0RCxNQUFNLEtBQUssQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUNqRDtRQUNELE1BQU0sTUFBTSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztRQUMvRCxPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQztBQTlCRCxrQ0E4QkMifQ==