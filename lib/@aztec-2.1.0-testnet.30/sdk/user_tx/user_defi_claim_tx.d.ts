import { AccountId } from '@aztec/barretenberg/account_id';
import { AssetValue } from '@aztec/barretenberg/asset';
import { BridgeId } from '@aztec/barretenberg/bridge_id';
import { ProofId } from '@aztec/barretenberg/client_proofs';
import { TxId } from '@aztec/barretenberg/tx_id';
export declare class UserDefiClaimTx {
    readonly txId: TxId | undefined;
    readonly defiTxId: TxId;
    readonly userId: AccountId;
    readonly bridgeId: BridgeId;
    readonly depositValue: AssetValue;
    readonly success: boolean;
    readonly outputValueA: AssetValue;
    readonly outputValueB: AssetValue | undefined;
    readonly settled?: Date | undefined;
    readonly proofId = ProofId.DEFI_CLAIM;
    constructor(txId: TxId | undefined, defiTxId: TxId, userId: AccountId, bridgeId: BridgeId, depositValue: AssetValue, success: boolean, outputValueA: AssetValue, outputValueB: AssetValue | undefined, settled?: Date | undefined);
}
//# sourceMappingURL=user_defi_claim_tx.d.ts.map