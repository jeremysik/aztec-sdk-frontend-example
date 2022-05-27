"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCorePaymentTxForRecipient = exports.corePaymentTxFromJson = exports.corePaymentTxToJson = exports.CorePaymentTx = void 0;
const account_id_1 = require("@aztec/barretenberg/account_id");
const address_1 = require("@aztec/barretenberg/address");
const tx_id_1 = require("@aztec/barretenberg/tx_id");
/**
 * Comprises data which will be stored in the user's db.
 * Note: we must be able to restore output notes (etc.) without relying on the db
 * (since local browser data might be cleared, or the user might login from other devices),
 * so crucial data which enables such restoration must not be solely stored here;
 * it must also be contained in either the viewingKey or the offchainTxData.
 */
class CorePaymentTx {
    constructor(txId, userId, proofId, assetId, publicValue, publicOwner, privateInput, recipientPrivateOutput, senderPrivateOutput, isRecipient, isSender, txRefNo, created, settled) {
        this.txId = txId;
        this.userId = userId;
        this.proofId = proofId;
        this.assetId = assetId;
        this.publicValue = publicValue;
        this.publicOwner = publicOwner;
        this.privateInput = privateInput;
        this.recipientPrivateOutput = recipientPrivateOutput;
        this.senderPrivateOutput = senderPrivateOutput;
        this.isRecipient = isRecipient;
        this.isSender = isSender;
        this.txRefNo = txRefNo;
        this.created = created;
        this.settled = settled;
    }
}
exports.CorePaymentTx = CorePaymentTx;
const corePaymentTxToJson = (tx) => ({
    ...tx,
    txId: tx.txId.toString(),
    userId: tx.userId.toString(),
    publicValue: tx.publicValue.toString(),
    publicOwner: tx.publicOwner ? tx.publicOwner.toString() : undefined,
    privateInput: tx.privateInput.toString(),
    recipientPrivateOutput: tx.recipientPrivateOutput.toString(),
    senderPrivateOutput: tx.senderPrivateOutput.toString(),
});
exports.corePaymentTxToJson = corePaymentTxToJson;
const corePaymentTxFromJson = (json) => new CorePaymentTx(tx_id_1.TxId.fromString(json.txId), account_id_1.AccountId.fromString(json.userId), json.proofId, json.assetId, BigInt(json.publicValue), json.publicOwner ? address_1.EthAddress.fromString(json.publicOwner) : undefined, BigInt(json.privateInput), BigInt(json.recipientPrivateOutput), BigInt(json.senderPrivateOutput), json.isRecipient, json.isSender, json.txRefNo, json.created, json.settled);
exports.corePaymentTxFromJson = corePaymentTxFromJson;
const createCorePaymentTxForRecipient = ({ txId, userId, proofId, assetId, publicValue, publicOwner, privateInput, recipientPrivateOutput, senderPrivateOutput, txRefNo, created, settled, }, recipient) => new CorePaymentTx(txId, recipient, proofId, assetId, publicValue, publicOwner, privateInput, recipientPrivateOutput, senderPrivateOutput, true, recipient.equals(userId), txRefNo, created, settled);
exports.createCorePaymentTxForRecipient = createCorePaymentTxForRecipient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZV9wYXltZW50X3R4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmVfdHgvY29yZV9wYXltZW50X3R4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtEQUEyRDtBQUMzRCx5REFBeUQ7QUFFekQscURBQWlEO0FBSWpEOzs7Ozs7R0FNRztBQUNILE1BQWEsYUFBYTtJQUN4QixZQUNrQixJQUFVLEVBQ1YsTUFBaUIsRUFDakIsT0FBdUIsRUFDdkIsT0FBZSxFQUNmLFdBQW1CLEVBQ25CLFdBQW1DLEVBQ25DLFlBQW9CLEVBQ3BCLHNCQUE4QixFQUM5QixtQkFBMkIsRUFDM0IsV0FBb0IsRUFDcEIsUUFBaUIsRUFDakIsT0FBZSxFQUNmLE9BQWEsRUFDYixPQUFjO1FBYmQsU0FBSSxHQUFKLElBQUksQ0FBTTtRQUNWLFdBQU0sR0FBTixNQUFNLENBQVc7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBZ0I7UUFDdkIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLGdCQUFXLEdBQVgsV0FBVyxDQUFRO1FBQ25CLGdCQUFXLEdBQVgsV0FBVyxDQUF3QjtRQUNuQyxpQkFBWSxHQUFaLFlBQVksQ0FBUTtRQUNwQiwyQkFBc0IsR0FBdEIsc0JBQXNCLENBQVE7UUFDOUIsd0JBQW1CLEdBQW5CLG1CQUFtQixDQUFRO1FBQzNCLGdCQUFXLEdBQVgsV0FBVyxDQUFTO1FBQ3BCLGFBQVEsR0FBUixRQUFRLENBQVM7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFlBQU8sR0FBUCxPQUFPLENBQU07UUFDYixZQUFPLEdBQVAsT0FBTyxDQUFPO0lBQzdCLENBQUM7Q0FDTDtBQWpCRCxzQ0FpQkM7QUFtQk0sTUFBTSxtQkFBbUIsR0FBRyxDQUFDLEVBQWlCLEVBQXFCLEVBQUUsQ0FBQyxDQUFDO0lBQzVFLEdBQUcsRUFBRTtJQUNMLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtJQUN4QixNQUFNLEVBQUUsRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUU7SUFDNUIsV0FBVyxFQUFFLEVBQUUsQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO0lBQ3RDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTO0lBQ25FLFlBQVksRUFBRSxFQUFFLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRTtJQUN4QyxzQkFBc0IsRUFBRSxFQUFFLENBQUMsc0JBQXNCLENBQUMsUUFBUSxFQUFFO0lBQzVELG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUU7Q0FDdkQsQ0FBQyxDQUFDO0FBVFUsUUFBQSxtQkFBbUIsdUJBUzdCO0FBRUksTUFBTSxxQkFBcUIsR0FBRyxDQUFDLElBQXVCLEVBQUUsRUFBRSxDQUMvRCxJQUFJLGFBQWEsQ0FDZixZQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFDMUIsc0JBQVMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUNqQyxJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxPQUFPLEVBQ1osTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFDeEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsb0JBQVUsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQ3RFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLEVBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsRUFDbkMsTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxFQUNoQyxJQUFJLENBQUMsV0FBVyxFQUNoQixJQUFJLENBQUMsUUFBUSxFQUNiLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsT0FBTyxDQUNiLENBQUM7QUFoQlMsUUFBQSxxQkFBcUIseUJBZ0I5QjtBQUVHLE1BQU0sK0JBQStCLEdBQUcsQ0FDN0MsRUFDRSxJQUFJLEVBQ0osTUFBTSxFQUNOLE9BQU8sRUFDUCxPQUFPLEVBQ1AsV0FBVyxFQUNYLFdBQVcsRUFDWCxZQUFZLEVBQ1osc0JBQXNCLEVBQ3RCLG1CQUFtQixFQUNuQixPQUFPLEVBQ1AsT0FBTyxFQUNQLE9BQU8sR0FDTyxFQUNoQixTQUFvQixFQUNwQixFQUFFLENBQ0YsSUFBSSxhQUFhLENBQ2YsSUFBSSxFQUNKLFNBQVMsRUFDVCxPQUFPLEVBQ1AsT0FBTyxFQUNQLFdBQVcsRUFDWCxXQUFXLEVBQ1gsWUFBWSxFQUNaLHNCQUFzQixFQUN0QixtQkFBbUIsRUFDbkIsSUFBSSxFQUNKLFNBQVMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQ3hCLE9BQU8sRUFDUCxPQUFPLEVBQ1AsT0FBTyxDQUNSLENBQUM7QUFoQ1MsUUFBQSwrQkFBK0IsbUNBZ0N4QyJ9