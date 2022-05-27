/// <reference types="node" />
import { AccountId } from '@aztec/barretenberg/account_id';
import { GrumpkinAddress } from '@aztec/barretenberg/address';
import { AssetValue } from '@aztec/barretenberg/asset';
import { TxId } from '@aztec/barretenberg/tx_id';
import { CoreSdkInterface } from '../core_sdk';
import { Signer } from '../signer';
export declare class MigrateAccountController {
    readonly userId: AccountId;
    private readonly userSigner;
    readonly newSigningPublicKey: GrumpkinAddress;
    readonly recoveryPublicKey: GrumpkinAddress | undefined;
    readonly newAccountPrivateKey: Buffer | undefined;
    readonly fee: AssetValue;
    private readonly core;
    private proofOutput;
    private feeProofOutput?;
    private txId;
    constructor(userId: AccountId, userSigner: Signer, newSigningPublicKey: GrumpkinAddress, recoveryPublicKey: GrumpkinAddress | undefined, newAccountPrivateKey: Buffer | undefined, fee: AssetValue, core: CoreSdkInterface);
    createProof(): Promise<void>;
    send(): Promise<TxId>;
    awaitSettlement(timeout?: number): Promise<void>;
}
//# sourceMappingURL=migrate_account_controller.d.ts.map