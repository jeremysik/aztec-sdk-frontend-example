"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDefiClaimTx = void 0;
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
class UserDefiClaimTx {
    constructor(txId, defiTxId, userId, bridgeId, depositValue, success, outputValueA, outputValueB, settled) {
        this.txId = txId;
        this.defiTxId = defiTxId;
        this.userId = userId;
        this.bridgeId = bridgeId;
        this.depositValue = depositValue;
        this.success = success;
        this.outputValueA = outputValueA;
        this.outputValueB = outputValueB;
        this.settled = settled;
        this.proofId = client_proofs_1.ProofId.DEFI_CLAIM;
    }
}
exports.UserDefiClaimTx = UserDefiClaimTx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9kZWZpX2NsYWltX3R4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VzZXJfdHgvdXNlcl9kZWZpX2NsYWltX3R4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHFFQUE0RDtBQUc1RCxNQUFhLGVBQWU7SUFHMUIsWUFDa0IsSUFBc0IsRUFDdEIsUUFBYyxFQUNkLE1BQWlCLEVBQ2pCLFFBQWtCLEVBQ2xCLFlBQXdCLEVBQ3hCLE9BQWdCLEVBQ2hCLFlBQXdCLEVBQ3hCLFlBQW9DLEVBQ3BDLE9BQWM7UUFSZCxTQUFJLEdBQUosSUFBSSxDQUFrQjtRQUN0QixhQUFRLEdBQVIsUUFBUSxDQUFNO1FBQ2QsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGlCQUFZLEdBQVosWUFBWSxDQUFZO1FBQ3hCLFlBQU8sR0FBUCxPQUFPLENBQVM7UUFDaEIsaUJBQVksR0FBWixZQUFZLENBQVk7UUFDeEIsaUJBQVksR0FBWixZQUFZLENBQXdCO1FBQ3BDLFlBQU8sR0FBUCxPQUFPLENBQU87UUFYaEIsWUFBTyxHQUFHLHVCQUFPLENBQUMsVUFBVSxDQUFDO0lBWTFDLENBQUM7Q0FDTDtBQWRELDBDQWNDIn0=