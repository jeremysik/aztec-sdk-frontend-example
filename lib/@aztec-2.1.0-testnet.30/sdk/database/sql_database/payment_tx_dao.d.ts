import { AccountId } from '@aztec/barretenberg/account_id';
import { EthAddress } from '@aztec/barretenberg/address';
import { TxId } from '@aztec/barretenberg/tx_id';
import { CorePaymentTx } from '../../core_tx';
export declare class PaymentTxDao implements CorePaymentTx {
    txId: TxId;
    userId: AccountId;
    proofId: number;
    assetId: number;
    publicValue: bigint;
    publicOwner: EthAddress | undefined;
    privateInput: bigint;
    recipientPrivateOutput: bigint;
    senderPrivateOutput: bigint;
    isRecipient: boolean;
    isSender: boolean;
    txRefNo: number;
    created: Date;
    settled?: Date;
    afterLoad(): void;
}
//# sourceMappingURL=payment_tx_dao.d.ts.map