"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deployMockVerifier = exports.deployVerifier = void 0;
const ethers_1 = require("ethers");
const StandardVerifier_json_1 = __importDefault(require("../../artifacts/contracts/verifier/StandardVerifier.sol/StandardVerifier.json"));
const MockVerifier_json_1 = __importDefault(require("../../artifacts/contracts/test/MockVerifier.sol/MockVerifier.json"));
const verification_keys_1 = require("../../contracts/verifier/verification_keys");
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
async function deployVerifier(signer, vk) {
    console.error(`Deploying ${vk}...`);
    const VerificationKey = verification_keys_1.Keys[vk];
    const StandardVerificationKeyLibrary = new ethers_1.ContractFactory(VerificationKey.abi, VerificationKey.bytecode, signer);
    const StandardVerificationKeyLib = await StandardVerificationKeyLibrary.deploy();
    console.error(`${vk} address: ${StandardVerificationKeyLib.address}`);
    console.error('Deploying StandardVerifier...');
    const linkedVBytecode = linkBytecode(StandardVerifier_json_1.default, {
        VerificationKey: StandardVerificationKeyLib.address,
    });
    const verifierFactory = new ethers_1.ContractFactory(StandardVerifier_json_1.default.abi, linkedVBytecode, signer);
    const verifier = await verifierFactory.deploy();
    console.error(`StandardVerifier contract address: ${verifier.address}`);
    return verifier;
}
exports.deployVerifier = deployVerifier;
async function deployMockVerifier(signer) {
    console.error('Deploying MockVerifier...');
    const verifierFactory = new ethers_1.ContractFactory(MockVerifier_json_1.default.abi, MockVerifier_json_1.default.bytecode, signer);
    const verifier = await verifierFactory.deploy();
    console.error(`MockVerifier contract address: ${verifier.address}`);
    return verifier;
}
exports.deployMockVerifier = deployMockVerifier;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwbG95X3ZlcmlmaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2RlcGxveS9kZXBsb3llcnMvZGVwbG95X3ZlcmlmaWVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLG1DQUFpRDtBQUNqRCwwSUFBNkc7QUFDN0csMEhBQTZGO0FBQzdGLGtGQUFrRTtBQUVsRSxTQUFTLFlBQVksQ0FBQyxRQUFhLEVBQUUsU0FBYztJQUNqRCxJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDO0lBQ2pDLEtBQUssTUFBTSxLQUFLLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsY0FBYyxDQUFDLEVBQUU7UUFDM0QsTUFBTSxDQUFDLEVBQUUsY0FBYyxDQUFDLEdBQVEsS0FBSyxDQUFDO1FBQ3RDLEtBQUssTUFBTSxTQUFTLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRTtZQUN0RCxNQUFNLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxHQUFRLFNBQVMsQ0FBQztZQUN6QyxNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDaEMsSUFBSSxJQUFJLEtBQUssU0FBUyxFQUFFO2dCQUN0QixTQUFTO2FBQ1Y7WUFFRCxLQUFLLE1BQU0sS0FBSyxJQUFJLE1BQU0sRUFBRTtnQkFDMUIsUUFBUTtvQkFDTixRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsS0FBSyxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7d0JBQ3ZDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO3dCQUNkLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDekQ7U0FDRjtLQUNGO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQUVNLEtBQUssVUFBVSxjQUFjLENBQUMsTUFBYyxFQUFFLEVBQVU7SUFDN0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDcEMsTUFBTSxlQUFlLEdBQUcsd0JBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNqQyxNQUFNLDhCQUE4QixHQUFHLElBQUksd0JBQWUsQ0FBQyxlQUFlLENBQUMsR0FBRyxFQUFFLGVBQWUsQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDbEgsTUFBTSwwQkFBMEIsR0FBRyxNQUFNLDhCQUE4QixDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2pGLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLGFBQWEsMEJBQTBCLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQztJQUV0RSxPQUFPLENBQUMsS0FBSyxDQUFDLCtCQUErQixDQUFDLENBQUM7SUFDL0MsTUFBTSxlQUFlLEdBQUcsWUFBWSxDQUFDLCtCQUFnQixFQUFFO1FBQ3JELGVBQWUsRUFBRSwwQkFBMEIsQ0FBQyxPQUFPO0tBQ3BELENBQUMsQ0FBQztJQUNILE1BQU0sZUFBZSxHQUFHLElBQUksd0JBQWUsQ0FBQywrQkFBZ0IsQ0FBQyxHQUFHLEVBQUUsZUFBZSxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzNGLE1BQU0sUUFBUSxHQUFHLE1BQU0sZUFBZSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2hELE9BQU8sQ0FBQyxLQUFLLENBQUMsc0NBQXNDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDO0lBQ3hFLE9BQU8sUUFBUSxDQUFDO0FBQ2xCLENBQUM7QUFmRCx3Q0FlQztBQUVNLEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxNQUFjO0lBQ3JELE9BQU8sQ0FBQyxLQUFLLENBQUMsMkJBQTJCLENBQUMsQ0FBQztJQUMzQyxNQUFNLGVBQWUsR0FBRyxJQUFJLHdCQUFlLENBQUMsMkJBQVksQ0FBQyxHQUFHLEVBQUUsMkJBQVksQ0FBQyxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDN0YsTUFBTSxRQUFRLEdBQUcsTUFBTSxlQUFlLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDaEQsT0FBTyxDQUFDLEtBQUssQ0FBQyxrQ0FBa0MsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7SUFDcEUsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQztBQU5ELGdEQU1DIn0=