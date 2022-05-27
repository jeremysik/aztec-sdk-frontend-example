"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreDefiTxFromJson = exports.coreDefiTxToJson = exports.CoreDefiTx = void 0;
const account_id_1 = require("@aztec/barretenberg/account_id");
const bridge_id_1 = require("@aztec/barretenberg/bridge_id");
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
const tx_id_1 = require("@aztec/barretenberg/tx_id");
class CoreDefiTx {
    constructor(txId, userId, bridgeId, depositValue, txFee, partialStateSecret, txRefNo, created, settled, interactionNonce, isAsync, success, outputValueA, outputValueB, finalised, claimSettled, claimTxId) {
        this.txId = txId;
        this.userId = userId;
        this.bridgeId = bridgeId;
        this.depositValue = depositValue;
        this.txFee = txFee;
        this.partialStateSecret = partialStateSecret;
        this.txRefNo = txRefNo;
        this.created = created;
        this.settled = settled;
        this.interactionNonce = interactionNonce;
        this.isAsync = isAsync;
        this.success = success;
        this.outputValueA = outputValueA;
        this.outputValueB = outputValueB;
        this.finalised = finalised;
        this.claimSettled = claimSettled;
        this.claimTxId = claimTxId;
        this.proofId = client_proofs_1.ProofId.DEFI_DEPOSIT;
    }
}
exports.CoreDefiTx = CoreDefiTx;
const coreDefiTxToJson = (tx) => {
    var _a, _b, _c;
    return ({
        ...tx,
        txId: tx.txId.toString(),
        userId: tx.userId.toString(),
        bridgeId: tx.bridgeId.toString(),
        depositValue: tx.depositValue.toString(),
        txFee: tx.txFee.toString(),
        partialStateSecret: tx.partialStateSecret.toString('hex'),
        outputValueA: (_a = tx.outputValueA) === null || _a === void 0 ? void 0 : _a.toString(),
        outputValueB: (_b = tx.outputValueB) === null || _b === void 0 ? void 0 : _b.toString(),
        claimTxId: (_c = tx.claimTxId) === null || _c === void 0 ? void 0 : _c.toString(),
    });
};
exports.coreDefiTxToJson = coreDefiTxToJson;
const coreDefiTxFromJson = (json) => new CoreDefiTx(tx_id_1.TxId.fromString(json.txId), account_id_1.AccountId.fromString(json.userId), bridge_id_1.BridgeId.fromString(json.bridgeId), BigInt(json.depositValue), BigInt(json.txFee), Buffer.from(json.partialStateSecret, 'hex'), json.txRefNo, json.created, json.settled, json.interactionNonce, json.isAsync, json.success, json.outputValueA ? BigInt(json.outputValueA) : undefined, json.outputValueB ? BigInt(json.outputValueB) : undefined, json.finalised, json.claimSettled, json.claimTxId ? tx_id_1.TxId.fromString(json.claimTxId) : undefined);
exports.coreDefiTxFromJson = coreDefiTxFromJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29yZV9kZWZpX3R4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmVfdHgvY29yZV9kZWZpX3R4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtEQUEyRDtBQUMzRCw2REFBeUQ7QUFDekQscUVBQTREO0FBQzVELHFEQUFpRDtBQUVqRCxNQUFhLFVBQVU7SUFHckIsWUFDa0IsSUFBVSxFQUNWLE1BQWlCLEVBQ2pCLFFBQWtCLEVBQ2xCLFlBQW9CLEVBQ3BCLEtBQWEsRUFDYixrQkFBMEIsRUFDMUIsT0FBZSxFQUNmLE9BQWEsRUFDYixPQUFjLEVBQ2QsZ0JBQXlCLEVBQ3pCLE9BQWlCLEVBQ2pCLE9BQWlCLEVBQ2pCLFlBQXFCLEVBQ3JCLFlBQXFCLEVBQ3JCLFNBQWdCLEVBQ2hCLFlBQW1CLEVBQ25CLFNBQWdCO1FBaEJoQixTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGlCQUFZLEdBQVosWUFBWSxDQUFRO1FBQ3BCLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYix1QkFBa0IsR0FBbEIsa0JBQWtCLENBQVE7UUFDMUIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFlBQU8sR0FBUCxPQUFPLENBQU07UUFDYixZQUFPLEdBQVAsT0FBTyxDQUFPO1FBQ2QscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFTO1FBQ3pCLFlBQU8sR0FBUCxPQUFPLENBQVU7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBVTtRQUNqQixpQkFBWSxHQUFaLFlBQVksQ0FBUztRQUNyQixpQkFBWSxHQUFaLFlBQVksQ0FBUztRQUNyQixjQUFTLEdBQVQsU0FBUyxDQUFPO1FBQ2hCLGlCQUFZLEdBQVosWUFBWSxDQUFPO1FBQ25CLGNBQVMsR0FBVCxTQUFTLENBQU87UUFuQmxCLFlBQU8sR0FBRyx1QkFBTyxDQUFDLFlBQVksQ0FBQztJQW9CNUMsQ0FBQztDQUNMO0FBdEJELGdDQXNCQztBQXVCTSxNQUFNLGdCQUFnQixHQUFHLENBQUMsRUFBYyxFQUFrQixFQUFFOztJQUFDLE9BQUEsQ0FBQztRQUNuRSxHQUFHLEVBQUU7UUFDTCxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7UUFDeEIsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQzVCLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxDQUFDLFFBQVEsRUFBRTtRQUNoQyxZQUFZLEVBQUUsRUFBRSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUU7UUFDeEMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFO1FBQzFCLGtCQUFrQixFQUFFLEVBQUUsQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ3pELFlBQVksRUFBRSxNQUFBLEVBQUUsQ0FBQyxZQUFZLDBDQUFFLFFBQVEsRUFBRTtRQUN6QyxZQUFZLEVBQUUsTUFBQSxFQUFFLENBQUMsWUFBWSwwQ0FBRSxRQUFRLEVBQUU7UUFDekMsU0FBUyxFQUFFLE1BQUEsRUFBRSxDQUFDLFNBQVMsMENBQUUsUUFBUSxFQUFFO0tBQ3BDLENBQUMsQ0FBQTtDQUFBLENBQUM7QUFYVSxRQUFBLGdCQUFnQixvQkFXMUI7QUFFSSxNQUFNLGtCQUFrQixHQUFHLENBQUMsSUFBb0IsRUFBRSxFQUFFLENBQ3pELElBQUksVUFBVSxDQUNaLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUMxQixzQkFBUyxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQ2pDLG9CQUFRLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsRUFDbEMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFDekIsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFDbEIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLEVBQzNDLElBQUksQ0FBQyxPQUFPLEVBQ1osSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxnQkFBZ0IsRUFDckIsSUFBSSxDQUFDLE9BQU8sRUFDWixJQUFJLENBQUMsT0FBTyxFQUNaLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFDekQsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxFQUN6RCxJQUFJLENBQUMsU0FBUyxFQUNkLElBQUksQ0FBQyxZQUFZLEVBQ2pCLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQzdELENBQUM7QUFuQlMsUUFBQSxrQkFBa0Isc0JBbUIzQiJ9