"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StandardVerifier = void 0;
const address_1 = require("@aztec/barretenberg/address");
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const StandardVerifier_json_1 = __importDefault(require("../../artifacts/contracts/verifier/StandardVerifier.sol/StandardVerifier.json"));
const verification_keys_1 = require("./verification_keys");
const fixEthersStackTrace = (err) => {
    err.stack += new Error().stack;
    throw err;
};
function linkBytecode(artifact, libraries) {
    let bytecode = artifact.bytecode;
    for (const entry of Object.entries(artifact.linkReferences)) {
        const [, fileReferences] = entry;
        for (const fileEntry of Object.entries(fileReferences)) {
            const [libName, fixups] = fileEntry;
            const addr = libraries[libName];
            if (addr === undefined) {
                continue;
            }
            for (const fixup of fixups) {
                bytecode =
                    bytecode.substr(0, 2 + fixup.start * 2) +
                        addr.substr(2) +
                        bytecode.substr(2 + (fixup.start + fixup.length) * 2);
            }
        }
    }
    return bytecode;
}
class StandardVerifier {
    constructor(verifierContractAddress, provider, defaults = {}) {
        this.verifierContractAddress = verifierContractAddress;
        this.provider = provider;
        this.defaults = defaults;
        this.verifier = new ethers_1.Contract(verifierContractAddress.toString(), StandardVerifier_json_1.default.abi, new providers_1.Web3Provider(this.provider));
    }
    static async deploy(provider, vk, defaults = {}) {
        const { signingAddress } = defaults;
        const signer = new providers_1.Web3Provider(provider).getSigner(signingAddress ? signingAddress.toString() : 0);
        const VerificationKey = verification_keys_1.Keys[vk];
        const StandardVerificationKeyLibrary = new ethers_1.ContractFactory(VerificationKey.abi, VerificationKey.bytecode, signer);
        const StandardVerificationKeyLib = await StandardVerificationKeyLibrary.deploy();
        const linkedVBytecode = linkBytecode(StandardVerifier_json_1.default, {
            VerificationKey: StandardVerificationKeyLib.address,
        });
        const verifierFactory = new ethers_1.ContractFactory(StandardVerifier_json_1.default.abi, linkedVBytecode, signer);
        const verifier = await verifierFactory.deploy().catch(fixEthersStackTrace);
        await verifier.deployed();
        return new StandardVerifier(address_1.EthAddress.fromString(verifier.address), provider, defaults);
    }
    get address() {
        return this.verifierContractAddress;
    }
    get contract() {
        return this.verifier;
    }
    async verify(proofData, pubInputsHash, options = {}) {
        const { signingAddress, gasLimit } = { ...options, ...this.defaults };
        const signer = new providers_1.Web3Provider(this.provider).getSigner(signingAddress ? signingAddress.toString() : 0);
        const verifier = new ethers_1.Contract(this.verifierContractAddress.toString(), StandardVerifier_json_1.default.abi, signer);
        await verifier.verify(proofData, pubInputsHash, { gasLimit }).catch(fixEthersStackTrace);
        return verifier.estimateGas.verify(proofData, pubInputsHash, { gasLimit });
    }
}
exports.StandardVerifier = StandardVerifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RhbmRhcmRfdmVyaWZpZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29udHJhY3RzL3ZlcmlmaWVyL3N0YW5kYXJkX3ZlcmlmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlEQUF5RDtBQUV6RCx3REFBd0Q7QUFDeEQsbUNBQW1EO0FBQ25ELDBJQUFxSDtBQUNySCwyREFBMkM7QUFFM0MsTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEdBQVUsRUFBRSxFQUFFO0lBQ3pDLEdBQUcsQ0FBQyxLQUFNLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQyxLQUFLLENBQUM7SUFDaEMsTUFBTSxHQUFHLENBQUM7QUFDWixDQUFDLENBQUM7QUFFRixTQUFTLFlBQVksQ0FBQyxRQUFhLEVBQUUsU0FBYztJQUNqRCxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQ2pDLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDM0QsTUFBTSxDQUFDLEVBQUUsY0FBYyxDQUFDLEdBQVEsS0FBSyxDQUFDO1FBQ3RDLEtBQUssTUFBTSxTQUFTLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUN0RCxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFRLFNBQVMsQ0FBQztZQUN6QyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUN0QixTQUFTO2FBQ1Y7WUFFRCxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtnQkFDMUIsUUFBUTtvQkFDTixRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7d0JBQ3ZDLElBQUksQ0FBQyxNQUFNLENB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