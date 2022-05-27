"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateSignature = void 0;
const ethers_1 = require("ethers");
function validateSignature(publicOwner, signature, signingData) {
    const recoveredSigner = ethers_1.ethers.utils.verifyMessage(signingData, `0x${signature.toString('hex')}`);
    return recoveredSigner.toLowerCase() === publicOwner.toString().toLowerCase();
}
exports.validateSignature = validateSignature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVfc2lnbmF0dXJlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3ZhbGlkYXRlX3NpZ25hdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxtQ0FBZ0M7QUFFaEMsU0FBZ0IsaUJBQWlCLENBQUMsV0FBdUIsRUFBRSxTQUFpQixFQUFFLFdBQW1CO0lBQy9GLE1BQU0sZUFBZSxHQUFHLGVBQU0sQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxLQUFLLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQ2xHLE9BQU8sZUFBZSxDQUFDLFdBQVcsRUFBRSxLQUFLLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUNoRixDQUFDO0FBSEQsOENBR0MifQ==