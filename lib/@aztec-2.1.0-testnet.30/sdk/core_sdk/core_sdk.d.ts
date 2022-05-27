/// <reference types="node" />
import { AccountId, AliasHash } from '@aztec/barretenberg/account_id';
import { EthAddress, GrumpkinAddress } from '@aztec/barretenberg/address';
import { BridgeId } from '@aztec/barretenberg/bridge_id';
import { Pedersen } from '@aztec/barretenberg/crypto';
import { FftFactory } from '@aztec/barretenberg/fft';
import { Pippenger } from '@aztec/barretenberg/pippenger';
import { RollupProvider } from '@aztec/barretenberg/rollup_provider';
import { TxId } from '@aztec/barretenberg/tx_id';
import { BarretenbergWasm, WorkerPool } from '@aztec/barretenberg/wasm';
import { EventEmitter } from 'events';
import { LevelUp } from 'levelup';
import { CorePaymentTx } from '../core_tx';
import { Database } from '../database';
import { Note } from '../note';
import { AccountProofInput, JoinSplitProofInput, ProofOutput } from '../proofs';
import { CoreSdkInterface } from './core_sdk_interface';
import { CoreSdkOptions } from './core_sdk_options';
/**
 * CoreSdk is responsible for keeping everything in sync and proof construction.
 * A serial queue is used to ensure initialisation, synching, proof construction, and block processing, are synchronised.
 * init() should be called before making any other calls to construct the basic components.
 * run() should be called once a client wants to start synching, or requesting proof construction.
 * Takes ownership of injected components (should destroy them etc).
 */
export declare class CoreSdk extends EventEmitter implements CoreSdkInterface {
    private leveldb;
    private db;
    private rollupProvider;
    private barretenberg;
    private pedersen;
    private pippenger;
    private fftFactory;
    private workerPool?;
    private options;
    private worldState;
    private userStates;
    private paymentProofCreator;
    private accountProofCreator;
    private defiDepositProofCreator;
    private blockQueue;
    private serialQueue;
    private userStateFactory;
    private sdkStatus;
    private initState;
    private processBlocksPromise?;
    private noteAlgos;
    private blake2s;
    private grumpkin;
    private schnorr;
    constructor(leveldb: LevelUp, db: Database, rollupProvider: RollupProvider, barretenberg: BarretenbergWasm, pedersen: Pedersen, pippenger: Pippenger, fftFactory: FftFactory, workerPool?: WorkerPool | undefined);
    /**
     * Basic initialisation of the sdk.
     * Call run() to actually start syncing etc.
     * If multiple calls to init occur (e.g. many tabs calling into a shared worker),
     * each blocks until the first call completes.
     */
    init(options: CoreSdkOptions): Promise<void>;
    destroy(): Promise<void>;
    getLocalStatus(): Promise<{
        serverUrl: string;
        chainId: number;
        rollupContractAddress: EthAddress;
        feePayingAssetIds: number[];
        syncedToRollup: number;
        latestRollupId: number;
        dataSize: number;
        dataRoot: Buffer;
    }>;
    getRemoteStatus(): Promise<import("@aztec/barretenberg/rollup_provider").RollupProviderStatus>;
    getTxFees(assetId: number): Promise<import("@aztec/barretenberg/asset").AssetValue[][]>;
    getDefiFees(bridgeId: BridgeId): Promise<import("@aztec/barretenberg/asset").AssetValue[]>;
    /**
     * Return the latest nonce for a given public key, derived from chain data.
     */
    getLatestAccountNonce(publicKey: GrumpkinAddress): Promise<number>;
    getRemoteLatestAccountNonce(publicKey: GrumpkinAddress): Promise<number>;
    getLatestAliasNonce(alias: string): Promise<number>;
    getRemoteLatestAliasNonce(alias: string): Promise<number>;
    getAccountId(alias: string, accountNonce?: number): Promise<AccountId | undefined>;
    getRemoteAccountId(alias: string, accountNonce?: number): Promise<AccountId | undefined>;
    isAliasAvailable(alias: string): Promise<boolean>;
    isRemoteAliasAvailable(alias: string): Promise<boolean>;
    computeAliasHash(alias: string): Promise<AliasHash>;
    getDefiInteractionNonce(txId: TxId): Promise<number | undefined>;
    userExists(userId: AccountId): Promise<boolean>;
    getUserData(userId: AccountId): Promise<import("..").UserData>;
    getUsersData(): Promise<import("..").UserData[]>;
    derivePublicKey(privateKey: Buffer): Promise<GrumpkinAddress>;
    constructSignature(message: Buffer, privateKey: Buffer): Promise<import("@aztec/barretenberg/crypto").SchnorrSignature>;
    addUser(privateKey: Buffer, accountNonce?: number, noSync?: boolean): Promise<import("..").UserData>;
    removeUser(userId: AccountId): Promise<void>;
    getSigningKeys(userId: AccountId): Promise<Buffer[]>;
    getBalances(userId: AccountId): Promise<{
        assetId: number;
        value: bigint;
    }[]>;
    getBalance(assetId: number, userId: AccountId): Promise<bigint>;
    getSpendableSum(assetId: number, userId: AccountId, excludePendingNotes?: boolean): Promise<bigint>;
    getSpendableSums(userId: AccountId, excludePendingNotes?: boolean): Promise<{
        assetId: number;
        value: bigint;
    }[]>;
    getMaxSpendableValue(assetId: number, userId: AccountId, numNotes?: number, excludePendingNotes?: boolean): Promise<bigint>;
    pickNotes(userId: AccountId, assetId: number, value: bigint, excludePendingNotes?: boolean): Promise<Note[]>;
    pickNote(userId: AccountId, assetId: number, value: bigint, excludePendingNotes?: boolean): Promise<Note | undefined>;
    getUserTxs(userId: AccountId): Promise<import("../core_tx").CoreUserTx[]>;
    getRemoteUnsettledAccountTxs(): Promise<import("@aztec/barretenberg/rollup_provider").AccountTx[]>;
    getRemoteUnsettledPaymentTxs(): Promise<import("@aztec/barretenberg/rollup_provider").JoinSplitTx[]>;
    /**
     * Kicks off data tree updates, user note decryptions, alias table updates, proving key construction.
     * Moves the sdk into RUNNING state.
     */
    run(): Promise<void>;
    createPaymentProofInput(userId: AccountId, assetId: number, publicInput: bigint, publicOutput: bigint, privateInput: bigint, recipientPrivateOutput: bigint, senderPrivateOutput: bigint, noteRecipient: AccountId | undefined, publicOwner: EthAddress | undefined, spendingPublicKey: GrumpkinAddress, allowChain: number): Promise<{
        signingData: Buffer;
        tx: import("@aztec/barretenberg/client_proofs").JoinSplitTx;
        viewingKeys: import("@aztec/barretenberg/viewing_key").ViewingKey[];
        partialStateSecretEphPubKey: GrumpkinAddress | undefined;
    }>;
    createPaymentProof(input: JoinSplitProofInput, txRefNo: number): Promise<{
        tx: CorePaymentTx;
        proofData: import("@aztec/barretenberg/client_proofs").ProofData;
        offchainTxData: import("@aztec/barretenberg/offchain_tx_data").OffchainJoinSplitData;
        outputNotes: Note[];
    }>;
    createAccountProofSigningData(signingPubKey: GrumpkinAddress, alias: string, accountNonce: number, migrate: boolean, accountPublicKey: GrumpkinAddress, newAccountPublicKey?: GrumpkinAddress, newSigningPubKey1?: GrumpkinAddress, newSigningPubKey2?: GrumpkinAddress): Promise<Buffer>;
    createAccountProofInput(userId: AccountId, aliasHash: AliasHash, migrate: boolean, signingPublicKey: GrumpkinAddress, newSigningPublicKey1: GrumpkinAddress | undefined, newSigningPublicKey2: GrumpkinAddress | undefined, newAccountPrivateKey: Buffer | undefined): Promise<AccountProofInput>;
    createAccountProof(input: AccountProofInput, txRefNo: number): Promise<ProofOutput>;
    createDefiProofInput(userId: AccountId, bridgeId: BridgeId, depositValue: bigint, inputNotes: Note[], spendingPublicKey: GrumpkinAddress): Promise<{
        signingData: Buffer;
        tx: import("@aztec/barretenberg/client_proofs").JoinSplitTx;
        viewingKeys: import("@aztec/barretenberg/viewing_key").ViewingKey[];
        partialStateSecretEphPubKey: GrumpkinAddress | undefined;
    }>;
    createDefiProof(input: JoinSplitProofInput, txRefNo: number): Promise<{
        tx: import("../core_tx").CoreDefiTx;
        proofData: import("@aztec/barretenberg/client_proofs").ProofData;
        offchainTxData: import("@aztec/barretenberg/offchain_tx_data").OffchainDefiDepositData;
        outputNotes: Note[];
    }>;
    sendProofs(proofs: ProofOutput[]): Promise<TxId[]>;
    awaitSynchronised(): Promise<void>;
    isUserSynching(userId: AccountId): Promise<boolean>;
    awaitUserSynchronised(userId: AccountId): Promise<void>;
    awaitSettlement(txId: TxId, timeout?: number): Promise<void>;
    awaitDefiDepositCompletion(txId: TxId, timeout?: number): Promise<void>;
    awaitDefiFinalisation(txId: TxId, timeout?: number): Promise<void>;
    awaitDefiSettlement(txId: TxId, timeout?: number): Promise<void>;
    private getUserState;
    private isSynchronised;
    private assertInitState;
    private updateInitState;
    private getLocalRollupContractAddress;
    private getLocalVerifierContractAddress;
    private getSyncedToRollup;
    private getCrsData;
    private initUserStates;
    private startSyncingUserState;
    private stopSyncingUserState;
    private createJoinSplitProofCreators;
    private createAccountProofCreator;
    private createJoinSplitProvingKey;
    private createAccountProvingKey;
    private syncAliasesAndKeys;
    private syncCommitments;
    private genesisSync;
    /**
     * Kicks off the process of listening for blocks, also ensures we are fully synced
     * Produces a set of block context objects that can be passed to user states for their sync process
     * Returns the set of generated shared block contexts
     */
    private startReceivingBlocks;
    private stopReceivingBlocks;
    /**
     * Called when data root is not as expected. We need to save parts of leveldb we don't want to lose, erase the db,
     * and rebuild the merkle tree.
     */
    private eraseAndRebuildDataTree;
    private sync;
    private updateStatusRollupInfo;
    private processBlockQueue;
    private processAliases;
}
//# sourceMappingURL=core_sdk.d.ts.map