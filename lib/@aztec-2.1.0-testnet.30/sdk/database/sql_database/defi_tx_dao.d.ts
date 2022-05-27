/// <reference types="node" />
import { AccountId } from '@aztec/barretenberg/account_id';
import { BridgeId } from '@aztec/barretenberg/bridge_id';
import { TxId } from '@aztec/barretenberg/tx_id';
export declare class DefiTxDao {
    txId: TxId;
    userId: AccountId;
    bridgeId: BridgeId;
    depositValue: bigint;
    txFee: bigint;
    partialStateSecret: Buffer;
    txRefNo: number;
    created: Date;
    settled?: Date;
    interactionNonce?: number;
    isAsync?: boolean;
    success?: boolean;
    outputValueA?: bigint;
    outputValueB?: bigint;
    finalised?: Date;
    claimSettled?: Date;
    claimTxId?: TxId;
    afterLoad(): void;
}
//# sourceMappingURL=defi_tx_dao.d.ts.map