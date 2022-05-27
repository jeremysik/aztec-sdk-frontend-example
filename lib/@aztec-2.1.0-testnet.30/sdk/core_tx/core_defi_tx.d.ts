/// <reference types="node" />
import { AccountId } from '@aztec/barretenberg/account_id';
import { BridgeId } from '@aztec/barretenberg/bridge_id';
import { ProofId } from '@aztec/barretenberg/client_proofs';
import { TxId } from '@aztec/barretenberg/tx_id';
export declare class CoreDefiTx {
    readonly txId: TxId;
    readonly userId: AccountId;
    readonly bridgeId: BridgeId;
    readonly depositValue: bigint;
    readonly txFee: bigint;
    readonly partialStateSecret: Buffer;
    readonly txRefNo: number;
    readonly created: Date;
    readonly settled?: Date | undefined;
    readonly interactionNonce?: number | undefined;
    readonly isAsync?: boolean | undefined;
    readonly success?: boolean | undefined;
    readonly outputValueA?: bigint | undefined;
    readonly outputValueB?: bigint | undefined;
    readonly finalised?: Date | undefined;
    readonly claimSettled?: Date | undefined;
    readonly claimTxId?: TxId | undefined;
    readonly proofId = ProofId.DEFI_DEPOSIT;
    constructor(txId: TxId, userId: AccountId, bridgeId: BridgeId, depositValue: bigint, txFee: bigint, partialStateSecret: Buffer, txRefNo: number, created: Date, settled?: Date | undefined, interactionNonce?: number | undefined, isAsync?: boolean | undefined, success?: boolean | undefined, outputValueA?: bigint | undefined, outputValueB?: bigint | undefined, finalised?: Date | undefined, claimSettled?: Date | undefined, claimTxId?: TxId | undefined);
}
export interface CoreDefiTxJson {
    proofId: number;
    txId: string;
    userId: string;
    bridgeId: string;
    depositValue: string;
    txFee: string;
    partialStateSecret: string;
    txRefNo: number;
    created: Date;
    settled?: Date;
    interactionNonce?: number;
    isAsync?: boolean;
    success?: boolean;
    outputValueA?: string;
    outputValueB?: string;
    finalised?: Date;
    claimSettled?: Date;
    claimTxId?: string;
}
export declare const coreDefiTxToJson: (tx: CoreDefiTx) => CoreDefiTxJson;
export declare const coreDefiTxFromJson: (json: CoreDefiTxJson) => CoreDefiTx;
//# sourceMappingURL=core_defi_tx.d.ts.map