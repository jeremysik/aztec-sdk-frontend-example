"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3Signer = void 0;
const providers_1 = require("@ethersproject/providers");
const ethers_1 = require("ethers");
const validate_signature_1 = require("../validate_signature");
class Web3Signer {
    constructor(provider) {
        this.provider = new providers_1.Web3Provider(provider);
    }
    async signPersonalMessage(message, address) {
        const toSign = ethers_1.utils.hexlify(ethers_1.utils.toUtf8Bytes(message.toString()));
        const result = await this.provider.send('personal_sign', [toSign, address.toString()]);
        return Buffer.from(result.slice(2), 'hex');
    }
    async signMessage(message, address) {
        const signer = this.provider.getSigner(address.toString());
        const sig = await signer.signMessage(message);
        const signature = Buffer.from(sig.slice(2), 'hex');
        // Ganache is not signature standard compliant. Returns 00 or 01 as v.
        // Need to adjust to make v 27 or 28.
        const v = signature[signature.length - 1];
        if (v <= 1) {
            return Buffer.concat([signature.slice(0, -1), Buffer.from([v + 27])]);
        }
        return signature;
    }
    async signTypedData({ domain, types, message }, address) {
        const signer = this.provider.getSigner(address.toString());
        const result = await signer._signTypedData(domain, types, message);
        const signature = Buffer.from(result.slice(2), 'hex');
        const r = signature.slice(0, 32);
        const s = signature.slice(32, 64);
        const v = signature.slice(64, 65);
        const sig = { v, r, s };
        return sig;
    }
    validateSignature(publicOwner, signature, signingData) {
        return (0, validate_signature_1.validateSignature)(publicOwner, signature, signingData);
    }
}
exports.Web3Signer = Web3Signer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2ViM19zaWduZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2lnbmVyL3dlYjNfc2lnbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHdEQUF3RDtBQUN4RCxtQ0FBK0I7QUFDL0IsOERBQTBEO0FBRTFELE1BQWEsVUFBVTtJQUdyQixZQUFZLFFBQTBCO1FBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSx3QkFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQzdDLENBQUM7SUFFTSxLQUFLLENBQUMsbUJBQW1CLENBQUMsT0FBZSxFQUFFLE9BQW1CO1FBQ25FLE1BQU0sTUFBTSxHQUFHLGNBQUssQ0FBQyxPQUFPLENBQUMsY0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3BFLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLENBQUMsTUFBTSxFQUFFLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDdkYsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDN0MsQ0FBQztJQUVNLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBZSxFQUFFLE9BQW1CO1FBQzNELE1BQU0sTUFBTSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzNELE1BQU0sR0FBRyxHQUFHLE1BQU0sTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUM5QyxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFFbkQsc0VBQXNFO1FBQ3RFLHFDQUFxQztRQUNyQyxNQUFNLENBQUMsR0FBRyxTQUFTLENBQUMsU0FBUyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQztRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDVixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDdkU7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBRU0sS0FBSyxDQUFDLGFBQWEsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFhLEVBQUUsT0FBbUI7UUFDbkYsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDM0QsTUFBTSxNQUFNLEdBQUcsTUFBTSxNQUFNLENBQUMsY0FBYyxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDbkUsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3RELE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sQ0FBQyxHQUFHLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLE1BQU0sR0FBRyxHQUFzQixFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUM7UUFDM0MsT0FBTyxHQUFHLENBQUM7SUFDYixDQUFDO0lBRU0saUJBQWlCLENBQUMsV0FBdUIsRUFBRSxTQUFpQixFQUFFLFdBQW1CO1FBQ3RGLE9BQU8sSUFBQSxzQ0FBaUIsRUFBQyxXQUFXLEVBQUUsU0FBUyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2hFLENBQUM7Q0FDRjtBQTFDRCxnQ0EwQ0MifQ==