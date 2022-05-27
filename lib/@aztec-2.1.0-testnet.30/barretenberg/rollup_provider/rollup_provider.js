"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinSplitTxFromJson = exports.joinSplitTxToJson = exports.accountTxFromJson = exports.accountTxToJson = exports.pendingTxFromJson = exports.pendingTxToJson = exports.txFromJson = exports.txToJson = exports.DefiSettlementTime = exports.TxSettlementTime = void 0;
const client_proofs_1 = require("../client_proofs");
const offchain_tx_data_1 = require("../offchain_tx_data");
const tx_id_1 = require("../tx_id");
var TxSettlementTime;
(function (TxSettlementTime) {
    TxSettlementTime[TxSettlementTime["NEXT_ROLLUP"] = 0] = "NEXT_ROLLUP";
    TxSettlementTime[TxSettlementTime["INSTANT"] = 1] = "INSTANT";
})(TxSettlementTime = exports.TxSettlementTime || (exports.TxSettlementTime = {}));
var DefiSettlementTime;
(function (DefiSettlementTime) {
    DefiSettlementTime[DefiSettlementTime["DEADLINE"] = 0] = "DEADLINE";
    DefiSettlementTime[DefiSettlementTime["NEXT_ROLLUP"] = 1] = "NEXT_ROLLUP";
    DefiSettlementTime[DefiSettlementTime["INSTANT"] = 2] = "INSTANT";
})(DefiSettlementTime = exports.DefiSettlementTime || (exports.DefiSettlementTime = {}));
const txToJson = ({ proofData, offchainTxData, depositSignature }) => ({
    proofData: proofData.toString('hex'),
    offchainTxData: offchainTxData.toString('hex'),
    depositSignature: depositSignature ? depositSignature.toString('hex') : undefined,
});
exports.txToJson = txToJson;
const txFromJson = ({ proofData, offchainTxData, depositSignature }) => ({
    proofData: Buffer.from(proofData, 'hex'),
    offchainTxData: Buffer.from(offchainTxData, 'hex'),
    depositSignature: depositSignature ? Buffer.from(depositSignature, 'hex') : undefined,
});
exports.txFromJson = txFromJson;
const pendingTxToJson = ({ txId, noteCommitment1, noteCommitment2 }) => ({
    txId: txId.toString(),
    noteCommitment1: noteCommitment1.toString('hex'),
    noteCommitment2: noteCommitment2.toString('hex'),
});
exports.pendingTxToJson = pendingTxToJson;
const pendingTxFromJson = ({ txId, noteCommitment1, noteCommitment2 }) => ({
    txId: tx_id_1.TxId.fromString(txId),
    noteCommitment1: Buffer.from(noteCommitment1, 'hex'),
    noteCommitment2: Buffer.from(noteCommitment2, 'hex'),
});
exports.pendingTxFromJson = pendingTxFromJson;
const accountTxToJson = ({ proofData, offchainTxData }) => ({
    proofData: proofData.proofData.rawProofData.toString('hex'),
    offchainTxData: offchainTxData.toBuffer().toString('hex'),
});
exports.accountTxToJson = accountTxToJson;
const accountTxFromJson = ({ proofData, offchainTxData }) => ({
    proofData: client_proofs_1.AccountProofData.fromBuffer(Buffer.from(proofData, 'hex')),
    offchainTxData: offchain_tx_data_1.OffchainAccountData.fromBuffer(Buffer.from(offchainTxData, 'hex')),
});
exports.accountTxFromJson = accountTxFromJson;
const joinSplitTxToJson = ({ proofData, offchainTxData }) => ({
    proofData: proofData.proofData.rawProofData.toString('hex'),
    offchainTxData: offchainTxData.toBuffer().toString('hex'),
});
exports.joinSplitTxToJson = joinSplitTxToJson;
const joinSplitTxFromJson = ({ proofData, offchainTxData }) => ({
    proofData: client_proofs_1.JoinSplitProofData.fromBuffer(Buffer.from(proofData, 'hex')),
    offchainTxData: offchain_tx_data_1.OffchainJoinSplitData.fromBuffer(Buffer.from(offchainTxData, 'hex')),
});
exports.joinSplitTxFromJson = joinSplitTxFromJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9sbHVwX3Byb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3JvbGx1cF9wcm92aWRlci9yb2xsdXBfcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBS0Esb0RBQXdFO0FBQ3hFLDBEQUFpRjtBQUNqRixvQ0FBZ0M7QUFHaEMsSUFBWSxnQkFHWDtBQUhELFdBQVksZ0JBQWdCO0lBQzFCLHFFQUFXLENBQUE7SUFDWCw2REFBTyxDQUFBO0FBQ1QsQ0FBQyxFQUhXLGdCQUFnQixHQUFoQix3QkFBZ0IsS0FBaEIsd0JBQWdCLFFBRzNCO0FBRUQsSUFBWSxrQkFJWDtBQUpELFdBQVksa0JBQWtCO0lBQzVCLG1FQUFRLENBQUE7SUFDUix5RUFBVyxDQUFBO0lBQ1gsaUVBQU8sQ0FBQTtBQUNULENBQUMsRUFKVyxrQkFBa0IsR0FBbEIsMEJBQWtCLEtBQWxCLDBCQUFrQixRQUk3QjtBQWNNLE1BQU0sUUFBUSxHQUFHLENBQUMsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFNLEVBQVUsRUFBRSxDQUFDLENBQUM7SUFDeEYsU0FBUyxFQUFFLFNBQVMsQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO0lBQ3BDLGNBQWMsRUFBRSxjQUFjLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQztJQUM5QyxnQkFBZ0IsRUFBRSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTO0NBQ2xGLENBQUMsQ0FBQztBQUpVLFFBQUEsUUFBUSxZQUlsQjtBQUVJLE1BQU0sVUFBVSxHQUFHLENBQUMsRUFBRSxTQUFTLEVBQUUsY0FBYyxFQUFFLGdCQUFnQixFQUFVLEVBQU0sRUFBRSxDQUFDLENBQUM7SUFDMUYsU0FBUyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQztJQUN4QyxjQUFjLEVBQUUsTUFBTSxD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