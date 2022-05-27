"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreeNote = void 0;
const address_1 = require("../address");
const bigint_buffer_1 = require("../bigint_buffer");
const serialize_1 = require("../serialize");
const viewing_key_1 = require("../viewing_key");
const derive_note_secret_1 = require("./derive_note_secret");
class TreeNote {
    constructor(ownerPubKey, value, assetId, accountNonce, noteSecret, creatorPubKey, inputNullifier) {
        this.ownerPubKey = ownerPubKey;
        this.value = value;
        this.assetId = assetId;
        this.accountNonce = accountNonce;
        this.noteSecret = noteSecret;
        this.creatorPubKey = creatorPubKey;
        this.inputNullifier = inputNullifier;
    }
    toBuffer() {
        return Buffer.concat([
            (0, bigint_buffer_1.toBufferBE)(this.value, 32),
            (0, serialize_1.numToUInt32BE)(this.assetId),
            (0, serialize_1.numToUInt32BE)(this.accountNonce),
            this.ownerPubKey.toBuffer(),
            this.noteSecret,
            this.creatorPubKey,
            this.inputNullifier,
        ]);
    }
    createViewingKey(ephPrivKey, grumpkin) {
        const noteBuf = Buffer.concat([
            (0, bigint_buffer_1.toBufferBE)(this.value, 32),
            (0, serialize_1.numToUInt32BE)(this.assetId),
            (0, serialize_1.numToUInt32BE)(this.accountNonce),
            this.creatorPubKey,
        ]);
        return viewing_key_1.ViewingKey.createFromEphPriv(noteBuf, this.ownerPubKey, ephPrivKey, grumpkin);
    }
    static fromBuffer(buf) {
        let dataStart = 0;
        const value = (0, bigint_buffer_1.toBigIntBE)(buf.slice(dataStart, dataStart + 32));
        dataStart += 32;
        const assetId = buf.readUInt32BE(dataStart);
        dataStart += 4;
        const accountNonce = buf.readUInt32BE(dataStart);
        dataStart += 4;
        const ownerPubKey = new address_1.GrumpkinAddress(buf.slice(dataStart, dataStart + 64));
        dataStart += 64;
        const noteSecret = buf.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const creatorPubKey = buf.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const inputNullifier = buf.slice(dataStart, dataStart + 32);
        return new TreeNote(ownerPubKey, value, assetId, accountNonce, noteSecret, creatorPubKey, inputNullifier);
    }
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
    static createFromEphPriv(ownerPubKey, value, assetId, accountNonce, inputNullifier, ephPrivKey, grumpkin, creatorPubKey = Buffer.alloc(32)) {
        const noteSecret = (0, derive_note_secret_1.deriveNoteSecret)(ownerPubKey, ephPrivKey, grumpkin);
        return new TreeNote(ownerPubKey, value, assetId, accountNonce, noteSecret, creatorPubKey, inputNullifier);
    }
    static createFromEphPub(ownerPubKey, value, assetId, accountNonce, inputNullifier, ephPubKey, ownerPrivKey, grumpkin, creatorPubKey = Buffer.alloc(32)) {
        const noteSecret = (0, derive_note_secret_1.deriveNoteSecret)(ephPubKey, ownerPrivKey, grumpkin);
        return new TreeNote(ownerPubKey, value, assetId, accountNonce, noteSecret, creatorPubKey, inputNullifier);
    }
    static recover({ noteBuf, noteSecret }, inputNullifier, ownerPubKey) {
        const value = (0, bigint_buffer_1.toBigIntBE)(noteBuf.slice(0, 32));
        const assetId = noteBuf.readUInt32BE(32);
        const accountNonce = noteBuf.readUInt32BE(36);
        const creatorPubKey = noteBuf.slice(40, 72);
        return new TreeNote(ownerPubKey, value, assetId, accountNonce, noteSecret, creatorPubKey, inputNullifier);
    }
}
exports.TreeNote = TreeNote;
TreeNote.EMPTY = new TreeNote(address_1.GrumpkinAddress.one(), BigInt(0), 0, 0, Buffer.alloc(32), Buffer.alloc(32), Buffer.alloc(32));
TreeNote.SIZE = TreeNote.EMPTY.toBuffer().length;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZV9ub3RlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL25vdGVfYWxnb3JpdGhtcy90cmVlX25vdGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0NBQTZDO0FBQzdDLG9EQUEwRDtBQUUxRCw0Q0FBNkM7QUFDN0MsZ0RBQTRDO0FBRTVDLDZEQUF3RDtBQUV4RCxNQUFhLFFBQVE7SUFZbkIsWUFDUyxXQUE0QixFQUM1QixLQUFhLEVBQ2IsT0FBZSxFQUNmLFlBQW9CLEVBQ3BCLFVBQWtCLEVBQ2xCLGFBQXFCLEVBQ3JCLGNBQXNCO1FBTnRCLGdCQUFXLEdBQVgsV0FBVyxDQUFpQjtRQUM1QixVQUFLLEdBQUwsS0FBSyxDQUFRO1FBQ2IsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLGlCQUFZLEdBQVosWUFBWSxDQUFRO1FBQ3BCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIsa0JBQWEsR0FBYixhQUFhLENBQVE7UUFDckIsbUJBQWMsR0FBZCxjQUFjLENBQVE7SUFDNUIsQ0FBQztJQUVKLFFBQVE7UUFDTixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbkIsSUFBQSwwQkFBVSxFQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDO1lBQzFCLElBQUEseUJBQWEsRUFBQyxJQUFJLENBQUMsT0FBTyxDQUFDO1lBQzNCLElBQUEseUJBQWEsRUFBQyxJQUFJLENBQUMsWUFBWSxDQUFDO1lBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFO1lBQzNCLElBQUksQ0FBQyxVQUFVO1lBQ2YsSUFBSSxDQUFDLGFBQWE7WUFDbEIsSUFBSSxDQUFDLGNBQWM7U0FDcEIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELGdCQUFnQixDQUFDLFVBQWtCLEVBQUUsUUFBa0I7UUFDckQsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztZQUM1QixJQUFBLDBCQUFVLEVBQUMsSUFBSSxDQUFDLEtB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