"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecoverAccountController = void 0;
const signer_1 = require("../signer");
const add_signing_key_controller_1 = require("./add_signing_key_controller");
class RecoverAccountController {
    constructor(recoveryPayload, fee, core) {
        this.recoveryPayload = recoveryPayload;
        this.fee = fee;
        const { trustedThirdPartyPublicKey, recoveryPublicKey, recoveryData: { accountId, signature }, } = recoveryPayload;
        const recoverySigner = new signer_1.RecoverSignatureSigner(recoveryPublicKey, signature);
        this.addSigningKeyController = new add_signing_key_controller_1.AddSigningKeyController(accountId, recoverySigner, trustedThirdPartyPublicKey, undefined, fee, core);
    }
    async createProof() {
        await this.addSigningKeyController.createProof();
    }
    async send() {
        return this.addSigningKeyController.send();
    }
    async awaitSettlement(timeout) {
        await this.addSigningKeyController.awaitSettlement(timeout);
    }
}
exports.RecoverAccountController = RecoverAccountController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVjb3Zlcl9hY2NvdW50X2NvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29udHJvbGxlcnMvcmVjb3Zlcl9hY2NvdW50X2NvbnRyb2xsZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsc0NBQW1EO0FBRW5ELDZFQUF1RTtBQUV2RSxNQUFhLHdCQUF3QjtJQUduQyxZQUE0QixlQUFnQyxFQUFrQixHQUFlLEVBQUUsSUFBc0I7UUFBekYsb0JBQWUsR0FBZixlQUFlLENBQWlCO1FBQWtCLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDM0YsTUFBTSxFQUNKLDBCQUEwQixFQUMxQixpQkFBaUIsRUFDakIsWUFBWSxFQUFFLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxHQUN2QyxHQUFHLGVBQWUsQ0FBQztRQUNwQixNQUFNLGNBQWMsR0FBRyxJQUFJLCtCQUFzQixDQUFDLGlCQUFpQixFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBQ2hGLElBQUksQ0FBQyx1QkFBdUIsR0FBRyxJQUFJLG9EQUF1QixDQUN4RCxTQUFTLEVBQ1QsY0FBYyxFQUNkLDBCQUEwQixFQUMxQixTQUFTLEVBQ1QsR0FBRyxFQUNILElBQUksQ0FDTCxDQUFDO0lBQ0osQ0FBQztJQUVNLEtBQUssQ0FBQyxXQUFXO1FBQ3RCLE1BQU0sSUFBSSxDQUFDLHVCQUF1QixDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ25ELENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSTtRQUNSLE9BQU8sSUFBSSxDQUFDLHVCQUF1QixDQUFDLElBQUksRUFBRSxDQUFDO0lBQzdDLENBQUM7SUFFRCxLQUFLLENBQUMsZUFBZSxDQUFDLE9BQWdCO1FBQ3BDLE1BQU0sSUFBSSxDQUFDLHVCQUF1QixDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM5RCxDQUFDO0NBQ0Y7QUEvQkQsNERBK0JDIn0=