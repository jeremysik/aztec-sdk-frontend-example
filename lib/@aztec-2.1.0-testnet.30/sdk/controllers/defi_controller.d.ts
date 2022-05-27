import { AccountId } from '@aztec/barretenberg/account_id';
import { AssetValue } from '@aztec/barretenberg/asset';
import { BridgeId } from '@aztec/barretenberg/bridge_id';
import { TxId } from '@aztec/barretenberg/tx_id';
import { CoreSdkInterface } from '../core_sdk';
import { Signer } from '../signer';
export declare class DefiController {
    readonly userId: AccountId;
    private readonly userSigner;
    readonly bridgeId: BridgeId;
    readonly depositValue: AssetValue;
    readonly fee: AssetValue;
    private readonly core;
    private proofOutput?;
    private jsProofOutput?;
    private feeProofOutput?;
    private txId?;
    constructor(userId: AccountId, userSigner: Signer, bridgeId: BridgeId, depositValue: AssetValue, fee: AssetValue, core: CoreSdkInterface);
    createProof(): Promise<void>;
    send(): Promise<TxId>;
    awaitDefiDepositCompletion(timeout?: number): Promise<void>;
    awaitDefiFinalisation(timeout?: number): Promise<void>;
    awaitSettlement(timeout?: number): Promise<void>;
    getInteractionNonce(): Promise<number | undefined>;
}
//# sourceMappingURL=defi_controller.d.ts.map