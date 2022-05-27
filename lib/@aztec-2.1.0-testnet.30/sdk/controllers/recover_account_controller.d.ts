import { AssetValue } from '@aztec/barretenberg/asset';
import { CoreSdkInterface } from '../core_sdk';
import { RecoveryPayload } from '../user';
export declare class RecoverAccountController {
    readonly recoveryPayload: RecoveryPayload;
    readonly fee: AssetValue;
    private addSigningKeyController;
    constructor(recoveryPayload: RecoveryPayload, fee: AssetValue, core: CoreSdkInterface);
    createProof(): Promise<void>;
    send(): Promise<import("@aztec/barretenberg/tx_id").TxId>;
    awaitSettlement(timeout?: number): Promise<void>;
}
//# sourceMappingURL=recover_account_controller.d.ts.map