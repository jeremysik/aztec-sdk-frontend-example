/// <reference types="node" />
import { AccountId } from '@aztec/barretenberg/account_id';
import { TxId } from '@aztec/barretenberg/tx_id';
export interface CoreClaimTx {
    defiTxId: TxId;
    userId: AccountId;
    secret: Buffer;
    nullifier: Buffer;
    interactionNonce: number;
}
//# sourceMappingURL=core_claim_tx.d.ts.map