import { AccountId } from '@aztec/barretenberg/account_id';
import { EthAddress } from '@aztec/barretenberg/address';
import { AssetValue } from '@aztec/barretenberg/asset';
import { ProofId } from '@aztec/barretenberg/client_proofs';
import { TxId } from '@aztec/barretenberg/tx_id';
export declare class UserPaymentTx {
    readonly txId: TxId;
    readonly userId: AccountId;
    readonly proofId: ProofId.DEPOSIT | ProofId.WITHDRAW | ProofId.SEND;
    readonly value: AssetValue;
    readonly fee: AssetValue;
    readonly publicOwner: EthAddress | undefined;
    readonly isSender: boolean;
    readonly created: Date;
    readonly settled?: Date | undefined;
    constructor(txId: TxId, userId: AccountId, proofId: ProofId.DEPOSIT | ProofId.WITHDRAW | ProofId.SEND, value: AssetValue, fee: AssetValue, publicOwner: EthAddress | undefined, isSender: boolean, created: Date, settled?: Date | undefined);
}
//# sourceMappingURL=user_payment_tx.d.ts.map