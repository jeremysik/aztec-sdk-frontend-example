"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefiBridge = void 0;
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const IDefiBridge_json_1 = require("../../artifacts/contracts/interfaces/IDefiBridge.sol/IDefiBridge.json");
const contract_with_signer_1 = require("../contract_with_signer");
class DefiBridge {
    constructor(address, provider, defaultOptions = { gasLimit: 1000000 }) {
        this.address = address;
        this.defaultOptions = defaultOptions;
        this.provider = new providers_1.Web3Provider(provider);
        this.contract = new ethers_1.Contract(address.toString(), IDefiBridge_json_1.abi, this.provider);
    }
    async finalise(inputAsset, outputAssetA, outputAssetB, bitConfig, interactionNonce, options = {}) {
        const contract = new contract_with_signer_1.ContractWithSigner(this.contract, { ...this.defaultOptions, ...options });
        return contract.sendTx('finalise', inputAsset.toString(), outputAssetA.toString(), outputAssetB.toString(), interactionNonce, bitConfig);
    }
}
exports.DefiBridge = DefiBridge;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmaV9icmlkZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJhY3RzL2RlZmlfYnJpZGdlL2RlZmlfYnJpZGdlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHdEQUF3RDtBQUN4RCxtQ0FBa0M7QUFDbEMsNEdBQTRGO0FBQzVGLGtFQUE2RDtBQUU3RCxNQUFhLFVBQVU7SUFJckIsWUFDUyxPQUFtQixFQUMxQixRQUEwQixFQUNsQixpQkFBZ0MsRUFBRSxRQUFRLEVBQUUsT0FBTyxFQUFFO1FBRnRELFlBQU8sR0FBUCxPQUFPLENBQVk7UUFFbEIsbUJBQWMsR0FBZCxjQUFjLENBQXVDO1FBRTdELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSx3QkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxpQkFBUSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsRUFBRSxzQkFBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN2RSxDQUFDO0lBRUQsS0FBSyxDQUFDLFFBQVEsQ0FDWixVQUFzQixFQUN0QixZQUF3QixFQUN4QixZQUF3QixFQUN4QixTQUFpQixFQUNqQixnQkFBd0IsRUFDeEIsVUFBeUIsRUFBRTtRQUUzQixNQUFNLFFBQVEsR0FBRyxJQUFJLHlDQUFrQixDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQy9GLE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FDcEIsVUFBVSxFQUNWLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFDckIsWUFBWSxDQUFDLFFBQVEsRUFBRSxFQUN2QixZQUFZLENBQUMsUUFBUSxFQUFFLEVBQ3ZCLGdCQUFnQixFQUNoQixTQUFTLENBQ1YsQ0FBQztJQUNKLENBQUM7Q0FDRjtBQS9CRCxnQ0ErQkMifQ==