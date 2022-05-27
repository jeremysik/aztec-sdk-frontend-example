"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.retrieveEvents = void 0;
const ethers_1 = require("ethers");
const providers_1 = require("@ethersproject/providers");
const contract_abis_1 = require("./contract_abis");
async function retrieveEvents(contractAddress, contractName, provider, eventName, from, to) {
    const contract = new ethers_1.Contract(contractAddress, contract_abis_1.abis[contractName].abi, new providers_1.Web3Provider(provider));
    const filter = contract.filters[eventName]();
    const events = await contract.queryFilter(filter, from, to);
    return events.map(event => contract.interface.parseLog(event));
}
exports.retrieveEvents = retrieveEvents;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmV0cmlldmVfZXZlbnRzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvbnRyYWN0cy9yZXRyaWV2ZV9ldmVudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbUNBQWtDO0FBQ2xDLHdEQUF3RDtBQUN4RCxtREFBdUM7QUFFaEMsS0FBSyxVQUFVLGNBQWMsQ0FDbEMsZUFBdUIsRUFDdkIsWUFBb0IsRUFDcEIsUUFBMEIsRUFDMUIsU0FBaUIsRUFDakIsSUFBWSxFQUNaLEVBQVc7SUFFWCxNQUFNLFFBQVEsR0FBRyxJQUFJLGlCQUFRLENBQUMsZUFBZSxFQUFFLG9CQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUksd0JBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQ25HLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQztJQUM3QyxNQUFNLE1BQU0sR0FBRyxNQUFNLFFBQVEsQ0FBQyxXQUFXLENBQUMsTUFBTSxFQUFFLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQztJQUM1RCxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO0FBQ2pFLENBQUM7QUFaRCx3Q0FZQyJ9