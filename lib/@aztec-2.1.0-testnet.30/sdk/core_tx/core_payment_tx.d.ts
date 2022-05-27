import { AccountId } from '@aztec/barretenberg/account_id';
import { EthAddress } from '@aztec/barretenberg/address';
import { ProofId } from '@aztec/barretenberg/client_proofs';
import { TxId } from '@aztec/barretenberg/tx_id';
export declare type PaymentProofId = ProofId.DEPOSIT | ProofId.WITHDRAW | ProofId.SEND;
/**
 * Comprises data which will be stored in the user's db.
 * Note: we must be able to restore output notes (etc.) without relying on the db
 * (since local browser data might be cleared, or the user might login from other devices),
 * so crucial data which enables such restoration must not be solely stored here;
 * it must also be contained in either the viewingKey or the offchainTxData.
 */
export declare class CorePaymentTx {
    readonly txId: TxId;
    readonly userId: AccountId;
    readonly proofId: PaymentProofId;
    readonly assetId: number;
    readonly publicValue: bigint;
    readonly publicOwner: EthAddress | undefined;
    readonly privateInput: bigint;
    readonly recipientPrivateOutput: bigint;
    readonly senderPrivateOutput: bigint;
    readonly isRecipient: boolean;
    readonly isSender: boolean;
    readonly txRefNo: number;
    readonly created: Date;
    readonly settled?: Date | undefined;
    constructor(txId: TxId, userId: AccountId, proofId: PaymentProofId, assetId: number, publicValue: bigint, publicOwner: EthAddress | undefined, privateInput: bigint, recipientPrivateOutput: bigint, senderPrivateOutput: bigint, isRecipient: boolean, isSender: boolean, txRefNo: number, created: Date, settled?: Date | undefined);
}
export interface CorePaymentTxJson {
    txId: string;
    userId: string;
    proofId: PaymentProofId;
    assetId: number;
    publicValue: string;
    publicOwner: string | undefined;
    privateInput: string;
    recipientPrivateOutput: string;
    senderPrivateOutput: string;
    isRecipient: boolean;
    isSender: boolean;
    txRefNo: number;
    created: Date;
    settled?: Date;
}
export declare const corePaymentTxToJson: (tx: CorePaymentTx) => CorePaymentTxJson;
export declare const corePaymentTxFromJson: (json: CorePaymentTxJson) => CorePaymentTx;
export declare const createCorePaymentTxForRecipient: ({ txId, userId, proofId, assetId, publicValue, publicOwner, privateInput, recipientPrivateOutput, senderPrivateOutput, txRefNo, created, settled, }: CorePaymentTx, recipient: AccountId) => CorePaymentTx;
//# sourceMappingURL=core_payment_tx.d.ts.map