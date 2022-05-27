"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreAccountTxFromJson = exports.coreAccountTxToJson = exports.CoreAccountTx = void 0;
const account_id_1 = require("@aztec/barretenberg/account_id");
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
const tx_id_1 = require("@aztec/barretenberg/tx_id");
class CoreAccountTx {
    constructor(txId, userId, aliasHash, newSigningPubKey1, newSigningPubKey2, migrated, txRefNo, created, settled) {
        this.txId = txId;
        this.userId = userId;
        this.aliasHash = aliasHash;
        this.newSigningPubKey1 = newSigningPubKey1;
        this.newSigningPubKey2 = newSigningPubKey2;
        this.migrated = migrated;
        this.txRefNo = txRefNo;
        this.created = created;
        this.settled = settled;
        this.proofId = client_proofs_1.ProofId.ACCOUNT;
    }
}
exports.CoreAccountTx = CoreAccountTx;
const coreAccountTxToJson = (tx) => ({
    ...tx,
    txId: tx.txId.toString(),
    userId: tx.userId.toString(),
    aliasHash: tx.aliasHash.toString(),
    newSigningPubKey1: tx.newSigningPubKey1 ? tx.newSigningPubKey1.toString('hex') : undefined,
    newSigningPubKey2: tx.newSigningPubKey2 ? tx.newSigningPubKey2.toString('hex') : undefined,
});
exports.coreAccountTxToJson = coreAccountTxToJson;
const coreAccountTxFromJson = (json) => new CoreAccountTx(tx_id_1.TxId.fromString(json.txId), account_id_1.AccountId.fromString(json.userId), account_id_1.AliasHash.fromString(json.aliasHash), json.newSigningPubKey1 ? Buffer.from(json.newSigningPubKey1, 'hex') : undefined, json.newSigningPubKey2 ? Buffer.from(json.newSigningPubKey2, 'hex') : undefined, json.migrated, json.txRefNo, json.created, json.settled);
exports.coreAccountTxFromJson = coreAccountTxFromJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZV9hY2NvdW50X3R4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmVfdHgvY29yZV9hY2NvdW50X3R4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtEQUFzRTtBQUN0RSxxRUFBNEQ7QUFDNUQscURBQWlEO0FBRWpELE1BQWEsYUFBYTtJQUd4QixZQUNrQixJQUFVLEVBQ1YsTUFBaUIsRUFDakIsU0FBb0IsRUFDcEIsaUJBQXFDLEVBQ3JDLGlCQUFxQyxFQUNyQyxRQUFpQixFQUNqQixPQUFlLEVBQ2YsT0FBYSxFQUNiLE9BQWM7UUFSZCxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixjQUFTLEdBQVQsU0FBUyxDQUFXO1FBQ3BCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBb0I7UUFDckMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFvQjtRQUNyQyxhQUFRLEdBQVIsUUFBUSxDQUFTO1FBQ2pCLFlBQU8sR0FBUCxPQUFPLENBQVE7UUFDZixZQUFPLEdBQVAsT0FBTyxDQUFNO1FBQ2IsWUFBTyxHQUFQLE9BQU8sQ0FBTztRQVhoQixZQUFPLEdBQUcsdUJBQU8sQ0FBQyxPQUFPLENBQUM7SUFZdkMsQ0FBQztDQUNMO0FBZEQsc0NBY0M7QUFlTSxNQUFNLG1CQUFtQixHQUFHLENBQUMsRUFBaUIsRUFBcUIsRUFBRSxDQUFDLENBQUM7SUFDNUUsR0FBRyxFQUFFO0lBQ0wsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO0lBQ3hCLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtJQUM1QixTQUFTLEVBQUUsRUFBRSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7SUFDbEMsaUJBQWlCLEVBQUUsRUFBRSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0lBQzFGLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztDQUMzRixDQUFDLENBQUM7QUFQVSxRQUFBLG1CQUFtQix1QkFPN0I7QUFFSSxNQUFNLHFCQUFxQixHQUFHLENBQUMsSUFBdUIsRUFBRSxFQUFFLENBQy9ELElBQUksYUFBYSxDQUNmLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUMxQixzQkFBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQ2pDLHNCQUFTLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFDcEMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUMvRSxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQy9FLElBQUksQ0FBQyxRQUFRLEVBQ2IsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxPQUFPLENBQ2IsQ0FBQztBQVhTLFFBQUEscUJBQXFCLHlCQVc5QiJ9