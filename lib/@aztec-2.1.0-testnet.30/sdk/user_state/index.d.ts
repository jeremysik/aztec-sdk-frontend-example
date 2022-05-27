/// <reference types="node" />
import { Grumpkin } from '@aztec/barretenberg/ecc';
import { NoteAlgorithms } from '@aztec/barretenberg/note_algorithms';
import { RollupProvider } from '@aztec/barretenberg/rollup_provider';
import { EventEmitter } from 'events';
import { Database } from '../database';
import { Note } from '../note';
import { ProofOutput } from '../proofs';
import { UserData } from '../user';
import { BlockContext } from '../block_context/block_context';
import { Pedersen } from '@aztec/barretenberg/crypto';
export declare enum UserStateEvent {
    UPDATED_USER_STATE = "UPDATED_USER_STATE"
}
export declare class UserState extends EventEmitter {
    private user;
    private grumpkin;
    private noteAlgos;
    private db;
    private rollupProvider;
    private pedersen;
    private notePickers;
    private blockQueue;
    private syncState;
    private syncingPromise;
    constructor(user: UserData, grumpkin: Grumpkin, noteAlgos: NoteAlgorithms, db: Database, rollupProvider: RollupProvider, pedersen: Pedersen);
    private debug;
    /**
     * Load/refresh user state.
     */
    init(): Promise<void>;
    /**
     * First handles all historical blocks.
     * Then starts processing blocks added to queue via `processBlock()`.
     * Blocks may already be being added to the queue before we start synching. This means we may try to
     * process the same block twice, but will never miss a block. The block handler will filter duplicates.
     * New blocks are wrapped into a block context by the given factory
     * Where possible, required blocks should be taken from the provided shared block contexts
     * as this will utilise shared resources with other user states
     */
    startSync(sharedBlockContexts: BlockContext[]): Promise<void>;
    /**
     * Stops processing queued blocks. Blocks until any processing is complete.
     */
    stopSync(flush?: boolean): Promise<void> | undefined;
    isSyncing(): boolean;
    awaitSynchronised(): Promise<void>;
    getUser(): UserData;
    processBlock(block: BlockContext): void;
    handleBlocks(blockContexts: BlockContext[]): Promise<void>;
    private resetData;
    private handleAccountTx;
    private handlePaymentTx;
    private handleDefiDepositTx;
    private processDefiInteractionResults;
    private handleDefiClaimTx;
    private processSettledNote;
    private nullifyNote;
    private addClaim;
    private recoverPaymentTx;
    private recoverAccountTx;
    private recoverDefiTx;
    private refreshNotePicker;
    pickNotes(assetId: number, value: bigint, excludePendingNotes?: boolean): Promise<Note[]>;
    pickNote(assetId: number, value: bigint, excludePendingNotes?: boolean): Promise<Note | undefined>;
    getSpendableSum(assetId: number, excludePendingNotes?: boolean): Promise<bigint>;
    getSpendableSums(excludePendingNotes?: boolean): Promise<{
        assetId: number;
        value: bigint;
    }[]>;
    getMaxSpendableValue(assetId: number, numNotes?: number, excludePendingNotes?: boolean): Promise<bigint>;
    getBalance(assetId: number): bigint;
    getBalances(): {
        assetId: number;
        value: bigint;
    }[];
    addProof({ tx, outputNotes }: ProofOutput): Promise<void>;
    private processPendingNote;
}
export declare class UserStateFactory {
    private grumpkin;
    private noteAlgos;
    private db;
    private rollupProvider;
    private pedersen;
    constructor(grumpkin: Grumpkin, noteAlgos: NoteAlgorithms, db: Database, rollupProvider: RollupProvider, pedersen: Pedersen);
    createUserState(user: UserData): UserState;
}
//# sourceMappingURL=index.d.ts.map