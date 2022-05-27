/// <reference types="node" />
import { EventEmitter } from 'events';
import { DispatchMsg } from '../core_sdk_flavours/transport';
import { NoteJson } from '../note';
import { AccountProofInputJson, JoinSplitProofInputJson, ProofOutputJson } from '../proofs';
import { CoreSdkOptions } from './core_sdk_options';
import { CoreSdkSerializedInterface } from './core_sdk_serialized_interface';
/**
 * Implements the serialized core sdk interface.
 * Transalates each individual api call, to a DispatchMsg sent to the given handler.
 */
export declare class CoreSdkDispatch extends EventEmitter implements CoreSdkSerializedInterface {
    private handler;
    constructor(handler: (msg: DispatchMsg) => Promise<any>);
    private request;
    init(options: CoreSdkOptions): Promise<void>;
    run(): Promise<void>;
    destroy(): Promise<void>;
    getLocalStatus(): Promise<any>;
    getRemoteStatus(): Promise<any>;
    getTxFees(assetId: number): Promise<any>;
    getDefiFees(bridgeId: string): Promise<any>;
    getLatestAccountNonce(publicKey: string): Promise<any>;
    getRemoteLatestAccountNonce(publicKey: string): Promise<any>;
    getLatestAliasNonce(alias: string): Promise<any>;
    getRemoteLatestAliasNonce(alias: string): Promise<any>;
    getAccountId(alias: string, accountNonce?: number): Promise<any>;
    getRemoteAccountId(alias: string, accountNonce?: number): Promise<any>;
    isAliasAvailable(alias: string): Promise<any>;
    isRemoteAliasAvailable(alias: string): Promise<any>;
    computeAliasHash(alias: string): Promise<any>;
    createPaymentProofInput(userId: string, assetId: number, publicInput: string, publicOutput: string, privateInput: string, recipientPrivateOutput: string, senderPrivateOutput: string, noteRecipient: string | undefined, publicOwner: string | undefined, spendingPublicKey: string, allowChain: number): Promise<any>;
    createPaymentProof(input: JoinSplitProofInputJson, txRefNo: number): Promise<any>;
    createAccountProofSigningData(signingPubKey: string, alias: string, accountNonce: number, migrate: boolean, accountPublicKey: string, newAccountPublicKey?: string, newSigningPubKey1?: string, newSigningPubKey2?: string): Promise<any>;
    createAccountProofInput(userId: string, aliasHash: string, migrate: boolean, signingPublicKey: string, newSigningPublicKey1: string | undefined, newSigningPublicKey2: string | undefined, newAccountPrivateKey: Uint8Array | undefined): Promise<any>;
    createAccountProof(proofInput: AccountProofInputJson, txRefNo: number): Promise<any>;
    createDefiProofInput(userId: string, bridgeId: string, depositValue: string, inputNotes: NoteJson[], spendingPublicKey: string): Promise<any>;
    createDefiProof(input: JoinSplitProofInputJson, txRefNo: number): Promise<any>;
    sendProofs(proofs: ProofOutputJson[]): Promise<any>;
    awaitSynchronised(): Promise<any>;
    isUserSynching(userId: string): Promise<any>;
    awaitUserSynchronised(userId: string): Promise<any>;
    awaitSettlement(txId: string, timeout?: number): Promise<any>;
    awaitDefiDepositCompletion(txId: string, timeout?: number): Promise<any>;
    awaitDefiFinalisation(txId: string, timeout?: number): Promise<any>;
    awaitDefiSettlement(txId: string, timeout?: number): Promise<any>;
    getDefiInteractionNonce(txId: string): Promise<any>;
    userExists(userId: string): Promise<any>;
    getUserData(userId: string): Promise<any>;
    getUsersData(): Promise<any>;
    derivePublicKey(privateKey: Uint8Array): Promise<any>;
    constructSignature(message: Uint8Array, privateKey: Uint8Array): Promise<any>;
    addUser(privateKey: Uint8Array, accountNonce?: number, noSync?: boolean): Promise<any>;
    removeUser(userId: string): Promise<any>;
    getSigningKeys(userId: string): Promise<any>;
    getBalances(userId: string): Promise<any>;
    getBalance(assetId: number, userId: string): Promise<any>;
    getSpendableSum(assetId: number, userId: string, excludePendingNotes?: boolean): Promise<any>;
    getSpendableSums(userId: string, excludePendingNotes?: boolean): Promise<any>;
    getMaxSpendableValue(assetId: number, userId: string, numNotes?: number, excludePendingNotes?: boolean): Promise<any>;
    pickNotes(userId: string, assetId: number, value: string, excludePendingNotes?: boolean): Promise<any>;
    pickNote(userId: string, assetId: number, value: string, excludePendingNotes?: boolean): Promise<any>;
    getUserTxs(userId: string): Promise<any>;
    getRemoteUnsettledAccountTxs(): Promise<any>;
    getRemoteUnsettledPaymentTxs(): Promise<any>;
}
//# sourceMappingURL=core_sdk_dispatch.d.ts.map