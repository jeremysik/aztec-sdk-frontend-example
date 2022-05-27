/// <reference types="node" />
import { AccountId } from '@aztec/barretenberg/account_id';
import { EthAddress, GrumpkinAddress } from '@aztec/barretenberg/address';
import { AssetValue } from '@aztec/barretenberg/asset';
import { EthereumProvider } from '@aztec/barretenberg/blockchain';
import { TxId } from '@aztec/barretenberg/tx_id';
import { ClientEthereumBlockchain } from '@aztec/blockchain';
import { CoreSdkInterface } from '../core_sdk';
import { Signer } from '../signer';
export declare class RegisterController {
    readonly userId: AccountId;
    private readonly userSigner;
    readonly alias: string;
    readonly signingPublicKey: GrumpkinAddress;
    readonly recoveryPublicKey: GrumpkinAddress | undefined;
    readonly deposit: AssetValue;
    readonly fee: AssetValue;
    readonly depositor: EthAddress;
    private readonly core;
    private readonly newUserId;
    private depositController?;
    private proofOutput;
    private txId;
    constructor(userId: AccountId, userSigner: Signer, alias: string, signingPublicKey: GrumpkinAddress, recoveryPublicKey: GrumpkinAddress | undefined, deposit: AssetValue, fee: AssetValue, depositor: EthAddress, core: CoreSdkInterface, blockchain: ClientEthereumBlockchain, provider: EthereumProvider);
    getPendingFunds(): Promise<bigint>;
    getRequiredFunds(): Promise<bigint>;
    getPublicAllowance(): Promise<bigint>;
    approve(): Promise<import("@aztec/barretenberg/blockchain").TxHash>;
    depositFundsToContract(): Promise<import("@aztec/barretenberg/blockchain").TxHash>;
    depositFundsToContractWithPermit(deadline: bigint): Promise<import("@aztec/barretenberg/blockchain").TxHash>;
    depositFundsToContractWithProofApproval(): Promise<import("@aztec/barretenberg/blockchain").TxHash>;
    depositFundsToContractWithPermitAndProofApproval(deadline: bigint): Promise<import("@aztec/barretenberg/blockchain").TxHash>;
    awaitDepositFundsToContract(): Promise<void>;
    createProof(): Promise<void>;
    getTxId(): TxId | undefined;
    getSigningData(): Buffer | undefined;
    isProofApproved(): Promise<boolean>;
    approveProof(): Promise<import("@aztec/barretenberg/blockchain").TxHash>;
    sign(): Promise<void>;
    isSignatureValid(): boolean;
    send(): Promise<TxId>;
    awaitSettlement(timeout?: number): Promise<void>;
}
//# sourceMappingURL=register_controller.d.ts.map