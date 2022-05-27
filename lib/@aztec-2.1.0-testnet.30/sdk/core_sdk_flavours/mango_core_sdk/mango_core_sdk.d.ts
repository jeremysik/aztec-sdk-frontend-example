/// <reference types="node" />
import { EventEmitter } from 'events';
import { LevelUp } from 'levelup';
import { CoreSdkOptions, CoreSdkSerializedInterface, CoreSdkServerStub } from '../../core_sdk';
import { NoteJson } from '../../note';
import { AccountProofInputJson, JoinSplitProofInputJson, ProofOutputJson } from '../../proofs';
/**
 * Implements the standard CoreSdkSerializedInterface.
 * Check permission for apis that access user data.
 * If permission has been granted for the origin, it then forwards the calls onto a CoreSdkServerStub.
 */
export declare class MangoCoreSdk extends EventEmitter implements CoreSdkSerializedInterface {
    private core;
    private origin;
    private leveldb;
    constructor(core: CoreSdkServerStub, origin: string, leveldb: LevelUp);
    init(options: CoreSdkOptions): Promise<void>;
    run(): Promise<void>;
    destroy(): Promise<void>;
    getLocalStatus(): Promise<import("../../core_sdk").SdkStatusJson>;
    getRemoteStatus(): Promise<import("@aztec/barretenberg/rollup_provider").RollupProviderStatusJson>;
    getTxFees(assetId: number): Promise<import("@aztec/barretenberg/asset").AssetValueJson[][]>;
    getDefiFees(bridgeId: string): Promise<import("@aztec/barretenberg/asset").AssetValueJson[]>;
    getLatestAccountNonce(publicKey: string): Promise<number>;
    getRemoteLatestAccountNonce(publicKey: string): Promise<number>;
    getLatestAliasNonce(alias: string): Promise<number>;
    getRemoteLatestAliasNonce(alias: string): Promise<number>;
    getAccountId(alias: string, accountNonce?: number): Promise<string | undefined>;
    getRemoteAccountId(alias: string, accountNonce?: number): Promise<string | undefined>;
    isAliasAvailable(alias: string): Promise<boolean>;
    isRemoteAliasAvailable(alias: string): Promise<boolean>;
    computeAliasHash(alias: string): Promise<string>;
    createPaymentProofInput(userId: string, assetId: number, publicInput: string, publicOutput: string, privateInput: string, recipientPrivateOutput: string, senderPrivateOutput: string, noteRecipient: string | undefined, publicOwner: string | undefined, spendingPublicKey: string, allowChain: number): Promise<JoinSplitProofInputJson>;
    createPaymentProof(input: JoinSplitProofInputJson, txRefNo: number): Promise<ProofOutputJson>;
    createAccountProofSigningData(signingPubKey: string, alias: string, accountNonce: number, migrate: boolean, accountPublicKey: string, newAccountPublicKey?: string, newSigningPubKey1?: string, newSigningPubKey2?: string): Promise<Uint8Array>;
    createAccountProofInput(userId: string, aliasHash: string, migrate: boolean, signingPublicKey: string, newSigningPublicKey1: string | undefined, newSigningPublicKey2: string | undefined, newAccountPrivateKey: Uint8Array | undefined): Promise<AccountProofInputJson>;
    createAccountProof(input: AccountProofInputJson, txRefNo: number): Promise<ProofOutputJson>;
    createDefiProofInput(userId: string, bridgeId: string, depositValue: string, inputNotes: NoteJson[], spendingPublicKey: string): Promise<JoinSplitProofInputJson>;
    createDefiProof(input: JoinSplitProofInputJson, txRefNo: number): Promise<ProofOutputJson>;
    sendProofs(proofs: ProofOutputJson[]): Promise<string[]>;
    awaitSynchronised(): Promise<void>;
    isUserSynching(userId: string): Promise<boolean>;
    awaitUserSynchronised(userId: string): Promise<void>;
    awaitSettlement(txId: string, timeout?: number): Promise<void>;
    awaitDefiDepositCompletion(txId: string, timeout?: number): Promise<void>;
    awaitDefiFinalisation(txId: string, timeout?: number): Promise<void>;
    awaitDefiSettlement(txId: string, timeout?: number): Promise<void>;
    getDefiInteractionNonce(txId: string): Promise<number | undefined>;
    userExists(userId: string): Promise<boolean>;
    getUserData(userId: string): Promise<import("../..").UserDataJson>;
    getUsersData(): Promise<import("../..").UserDataJson[]>;
    derivePublicKey(privateKey: Uint8Array): Promise<string>;
    constructSignature(message: Uint8Array, privateKey: Uint8Array): Promise<string>;
    addUser(privateKey: Uint8Array, accountNonce?: number, noSync?: boolean): Promise<import("../..").UserDataJson>;
    removeUser(userId: string): Promise<void>;
    getSigningKeys(userId: string): Promise<Uint8Array[]>;
    getBalances(userId: string): Promise<import("@aztec/barretenberg/asset").AssetValueJson[]>;
    getBalance(assetId: number, userId: string): Promise<string>;
    getSpendableSum(assetId: number, userId: string, excludePendingNotes?: boolean): Promise<string>;
    getSpendableSums(userId: string, excludePendingNotes?: boolean): Promise<import("@aztec/barretenberg/asset").AssetValueJson[]>;
    getMaxSpendableValue(assetId: number, userId: string, numNotes?: number, excludePendingNotes?: boolean): Promise<string>;
    pickNotes(userId: string, assetId: number, value: string, excludePendingNotes?: boolean): Promise<NoteJson[]>;
    pickNote(userId: string, assetId: number, value: string, excludePendingNotes?: boolean): Promise<NoteJson | undefined>;
    getUserTxs(userId: string): Promise<(import("../../core_tx").CoreAccountTxJson | import("../../core_tx").CoreDefiTxJson | import("../../core_tx").CorePaymentTxJson)[]>;
    getRemoteUnsettledAccountTxs(): Promise<import("@aztec/barretenberg/rollup_provider").AccountTxJson[]>;
    getRemoteUnsettledPaymentTxs(): Promise<import("@aztec/barretenberg/rollup_provider").JoinSplitTxJson[]>;
    private checkPermission;
    private hasPermission;
    private addPermission;
    private removePermission;
    private getKey;
}
//# sourceMappingURL=mango_core_sdk.d.ts.map