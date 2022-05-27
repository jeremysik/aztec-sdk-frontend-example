/// <reference types="node" />
import { AccountId } from '@aztec/barretenberg/account_id';
import { TxId } from '@aztec/barretenberg/tx_id';
import { CoreClaimTx } from '../../core_tx';
export declare class ClaimTxDao implements CoreClaimTx {
    nullifier: Buffer;
    defiTxId: TxId;
    userId: AccountId;
    secret: Buffer;
    interactionNonce: number;
}
//# sourceMappingURL=claim_tx_dao.d.ts.map