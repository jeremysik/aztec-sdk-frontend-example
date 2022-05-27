import { AccountId } from '@aztec/barretenberg/account_id';
import { EthAddress } from '@aztec/barretenberg/address';
import { AssetValue } from '@aztec/barretenberg/asset';
import { TxId } from '@aztec/barretenberg/tx_id';
import { CoreSdkInterface } from '../core_sdk';
import { Signer } from '../signer';
export declare class WithdrawController {
    readonly userId: AccountId;
    private readonly userSigner;
    readonly assetValue: AssetValue;
    readonly fee: AssetValue;
    readonly to: EthAddress;
    private readonly core;
    private proofOutput;
    private feeProofOutput?;
    private txId;
    constructor(userId: AccountId, userSigner: Signer, assetValue: AssetValue, fee: AssetValue, to: EthAddress, core: CoreSdkInterface);
    createProof(): Promise<void>;
    send(): Promise<TxId>;
    awaitSettlement(timeout?: number): Promise<void>;
}
//# sourceMappingURL=withdraw_controller.d.ts.map