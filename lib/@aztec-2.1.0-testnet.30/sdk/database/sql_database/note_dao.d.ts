/// <reference types="node" />
import { AccountId } from '@aztec/barretenberg/account_id';
import { Note } from '../../note';
export declare class NoteDao {
    commitment: Buffer;
    nullifier: Buffer;
    noteSecret: Buffer;
    owner: AccountId;
    creatorPubKey: Buffer;
    inputNullifier: Buffer;
    assetId: number;
    value: bigint;
    allowChain: boolean;
    index?: number;
    nullified: boolean;
    hashPath?: Buffer;
    afterLoad(): void;
}
export declare const noteToNoteDao: ({ treeNote: { noteSecret, ownerPubKey, accountNonce, creatorPubKey, inputNullifier, assetId }, commitment, nullifier, value, allowChain, index, nullified, hashPath, }: Note) => {
    commitment: Buffer;
    nullifier: Buffer;
    noteSecret: Buffer;
    owner: AccountId;
    creatorPubKey: Buffer;
    inputNullifier: Buffer;
    assetId: number;
    value: bigint;
    allowChain: boolean;
    nullified: boolean;
    index: number | undefined;
    hashPath: Buffer | undefined;
};
export declare const noteDaoToNote: ({ commitment, nullifier, noteSecret, owner, creatorPubKey, inputNullifier, assetId, value, allowChain, index, nullified, hashPath, }: NoteDao) => Note;
//# sourceMappingURL=note_dao.d.ts.map