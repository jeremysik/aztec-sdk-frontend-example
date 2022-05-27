"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAccountTx = void 0;
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
class UserAccountTx {
    constructor(txId, userId, aliasHash, newSigningPubKey1, newSigningPubKey2, migrated, fee, created, settled) {
        this.txId = txId;
        this.userId = userId;
        this.aliasHash = aliasHash;
        this.newSigningPubKey1 = newSigningPubKey1;
        this.newSigningPubKey2 = newSigningPubKey2;
        this.migrated = migrated;
        this.fee = fee;
        this.created = created;
        this.settled = settled;
        this.proofId = client_proofs_1.ProofId.ACCOUNT;
    }
}
exports.UserAccountTx = UserAccountTx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9hY2NvdW50X3R4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VzZXJfdHgvdXNlcl9hY2NvdW50X3R4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUVBLHFFQUE0RDtBQUc1RCxNQUFhLGFBQWE7SUFHeEIsWUFDa0IsSUFBVSxFQUNWLE1BQWlCLEVBQ2pCLFNBQW9CLEVBQ3BCLGlCQUFxQyxFQUNyQyxpQkFBcUMsRUFDckMsUUFBaUIsRUFDakIsR0FBZSxFQUNmLE9BQWEsRUFDYixPQUFjO1FBUmQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQUNwQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQW9CO1FBQ3JDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBb0I7UUFDckMsYUFBUSxHQUFSLFFBQVEsQ0FBUztRQUNqQixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ2YsWUFBTyxHQUFQLE9BQU8sQ0FBTTtRQUNiLFlBQU8sR0FBUCxPQUFPLENBQU87UUFYaEIsWUFBTyxHQUFHLHVCQUFPLENBQUMsT0FBTyxDQUFDO0lBWXZDLENBQUM7Q0FDTDtBQWRELHNDQWNDIn0=