import { AccountId } from '@aztec/barretenberg/account_id';
import { AssetValue } from '@aztec/barretenberg/asset';
import { BridgeId } from '@aztec/barretenberg/bridge_id';
import { ProofId } from '@aztec/barretenberg/client_proofs';
import { TxId } from '@aztec/barretenberg/tx_id';
export declare enum UserDefiInteractionResultState {
    PENDING = "PENDING",
    AWAITING_FINALISATION = "AWAITING_FINALISATION",
    AWAITING_SETTLEMENT = "AWAITING_SETTLEMENT",
    SETTLED = "SETTLED"
}
export interface UserDefiInteractionResult {
    state: UserDefiInteractionResultState;
    isAsync?: boolean;
    interactionNonce?: number;
    success?: boolean;
    outputValueA?: AssetValue;
    outputValueB?: AssetValue;
    claimSettled?: Date;
    finalised?: Date;
}
export declare class UserDefiTx {
    readonly txId: TxId;
    readonly userId: AccountId;
    readonly bridgeId: BridgeId;
    readonly depositValue: AssetValue;
    readonly fee: AssetValue;
    readonly created: Date;
    readonly settled: Date | undefined;
    readonly interactionResult: UserDefiInteractionResult;
    readonly proofId = ProofId.DEFI_DEPOSIT;
    constructor(txId: TxId, userId: AccountId, bridgeId: BridgeId, depositValue: AssetValue, fee: AssetValue, created: Date, settled: Date | undefined, interactionResult: UserDefiInteractionResult);
}
//# sourceMappingURL=user_defi_tx.d.ts.map