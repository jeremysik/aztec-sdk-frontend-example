"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployDefiBridgeProxy = void 0;
const ethers_1 = require("ethers");
const DefiBridgeProxy_json_1 = __importDefault(require("../../artifacts/contracts/DefiBridgeProxy.sol/DefiBridgeProxy.json"));
async function deployDefiBridgeProxy(signer) {
    console.error('Deploying DefiBridgeProxy...');
    const defiBridgeProxyLibrary = new ethers_1.ContractFactory(DefiBridgeProxy_json_1.default.abi, DefiBridgeProxy_json_1.default.bytecode, signer);
    const defiBridgeProxy = await defiBridgeProxyLibrary.deploy();
    console.error(`DefiBridgeProxy contract address: ${defiBridgeProxy.address}.`);
    return defiBridgeProxy;
}
exports.deployDefiBridgeProxy = deployDefiBridgeProxy;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X2RlZmlfYnJpZGdlX3Byb3h5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RlcGxveS9kZXBsb3llcnMvZGVwbG95X2RlZmlfYnJpZGdlX3Byb3h5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1DQUFpRDtBQUNqRCw4SEFBaUc7QUFFMUYsS0FBSyxVQUFVLHFCQUFxQixDQUFDLE1BQWM7SUFDeEQsT0FBTyxDQUFDLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQyxDQUFDO0lBQzlDLE1BQU0sc0JBQXNCLEdBQUcsSUFBSSx3QkFBZSxDQUFDLDhCQUFlLENBQUMsR0FBRyxFQUFFLDhCQUFlLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzFHLE1BQU0sZUFBZSxHQUFHLE1BQU0sc0JBQXNCLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDOUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsZUFBZSxDQUFDLE9BQU8sR0FBRyxDQUFDLENBQUM7SUFDL0UsT0FBTyxlQUFlLENBQUM7QUFDekIsQ0FBQztBQU5ELHNEQU1DIn0=