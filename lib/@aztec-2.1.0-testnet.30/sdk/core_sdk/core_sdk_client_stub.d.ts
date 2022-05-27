/// <reference types="node" />
import { AccountId, AliasHash } from '@aztec/barretenberg/account_id';
import { EthAddress, GrumpkinAddress } from '@aztec/barretenberg/address';
import { BridgeId } from '@aztec/barretenberg/bridge_id';
import { SchnorrSignature } from '@aztec/barretenberg/crypto';
import { TxId } from '@aztec/barretenberg/tx_id';
import EventEmitter from 'events';
import { Note } from '../note';
import { AccountProofInput, JoinSplitProofInput, ProofOutput } from '../proofs';
import { CoreSdkInterface } from './core_sdk_interface';
import { CoreSdkOptions } from './core_sdk_options';
import { CoreSdkSerializedInterface } from './core_sdk_serialized_interface';
/**
 * Implements the standard CoreSdkInterface.
 * Translates the CoreSdkInterface from normal types such as bigint, Buffer, AccountId, etc. into types
 * that can be serialized over a MessageChannel.
 * It forwards the calls onto an implementation of CoreSdkSerializedInterface.
 */
export declare class CoreSdkClientStub extends EventEmitter implements CoreSdkInterface {
    private backend;
    constructor(backend: CoreSdkSerializedInterface);
    init(options: CoreSdkOptions): Promise<void>;
    run(): Promise<void>;
    destroy(): Promise<void>;
    getLocalStatus(): Promise<import("./sdk_status").SdkStatus>;
    getRemoteStatus(): Promise<import("@aztec/barretenberg/rollup_provider").RollupProviderStatus>;
    getTxFees(assetId: number): Promise<import("@aztec/barretenberg/asset").AssetValue[][]>;
    getDefiFees(bridgeId: BridgeId): Promise<import("@aztec/barretenberg/asset").AssetValue[]>;
    getLatestAccountNonce(publicKey: GrumpkinAddress): Promise<number>;
    getRemoteLatestAccountNonce(publicKey: GrumpkinAddress): Promise<number>;
    getLatestAliasNonce(alias: string): Promise<number>;
    getRemoteLatestAliasNonce(alias: string): Promise<number>;
    getAccountId(alias: string, accountNonce?: number): Promise<AccountId | undefined>;
    getRemoteAccountId(alias: string, accountNonce?: number): Promise<AccountId | undefined>;
    isAliasAvailable(alias: string): Promise<boolean>;
    isRemoteAliasAvailable(alias: string): Promise<boolean>;
    computeAliasHash(alias: string): Promise<AliasHash>;
    createPaymentProofInput(userId: AccountId, assetId: number, publicInput: bigint, publicOutput: bigint, privateInput: bigint, recipientPrivateOutput: bigint, senderPrivateOutput: bigint, noteRecipient: AccountId | undefined, publicOwner: EthAddress | undefined, spendingPublicKey: GrumpkinAddress, allowChain: number): Promise<JoinSplitProofInput>;
    createPaymentProof(input: JoinSplitProofInput, txRefNo: number): Promise<ProofOutput>;
    createAccountProofSigningData(signingPubKey: GrumpkinAddress, alias: string, accountNonce: number, migrate: boolean, accountPublicKey: GrumpkinAddress, newAccountPublicKey?: GrumpkinAddress, newSigningPubKey1?: GrumpkinAddress, newSigningPubKey2?: GrumpkinAddress): Promise<Buffer>;
    createAccountProofInput(userId: AccountId, aliasHash: AliasHash, migrate: boolean, signingPublicKey: GrumpkinAddress, newSigningPublicKey1: GrumpkinAddress | undefined, newSigningPublicKey2: GrumpkinAddress | undefined, newAccountPrivateKey: Buffer | undefined): Promise<AccountProofInput>;
    createAccountProof(proofInput: AccountProofInput, txRefNo: number): Promise<ProofOutput>;
    createDefiProofInput(userId: AccountId, bridgeId: BridgeId, depositValue: bigint, inputNotes: Note[], spendingPublicKey: GrumpkinAddress): Promise<JoinSplitProofInput>;
    createDefiProof(input: JoinSplitProofInput, txRefNo: number): Promise<ProofOutput>;
    sendProofs(proofs: ProofOutput[]): Promise<TxId[]>;
    awaitSynchronised(): Promise<void>;
    isUserSynching(userId: AccountId): Promise<boolean>;
    awaitUserSynchronised(userId: AccountId): Promise<void>;
    awaitSettlement(txId: TxId, timeout?: number): Promise<void>;
    awaitDefiDepositCompletion(txId: TxId, timeout?: number): Promise<void>;
    awaitDefiFinalisation(txId: TxId, timeout?: number): Promise<void>;
    awaitDefiSettlement(txId: TxId, timeout?: number): Promise<void>;
    getDefiInteractionNonce(txId: TxId): Promise<number | undefined>;
    userExists(userId: AccountId): Promise<boolean>;
    getUserData(userId: AccountId): Promise<import("../user").UserData>;
    getUsersData(): Promise<import("../user").UserData[]>;
    derivePublicKey(privateKey: Buffer): Promise<GrumpkinAddress>;
    constructSignature(message: Buffer, privateKey: Buffer): Promise<SchnorrSignature>;
    addUser(privateKey: Buffer, accountNonce?: number, noSync?: boolean): Promise<import("../user").UserData>;
    removeUser(userId: AccountId): Promise<void>;
    getSigningKeys(userId: AccountId): Promise<Buffer[]>;
    getBalances(userId: AccountId): Promise<import("@aztec/barretenberg/asset").AssetValue[]>;
    getBalance(assetId: number, userId: AccountId): Promise<bigint>;
    getSpendableSum(assetId: number, userId: AccountId, excludePendingNotes?: boolean): Promise<bigint>;
    getSpendableSums(userId: AccountId, excludePendingNotes?: boolean): Promise<import("@aztec/barretenberg/asset").AssetValue[]>;
    getMaxSpendableValue(assetId: number, userId: AccountId, numNotes?: number, excludePendingNotes?: boolean): Promise<bigint>;
    pickNotes(userId: AccountId, assetId: number, value: bigint, excludePendingNotes?: boolean): Promise<Note[]>;
    pickNote(userId: AccountId, assetId: number, value: bigint, excludePendingNotes?: boolean): Promise<Note | undefined>;
    getUserTxs(userId: AccountId): Promise<(import("../core_tx").CoreAccountTx | import("../core_tx").CoreDefiTx | import("../core_tx").CorePaymentTx)[]>;
    getRemoteUnsettledAccountTxs(): Promise<import("@aztec/barretenberg/rollup_provider").AccountTx[]>;
    getRemoteUnsettledPaymentTxs(): Promise<import("@aztec/barretenberg/rollup_provider").JoinSplitTx[]>;
}
//# sourceMappingURL=core_sdk_client_stub.d.ts.map