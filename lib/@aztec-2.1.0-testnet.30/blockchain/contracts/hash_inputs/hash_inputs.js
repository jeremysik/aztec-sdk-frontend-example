"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HashInputs = void 0;
const address_1 = require("@aztec/barretenberg/address");
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const HashInputs_json_1 = __importDefault(require("../../artifacts/contracts/test/HashInputs.sol/HashInputs.json"));
const fixEthersStackTrace = (err) => {
    err.stack += new Error().stack;
    throw err;
};
class HashInputs {
    constructor(hashInputsContractAddress, provider, defaults = {}) {
        this.hashInputsContractAddress = hashInputsContractAddress;
        this.provider = provider;
        this.defaults = defaults;
        this.hashInputs = new ethers_1.Contract(hashInputsContractAddress.toString(), HashInputs_json_1.default.abi, new providers_1.Web3Provider(this.provider));
    }
    static async deploy(provider, defaults = {}) {
        const { signingAddress } = defaults;
        const signer = new providers_1.Web3Provider(provider).getSigner(signingAddress ? signingAddress.toString() : 0);
        const hashInputsFactory = new ethers_1.ContractFactory(HashInputs_json_1.default.abi, HashInputs_json_1.default.bytecode, signer);
        const hashInputs = await hashInputsFactory.deploy().catch(fixEthersStackTrace);
        return new HashInputs(address_1.EthAddress.fromString(hashInputs.address), provider, defaults);
    }
    get address() {
        return this.hashInputsContractAddress;
    }
    get contract() {
        return this.hashInputs;
    }
    async computePublicInputHash(proofData, options = {}) {
        const { signingAddress, gasLimit } = { ...options, ...this.defaults };
        const signer = new providers_1.Web3Provider(this.provider).getSigner(signingAddress ? signingAddress.toString() : 0);
        const hashInputs = new ethers_1.Contract(this.hashInputsContractAddress.toString(), HashInputs_json_1.default.abi, signer);
        const txResponse = await hashInputs.computePublicInputHash(proofData, { gasLimit }).catch(fixEthersStackTrace);
        const receipt = await txResponse.wait();
        return receipt.gasUsed.toNumber();
    }
    async validate(proofData, options = {}) {
        const { signingAddress, gasLimit } = { ...options, ...this.defaults };
        const signer = new providers_1.Web3Provider(this.provider).getSigner(signingAddress ? signingAddress.toString() : 0);
        const hashInputs = new ethers_1.Contract(this.hashInputsContractAddress.toString(), HashInputs_json_1.default.abi, signer);
        await hashInputs.verifyProofTest(proofData, { gasLimit }).catch(fixEthersStackTrace);
    }
}
exports.HashInputs = HashInputs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGFzaF9pbnB1dHMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJhY3RzL2hhc2hfaW5wdXRzL2hhc2hfaW5wdXRzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlEQUF5RDtBQUV6RCx3REFBd0Q7QUFDeEQsbUNBQW1EO0FBQ25ELG9IQUErRjtBQUUvRixNQUFNLG1CQUFtQixHQUFHLENBQUMsR0FBVSxFQUFFLEVBQUU7SUFDekMsR0FBRyxDQUFDLEtBQU0sSUFBSSxJQUFJLEtBQUssRUFBRSxDQUFDLEtBQUssQ0FBQztJQUNoQyxNQUFNLEdBQUcsQ0FBQztBQUNaLENBQUMsQ0FBQztBQUVGLE1BQWEsVUFBVTtJQUdyQixZQUNVLHlCQUFxQyxFQUNyQyxRQUEwQixFQUMxQixXQUEwQixFQUFFO1FBRjVCLDhCQUF5QixHQUF6Qix5QkFBeUIsQ0FBWTtRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFrQjtRQUMxQixhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQUVwQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksaUJBQVEsQ0FDNUIseUJBQXlCLENBQUMsUUFBUSxFQUFFLEVBQ3BDLHlCQUFrQixDQUFDLEdBQUcsRUFDdEIsSUFBSSx3QkFBWSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FDaEMsQ0FBQztJQUNKLENBQUM7SUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUEwQixFQUFFLFdBQTBCLEVBQUU7UUFDMUUsTUFBTSxFQUFFLGNBQWMsRUFBRSxHQUFHLFFBQVEsQ0FBQztRQUNwQyxNQUFNLE1BQU0sR0FBRyxJQUFJLHdCQUFZLENBQUMsUUFBUSxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUlwRyxNQUFNLGlCQUFpQixHQUFHLElBQUksd0JBQWUsQ0FBQyx5QkFBa0IsQ0FBQyxHQUFHLEVBQUUseUJBQWtCLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQzNHLE1BQU0sVUFBVSxHQUFHLE1BQU0saUJBQWlCLENBQUMsTUFBTSxFQUFFLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDL0UsT0FBTyxJQUFJLFVBQVUsQ0FBQyxvQkFBVSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsUUFBUSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFRCxJQUFJLE9BQU87UUFDVCxPQUFPLElBQUksQ0FBQyx5QkFBeUIsQ0FBQztJQUN4QyxDQUFDO0lBRUQsSUFBSSxRQUFRO1FBQ1YsT0FBTyxJQUFJLENBQUMsVUFBVSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxLQUFLLENBQUMsc0JBQXNCLENBQUMsU0FBaUIsRUFBRSxVQUF5QixFQUFFO1FBQ3pFLE1BQU0sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0RSxNQUFNLE1BQU0sR0FBRyxJQUFJLHdCQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekcsTUFBTSxVQUFVLEdBQUcsSUFBSSxpQkFBUSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSx5QkFBa0IsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0csTUFBTSxVQUFVLEdBQUcsTUFBTSxVQUFVLENBQUMsc0JBQXNCLENBQUMsU0FBUyxFQUFFLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztRQUMvRyxNQUFNLE9BQU8sR0FBRyxNQUFNLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN4QyxPQUFPLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDcEMsQ0FBQztJQUVELEtBQUssQ0FBQyxRQUFRLENBQUMsU0FBaUIsRUFBRSxVQUF5QixFQUFFO1FBQzNELE1BQU0sRUFBRSxjQUFjLEVBQUUsUUFBUSxFQUFFLEdBQUcsRUFBRSxHQUFHLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0RSxNQUFNLE1BQU0sR0FBRyxJQUFJLHdCQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekcsTUFBTSxVQUFVLEdBQUcsSUFBSSxpQkFBUSxDQUFDLElBQUksQ0FBQyx5QkFBeUIsQ0FBQyxRQUFRLEVBQUUsRUFBRSx5QkFBa0IsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7UUFDM0csTUFBTSxVQUFVLENBQUMsZUFBZSxDQUFDLFNBQVMsRUFBRSxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDdkYsQ0FBQztDQUNGO0FBakRELGdDQWlEQyJ9