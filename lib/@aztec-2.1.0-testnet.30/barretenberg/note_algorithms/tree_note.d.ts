/// <reference types="node" />
import { GrumpkinAddress } from '../address';
import { Grumpkin } from '../ecc/grumpkin';
import { ViewingKey } from '../viewing_key';
import { DecryptedNote } from './decrypted_note';
export declare class TreeNote {
    ownerPubKey: GrumpkinAddress;
    value: bigint;
    assetId: number;
    accountNonce: number;
    noteSecret: Buffer;
    creatorPubKey: Buffer;
    inputNullifier: Buffer;
    static EMPTY: TreeNote;
    static SIZE: number;
    constructor(ownerPubKey: GrumpkinAddress, value: bigint, assetId: number, accountNonce: number, noteSecret: Buffer, creatorPubKey: Buffer, inputNullifier: Buffer);
    toBuffer(): Buffer;
    createViewingKey(ephPrivKey: Buffer, grumpkin: Grumpkin): ViewingKey;
    static fromBuffer(buf: Buffer): TreeNote;
    /**
     * Note on how the noteSecret can be derived in two different ways (from ephPubKey or ephPrivKey):
     *
     * ownerPubKey := [ownerPrivKey] * G  (where G is a generator of the grumpkin curve, and `[scalar] * Point` is scalar multiplication).
     *                      ↑
     *         a.k.a. account private key
     *
     * ephPubKey := [ephPrivKey] * G    (where ephPrivKey is a random field element).
     *
     * sharedSecret := [ephPrivKey] * ownerPubKey = [ephPrivKey] * ([ownerPrivKey] * G) = [ownerPrivKey] * ([ephPrivKey] * G) = [ownerPrivKey] * ephPubKey
     *                  ^^^^^^^^^^                                                                                                               ^^^^^^^^^
     * noteSecret is then derivable from the sharedSecret.
     */
    static createFromEphPriv(ownerPubKey: GrumpkinAddress, value: bigint, assetId: number, accountNonce: number, inputNullifier: Buffer, ephPrivKey: Buffer, grumpkin: Grumpkin, creatorPubKey?: Buffer): TreeNote;
    static createFromEphPub(ownerPubKey: GrumpkinAddress, value: bigint, assetId: number, accountNonce: number, inputNullifier: Buffer, ephPubKey: GrumpkinAddress, ownerPrivKey: Buffer, grumpkin: Grumpkin, creatorPubKey?: Buffer): TreeNote;
    static recover({ noteBuf, noteSecret }: DecryptedNote, inputNullifier: Buffer, ownerPubKey: GrumpkinAddress): TreeNote;
}
//# sourceMappingURL=tree_note.d.ts.map