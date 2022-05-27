"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.proofOutputFromJson = exports.proofOutputToJson = void 0;
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
const offchain_tx_data_1 = require("@aztec/barretenberg/offchain_tx_data");
const core_tx_1 = require("../core_tx");
const note_1 = require("../note");
const proofOutputToJson = ({ tx, proofData, offchainTxData, outputNotes, signature, }) => ({
    tx: (0, core_tx_1.coreUserTxToJson)(tx),
    proofData: new Uint8Array(proofData.rawProofData),
    offchainTxData: new Uint8Array(offchainTxData.toBuffer()),
    outputNotes: outputNotes.map(n => (0, note_1.noteToJson)(n)),
    signature: signature ? new Uint8Array(signature) : undefined,
});
exports.proofOutputToJson = proofOutputToJson;
const offchainTxDataFromBuffer = (proofId, buf) => {
    switch (proofId) {
        case client_proofs_1.ProofId.DEPOSIT:
        case client_proofs_1.ProofId.WITHDRAW:
        case client_proofs_1.ProofId.SEND:
            return offchain_tx_data_1.OffchainJoinSplitData.fromBuffer(buf);
        case client_proofs_1.ProofId.ACCOUNT:
            return offchain_tx_data_1.OffchainAccountData.fromBuffer(buf);
        case client_proofs_1.ProofId.DEFI_DEPOSIT:
            return offchain_tx_data_1.OffchainDefiDepositData.fromBuffer(buf);
        default:
            throw new Error(`Unsupported ProofOutput proofId: ${proofId}`);
    }
};
const proofOutputFromJson = ({ tx, proofData, offchainTxData, outputNotes, signature, }) => ({
    tx: (0, core_tx_1.coreUserTxFromJson)(tx),
    proofData: new client_proofs_1.ProofData(Buffer.from(proofData)),
    offchainTxData: offchainTxDataFromBuffer(tx.proofId, Buffer.from(offchainTxData)),
    outputNotes: outputNotes.map(n => (0, note_1.noteFromJson)(n)),
    signature: signature ? Buffer.from(signature) : undefined,
});
exports.proofOutputFromJson = proofOutputFromJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvb2Zfb3V0cHV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb29mcy9wcm9vZl9vdXRwdXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEscUVBQXVFO0FBQ3ZFLDJFQUk4QztBQUM5Qyx3Q0FTb0I7QUFDcEIsa0NBQW1FO0FBa0I1RCxNQUFNLGlCQUFpQixHQUFHLENBQUMsRUFDaEMsRUFBRSxFQUNGLFNBQVMsRUFDVCxjQUFjLEVBQ2QsV0FBVyxFQUNYLFNBQVMsR0FDRyxFQUFtQixFQUFFLENBQUMsQ0FBQztJQUNuQyxFQUFFLEVBQUUsSUFBQSwwQkFBZ0IsRUFBQyxFQUFFLENBQUM7SUFDeEIsU0FBUyxFQUFFLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUM7SUFDakQsY0FBYyxFQUFFLElBQUksVUFBVSxDQUFDLGNBQWMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUN6RCxXQUFXLEVBQUUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUEsaUJBQVUsRUFBQyxDQUFDLENBQUMsQ0FBQztJQUNoRCxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztDQUM3RCxDQUFDLENBQUM7QUFaVSxRQUFBLGlCQUFpQixxQkFZM0I7QUFFSCxNQUFNLHdCQUF3QixHQUFHLENBQUMsT0FBZ0IsRUFBRSxHQUFXLEVBQUUsRUFBRTtJQUNqRSxRQUFRLE9BQU8sRUFBRTtRQUNmLEtBQUssdUJBQU8sQ0FBQyxPQUFPLENBQUM7UUFDckIsS0FBSyx1QkFBTyxDQUFDLFFBQVEsQ0FBQztRQUN0QixLQUFLLHVCQUFPLENBQUMsSUFBSTtZQUNmLE9BQU8sd0NBQXFCLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQy9DLEtBQUssdUJBQU8sQ0FBQyxPQUFPO1lBQ2xCLE9BQU8sc0NBQW1CLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLEtBQUssdUJBQU8sQ0FBQyxZQUFZO1lBQ3ZCLE9BQU8sMENBQXVCLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2pEO1lBQ0UsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsT0FBTyxFQUFFLENBQUMsQ0FBQztLQUNsRTtBQUNILENBQUMsQ0FBQztBQUVLLE1BQU0sbUJBQW1CLEdBQUcsQ0FBQyxFQUNsQyxFQUFFLEVBQ0YsU0FBUyxFQUNULGNBQWMsRUFDZCxXQUFXLEVBQ1gsU0FBUyxHQUNPLEVBQWUsRUFBRSxDQUFDLENBQUM7SUFDbkMsRUFBRSxFQUFFLElBQUEsNEJBQWtCLEVBQUMsRUFBRSxDQUFDO0lBQzFCLFNBQVMsRUFBRSxJQUFJLHlCQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxjQUFjLEVBQUUsd0JBQXdCLENBQUMsRUFBRSxDQUFDLE9BQU8sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ2pGLFdBQVcsRUFBRSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBQSxtQkFBWSxFQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2xELFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVM7Q0FDMUQsQ0FBQyxDQUFDO0FBWlUsUUFBQSxtQkFBbUIsdUJBWTdCIn0=