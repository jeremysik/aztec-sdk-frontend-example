"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DexieDatabase = void 0;
const tslib_1 = require("tslib");
const account_id_1 = require("@aztec/barretenberg/account_id");
const address_1 = require("@aztec/barretenberg/address");
const bridge_id_1 = require("@aztec/barretenberg/bridge_id");
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
const note_algorithms_1 = require("@aztec/barretenberg/note_algorithms");
const tx_id_1 = require("@aztec/barretenberg/tx_id");
const dexie_1 = tslib_1.__importDefault(require("dexie"));
const core_tx_1 = require("../core_tx");
const note_1 = require("../note");
const MAX_BYTE_LENGTH = 100000000;
const toSubKeyName = (name, index) => `${name}__${index}`;
class DexieNote {
    constructor(owner, assetId, value, noteSecret, creatorPubKey, inputNullifier, commitment, nullifier, allowChain, index, nullified, pending, hashPath) {
        this.owner = owner;
        this.assetId = assetId;
        this.value = value;
        this.noteSecret = noteSecret;
        this.creatorPubKey = creatorPubKey;
        this.inputNullifier = inputNullifier;
        this.commitment = commitment;
        this.nullifier = nullifier;
        this.allowChain = allowChain;
        this.index = index;
        this.nullified = nullified;
        this.pending = pending;
        this.hashPath = hashPath;
    }
}
const noteToDexieNote = (note) => new DexieNote(new Uint8Array(note.owner.toBuffer()), note.assetId, note.value.toString(), new Uint8Array(note.treeNote.noteSecret), new Uint8Array(note.treeNote.creatorPubKey), new Uint8Array(note.treeNote.inputNullifier), note.commitment, note.nullifier, note.allowChain, note.index || 0, note.nullified ? 1 : 0, note.index === undefined ? 1 : 0, note.hashPath ? new Uint8Array(note.hashPath) : undefined);
const dexieNoteToNote = ({ owner, assetId, value, noteSecret, creatorPubKey, inputNullifier, commitment, nullifier, allowChain, nullified, index, pending, hashPath, }) => {
    const ownerId = account_id_1.AccountId.fromBuffer(Buffer.from(owner));
    return new note_1.Note(new note_algorithms_1.TreeNote(ownerId.publicKey, BigInt(value), assetId, ownerId.accountNonce, Buffer.from(noteSecret), Buffer.from(creatorPubKey), Buffer.from(inputNullifier)), Buffer.from(commitment), Buffer.from(nullifier), allowChain, !!nullified, !pending ? index : undefined, hashPath ? Buffer.from(hashPath) : undefined);
};
class DexieKey {
    constructor(name, value, size, count) {
        this.name = name;
        this.value = value;
        this.size = size;
        this.count = count;
    }
}
class DexieUser {
    constructor(id, privateKey, syncedToRollup, aliasHash) {
        this.id = id;
        this.privateKey = privateKey;
        this.syncedToRollup = syncedToRollup;
        this.aliasHash = aliasHash;
    }
}
const userToDexieUser = ({ id, privateKey, aliasHash, syncedToRollup }) => new DexieUser(new Uint8Array(id.toBuffer()), new Uint8Array(privateKey), syncedToRollup, aliasHash ? new Uint8Array(aliasHash.toBuffer()) : undefined);
const dexieUserToUser = (user) => {
    const id = account_id_1.AccountId.fromBuffer(Buffer.from(user.id));
    return {
        id,
        publicKey: id.publicKey,
        accountNonce: id.accountNonce,
        privateKey: Buffer.from(user.privateKey),
        syncedToRollup: user.syncedToRollup,
        aliasHash: user.aliasHash ? new account_id_1.AliasHash(Buffer.from(user.aliasHash)) : undefined,
    };
};
class DexieUserTx {
    constructor(txId, userId, proofId, created, settled) {
        this.txId = txId;
        this.userId = userId;
        this.proofId = proofId;
        this.created = created;
        this.settled = settled;
    }
}
class DexiePaymentTx {
    constructor(txId, userId, proofId, assetId, publicValue, privateInput, recipientPrivateOutput, senderPrivateOutput, isRecipient, isSender, txRefNo, created, settled, // dexie does not sort a column correctly if some values are undefined
    publicOwner) {
        this.txId = txId;
        this.userId = userId;
        this.proofId = proofId;
        this.assetId = assetId;
        this.publicValue = publicValue;
        this.privateInput = privateInput;
        this.recipientPrivateOutput = recipientPrivateOutput;
        this.senderPrivateOutput = senderPrivateOutput;
        this.isRecipient = isRecipient;
        this.isSender = isSender;
        this.txRefNo = txRefNo;
        this.created = created;
        this.settled = settled;
        this.publicOwner = publicOwner;
    }
}
const toDexiePaymentTx = (tx) => new DexiePaymentTx(new Uint8Array(tx.txId.toBuffer()), new Uint8Array(tx.userId.toBuffer()), tx.proofId, tx.assetId, tx.publicValue.toString(), tx.privateInput.toString(), tx.recipientPrivateOutput.toString(), tx.senderPrivateOutput.toString(), tx.isRecipient, tx.isSender, tx.txRefNo, tx.created, tx.settled ? tx.settled.getTime() : 0, tx.publicOwner ? new Uint8Array(tx.publicOwner.toBuffer()) : undefined);
const fromDexiePaymentTx = ({ txId, userId, proofId, assetId, publicValue, publicOwner, privateInput, recipientPrivateOutput, senderPrivateOutput, isRecipient, isSender, txRefNo, created, settled, }) => new core_tx_1.CorePaymentTx(new tx_id_1.TxId(Buffer.from(txId)), account_id_1.AccountId.fromBuffer(Buffer.from(userId)), proofId, assetId, BigInt(publicValue), publicOwner ? new address_1.EthAddress(Buffer.from(publicOwner)) : undefined, BigInt(privateInput), BigInt(recipientPrivateOutput), BigInt(senderPrivateOutput), isRecipient, isSender, txRefNo, created, settled ? new Date(settled) : undefined);
class DexieAccountTx {
    constructor(txId, userId, proofId, aliasHash, migrated, txRefNo, created, settled, newSigningPubKey1, newSigningPubKey2) {
        this.txId = txId;
        this.userId = userId;
        this.proofId = proofId;
        this.aliasHash = aliasHash;
        this.migrated = migrated;
        this.txRefNo = txRefNo;
        this.created = created;
        this.settled = settled;
        this.newSigningPubKey1 = newSigningPubKey1;
        this.newSigningPubKey2 = newSigningPubKey2;
    }
}
const toDexieAccountTx = (tx) => new DexieAccountTx(new Uint8Array(tx.txId.toBuffer()), new Uint8Array(tx.userId.toBuffer()), client_proofs_1.ProofId.ACCOUNT, new Uint8Array(tx.aliasHash.toBuffer()), tx.migrated, tx.txRefNo, tx.created, tx.settled ? tx.settled.getTime() : 0, tx.newSigningPubKey1 ? new Uint8Array(tx.newSigningPubKey1) : undefined, tx.newSigningPubKey2 ? new Uint8Array(tx.newSigningPubKey2) : undefined);
const fromDexieAccountTx = ({ txId, userId, aliasHash, newSigningPubKey1, newSigningPubKey2, migrated, txRefNo, created, settled, }) => new core_tx_1.CoreAccountTx(new tx_id_1.TxId(Buffer.from(txId)), account_id_1.AccountId.fromBuffer(Buffer.from(userId)), new account_id_1.AliasHash(Buffer.from(aliasHash)), newSigningPubKey1 ? Buffer.from(newSigningPubKey1) : undefined, newSigningPubKey2 ? Buffer.from(newSigningPubKey2) : undefined, migrated, txRefNo, created, settled ? new Date(settled) : undefined);
class DexieDefiTx {
    constructor(txId, userId, proofId, bridgeId, depositValue, txFee, partialStateSecret, txRefNo, created, settled, interactionNonce, isAsync, success, outputValueA, outputValueB, finalised, claimSettled, claimTxId) {
        this.txId = txId;
        this.userId = userId;
        this.proofId = proofId;
        this.bridgeId = bridgeId;
        this.depositValue = depositValue;
        this.txFee = txFee;
        this.partialStateSecret = partialStateSecret;
        this.txRefNo = txRefNo;
        this.created = created;
        this.settled = settled;
        this.interactionNonce = interactionNonce;
        this.isAsync = isAsync;
        this.success = success;
        this.outputValueA = outputValueA;
        this.outputValueB = outputValueB;
        this.finalised = finalised;
        this.claimSettled = claimSettled;
        this.claimTxId = claimTxId;
    }
}
const toDexieDefiTx = (tx) => {
    var _a, _b;
    return new DexieDefiTx(new Uint8Array(tx.txId.toBuffer()), new Uint8Array(tx.userId.toBuffer()), client_proofs_1.ProofId.DEFI_DEPOSIT, new Uint8Array(tx.bridgeId.toBuffer()), tx.depositValue.toString(), tx.txFee.toString(), new Uint8Array(tx.partialStateSecret), tx.txRefNo, tx.created, tx.settled ? tx.settled.getTime() : 0, tx.interactionNonce, tx.isAsync, tx.success, (_a = tx.outputValueA) === null || _a === void 0 ? void 0 : _a.toString(), (_b = tx.outputValueB) === null || _b === void 0 ? void 0 : _b.toString(), tx.finalised, tx.claimSettled, tx.claimTxId ? new Uint8Array(tx.claimTxId.toBuffer()) : undefined);
};
const fromDexieDefiTx = ({ txId, userId, bridgeId, depositValue, txFee, partialStateSecret, txRefNo, created, settled, interactionNonce, isAsync, success, outputValueA, outputValueB, finalised, claimSettled, claimTxId, }) => new core_tx_1.CoreDefiTx(new tx_id_1.TxId(Buffer.from(txId)), account_id_1.AccountId.fromBuffer(Buffer.from(userId)), bridge_id_1.BridgeId.fromBuffer(Buffer.from(bridgeId)), BigInt(depositValue), BigInt(txFee), Buffer.from(partialStateSecret), txRefNo, created, settled ? new Date(settled) : undefined, interactionNonce, isAsync, success, outputValueA ? BigInt(outputValueA) : undefined, outputValueB ? BigInt(outputValueB) : undefined, finalised, claimSettled, claimTxId ? new tx_id_1.TxId(Buffer.from(claimTxId)) : undefined);
class DexieClaimTx {
    constructor(nullifier, txId, userId, secret, interactionNonce) {
        this.nullifier = nullifier;
        this.txId = txId;
        this.userId = userId;
        this.secret = secret;
        this.interactionNonce = interactionNonce;
    }
}
const toDexieClaimTx = (claim) => new DexieClaimTx(new Uint8Array(claim.nullifier), new Uint8Array(claim.defiTxId.toBuffer()), new Uint8Array(claim.userId.toBuffer()), new Uint8Array(claim.secret), claim.interactionNonce);
const fromDexieClaimTx = ({ nullifier, txId, userId, secret, interactionNonce }) => ({
    nullifier: Buffer.from(nullifier),
    defiTxId: new tx_id_1.TxId(Buffer.from(txId)),
    userId: account_id_1.AccountId.fromBuffer(Buffer.from(userId)),
    secret: Buffer.from(secret),
    interactionNonce,
});
class DexieUserKey {
    constructor(accountId, key, treeIndex, hashPath) {
        this.accountId = accountId;
        this.key = key;
        this.treeIndex = treeIndex;
        this.hashPath = hashPath;
    }
}
const dexieUserKeyToSigningKey = (userKey) => ({
    ...userKey,
    accountId: account_id_1.AccountId.fromBuffer(Buffer.from(userKey.accountId)),
    key: Buffer.from(userKey.key),
    hashPath: Buffer.from(userKey.hashPath),
});
class DexieAlias {
    constructor(aliasHash, address, latestNonce) {
        this.aliasHash = aliasHash;
        this.address = address;
        this.latestNonce = latestNonce;
    }
}
const dexieAliasToAlias = ({ aliasHash, address, latestNonce }) => ({
    aliasHash: new account_id_1.AliasHash(Buffer.from(aliasHash)),
    address: new address_1.GrumpkinAddress(Buffer.from(address)),
    latestNonce,
});
const sortUserTxs = (txs) => {
    const unsettled = txs.filter(tx => !tx.settled).sort((a, b) => (a.created < b.created ? 1 : -1));
    const settled = txs.filter(tx => tx.settled);
    return [...unsettled, ...settled];
};
class DexieDatabase {
    constructor(dbName = 'hummus', version = 6) {
        this.dbName = dbName;
        this.version = version;
    }
    async init() {
        this.createTables();
        try {
            // Try to do something with indexedDB.
            // If it fails (with UpgradeError), then the schema has changed significantly that we need to recreate the entire db.
            await this.getUsers();
        }
        catch (e) {
            await this.dexie.delete();
            this.createTables();
        }
    }
    createTables() {
        this.dexie = new dexie_1.default(this.dbName);
        this.dexie.version(this.version).stores({
            alias: '&[aliasHash+address], aliasHash, address, latestNonce',
            claimTx: '&nullifier',
            key: '&name',
            note: '&commitment, nullifier, [owner+nullified], [owner+pending]',
            mutex: '&name',
            user: '&id',
            userKeys: '&[accountId+key], accountId',
            userTx: '&[txId+userId], txId, [txId+proofId], [userId+proofId], proofId, settled, [userId+proofId+interactionNonce]',
        });
        this.alias = this.dexie.table('alias');
        this.key = this.dexie.table('key');
        this.mutex = this.dexie.table('mutex');
        this.note = this.dexie.table('note');
        this.user = this.dexie.table('user');
        this.userKeys = this.dexie.table('userKeys');
        this.userTx = this.dexie.table('userTx');
        this.claimTx = this.dexie.table('claimTx');
    }
    async close() {
        await this.dexie.close();
    }
    async clear() {
        for (const table of this.dexie.tables) {
            await table.clear();
        }
    }
    async addNote(note) {
        await this.note.put(noteToDexieNote(note));
    }
    async getNote(commitment) {
        const note = await this.note.get({ commitment: new Uint8Array(commitment) });
        return note ? dexieNoteToNote(note) : undefined;
    }
    async getNoteByNullifier(nullifier) {
        const note = await this.note.get({ nullifier: new Uint8Array(nullifier) });
        return note ? dexieNoteToNote(note) : undefined;
    }
    async nullifyNote(nullifier) {
        await this.note.where({ nullifier: new Uint8Array(nullifier) }).modify({ nullified: 1 });
    }
    async addClaimTx(tx) {
        await this.claimTx.put(toDexieClaimTx(tx));
    }
    async getClaimTx(nullifier) {
        const tx = await this.claimTx.get({ nullifier: new Uint8Array(nullifier) });
        return tx ? fromDexieClaimTx(tx) : undefined;
    }
    async getUserNotes(userId) {
        return (await this.note.where({ owner: new Uint8Array(userId.toBuffer()), nullified: 0 }).toArray()).map(dexieNoteToNote);
    }
    async getUserPendingNotes(userId) {
        return (await this.note.where({ owner: new Uint8Array(userId.toBuffer()), pending: 1 }).toArray()).map(dexieNoteToNote);
    }
    async removeNote(nullifier) {
        await this.note.where({ nullifier: new Uint8Array(nullifier) }).delete();
    }
    async getUser(userId) {
        const user = await this.user.get(new Uint8Array(userId.toBuffer()));
        return user ? dexieUserToUser(user) : undefined;
    }
    async getUsers() {
        return (await this.user.toArray()).map(dexieUserToUser);
    }
    async addUser(user) {
        await this.user.put(userToDexieUser(user));
    }
    async updateUser(user) {
        await this.user.where({ id: new Uint8Array(user.id.toBuffer()) }).modify(userToDexieUser(user));
    }
    async addPaymentTx(tx) {
        await this.userTx.put(toDexiePaymentTx(tx));
    }
    async getPaymentTx(txId, userId) {
        const tx = await this.userTx.get({
            txId: new Uint8Array(txId.toBuffer()),
            userId: new Uint8Array(userId.toBuffer()),
        });
        return tx && [client_proofs_1.ProofId.DEPOSIT, client_proofs_1.ProofId.WITHDRAW, client_proofs_1.ProofId.SEND].includes(tx.proofId)
            ? fromDexiePaymentTx(tx)
            : undefined;
    }
    async getPaymentTxs(userId) {
        const txs = (await this.userTx
            .where({ userId: new Uint8Array(userId.toBuffer()) })
            .reverse()
            .sortBy('settled')).filter(p => [client_proofs_1.ProofId.DEPOSIT, client_proofs_1.ProofId.WITHDRAW, client_proofs_1.ProofId.SEND].includes(p.proofId));
        return sortUserTxs(txs).map(fromDexiePaymentTx);
    }
    async settlePaymentTx(txId, userId, settled) {
        await this.userTx
            .where({
            txId: new Uint8Array(txId.toBuffer()),
            userId: new Uint8Array(userId.toBuffer()),
        })
            .modify({ settled });
    }
    async addAccountTx(tx) {
        await this.userTx.put(toDexieAccountTx(tx));
    }
    async getAccountTx(txId) {
        const tx = await this.userTx.get({
            txId: new Uint8Array(txId.toBuffer()),
            proofId: client_proofs_1.ProofId.ACCOUNT,
        });
        return tx ? fromDexieAccountTx(tx) : undefined;
    }
    async getAccountTxs(userId) {
        const txs = await this.userTx
            .where({ userId: new Uint8Array(userId.toBuffer()), proofId: client_proofs_1.ProofId.ACCOUNT })
            .reverse()
            .sortBy('settled');
        return sortUserTxs(txs).map(fromDexieAccountTx);
    }
    async settleAccountTx(txId, settled) {
        await this.userTx.where({ txId: new Uint8Array(txId.toBuffer()), proofId: client_proofs_1.ProofId.ACCOUNT }).modify({ settled });
    }
    async addDefiTx(tx) {
        await this.userTx.put(toDexieDefiTx(tx));
    }
    async getDefiTx(txId) {
        const tx = await this.userTx.get({
            txId: new Uint8Array(txId.toBuffer()),
            proofId: client_proofs_1.ProofId.DEFI_DEPOSIT,
        });
        return tx ? fromDexieDefiTx(tx) : undefined;
    }
    async getDefiTxs(userId) {
        const txs = await this.userTx
            .where({ userId: new Uint8Array(userId.toBuffer()), proofId: client_proofs_1.ProofId.DEFI_DEPOSIT })
            .reverse()
            .sortBy('settled');
        return sortUserTxs(txs).map(fromDexieDefiTx);
    }
    async getDefiTxsByNonce(userId, interactionNonce) {
        const txs = (await this.userTx
            .where({ userId: new Uint8Array(userId.toBuffer()), proofId: client_proofs_1.ProofId.DEFI_DEPOSIT, interactionNonce })
            .reverse()
            .sortBy('settled'));
        return sortUserTxs(txs).map(fromDexieDefiTx);
    }
    async settleDefiDeposit(txId, interactionNonce, isAsync, settled) {
        await this.userTx
            .where({ txId: new Uint8Array(txId.toBuffer()), proofId: client_proofs_1.ProofId.DEFI_DEPOSIT })
            .modify({ interactionNonce, isAsync, settled });
    }
    async updateDefiTxFinalisationResult(txId, success, outputValueA, outputValueB, finalised) {
        await this.userTx
            .where({ txId: new Uint8Array(txId.toBuffer()), proofId: client_proofs_1.ProofId.DEFI_DEPOSIT })
            .modify({ success, outputValueA, outputValueB, finalised });
    }
    async settleDefiTx(txId, claimSettled, claimTxId) {
        await this.userTx
            .where({ txId: new Uint8Array(txId.toBuffer()), proofId: client_proofs_1.ProofId.DEFI_DEPOSIT })
            .modify({ claimSettled, claimTxId: new Uint8Array(claimTxId.toBuffer()) });
    }
    async getUserTxs(userId) {
        const txs = await this.userTx
            .where({ userId: new Uint8Array(userId.toBuffer()) })
            .reverse()
            .sortBy('settled');
        return sortUserTxs(txs).map(tx => {
            switch (tx.proofId) {
                case client_proofs_1.ProofId.ACCOUNT:
                    return fromDexieAccountTx(tx);
                case client_proofs_1.ProofId.DEFI_DEPOSIT:
                    return fromDexieDefiTx(tx);
                default:
                    return fromDexiePaymentTx(tx);
            }
        });
    }
    async isUserTxSettled(txId) {
        const txs = await this.userTx.where({ txId: new Uint8Array(txId.toBuffer()) }).toArray();
        return txs.length > 0 && txs.every(tx => tx.settled);
    }
    async getPendingUserTxs(userId) {
        const unsettledTxs = await this.userTx.where({ settled: 0 }).toArray();
        return unsettledTxs
            .flat()
            .filter(tx => account_id_1.AccountId.fromBuffer(Buffer.from(tx.userId)).equals(userId))
            .map(({ txId }) => new tx_id_1.TxId(Buffer.from(txId)));
    }
    async removeUserTx(txId, userId) {
        await this.userTx
            .where({ txId: new Uint8Array(txId.toBuffer()), userId: new Uint8Array(userId.toBuffer()) })
            .delete();
    }
    async removeUser(userId) {
        const user = await this.getUser(userId);
        if (!user)
            return;
        const id = new Uint8Array(userId.toBuffer());
        await this.userTx.where({ userId: id }).delete();
        await this.userKeys.where({ accountId: id }).delete();
        await this.note.where({ owner: id }).delete();
        await this.user.where({ id }).delete();
    }
    async resetUsers() {
        await this.note.clear();
        await this.userTx.clear();
        await this.userKeys.clear();
        await this.alias.clear();
        await this.user.toCollection().modify({ syncedToRollup: -1 });
    }
    async deleteKey(name) {
        const key = await this.key.get(name);
        if (!key) {
            return;
        }
        for (let i = 0; i < key.count; ++i) {
            await this.key.where({ name: toSubKeyName(name, i) }).delete();
        }
        await this.key.where({ name }).delete();
    }
    async addKey(name, value) {
        const size = value.byteLength;
        if (size <= MAX_BYTE_LENGTH) {
            await this.key.put({ name, value, size });
        }
        else {
            await this.deleteKey(name);
            const count = Math.ceil(size / MAX_BYTE_LENGTH);
            for (let i = 0; i < count; ++i) {
                const subValue = new Uint8Array(value.buffer.slice(MAX_BYTE_LENGTH * i, MAX_BYTE_LENGTH * (i + 1)));
                await this.key.add({
                    name: toSubKeyName(name, i),
                    value: subValue,
                    size: subValue.byteLength,
                });
            }
            await this.key.add({ name, value: new Uint8Array(), size, count });
        }
    }
    async getKey(name) {
        const key = await this.key.get(name);
        if (!key || !key.size) {
            return undefined;
        }
        if (!key.count) {
            return Buffer.from(key.value);
        }
        const subKeyNames = [...Array(key.count)].map((_, i) => toSubKeyName(name, i));
        const subKeys = await this.key.bulkGet(subKeyNames);
        if (subKeys.some(k => !k)) {
            return undefined;
        }
        const value = Buffer.alloc(key.size);
        let prevSize = 0;
        for (let i = 0; i < key.count; ++i) {
            value.set(subKeys[i].value, prevSize);
            prevSize += subKeys[i].value.byteLength;
        }
        return value;
    }
    async addUserSigningKey({ accountId, key, treeIndex, hashPath }) {
        await this.userKeys.put(new DexieUserKey(new Uint8Array(accountId.toBuffer()), new Uint8Array(key), treeIndex, new Uint8Array(hashPath)));
    }
    async addUserSigningKeys(signingKeys) {
        const dbKeys = signingKeys.map(key => new DexieUserKey(new Uint8Array(key.accountId.toBuffer()), new Uint8Array(key.key), key.treeIndex, new Uint8Array(key.hashPath)));
        await this.userKeys.bulkPut(dbKeys);
    }
    async getUserSigningKeys(accountId) {
        const userKeys = await this.userKeys.where({ accountId: new Uint8Array(accountId.toBuffer()) }).toArray();
        return userKeys.map(dexieUserKeyToSigningKey);
    }
    async getUserSigningKey(accountId, signingKey) {
        const userKey = await this.userKeys.get({
            accountId: new Uint8Array(accountId.toBuffer()),
            key: new Uint8Array(signingKey.toBuffer().slice(0, 32)),
        });
        return userKey ? dexieUserKeyToSigningKey(userKey) : undefined;
    }
    async removeUserSigningKeys(accountId) {
        await this.userKeys.where({ accountId: new Uint8Array(accountId.toBuffer()) }).delete();
    }
    async setAlias(alias) {
        return this.setAliases([alias]);
    }
    async setAliases(aliases) {
        const dbAliases = aliases.map(({ aliasHash, address, latestNonce }) => new DexieAlias(new Uint8Array(aliasHash.toBuffer()), new Uint8Array(address.toBuffer()), latestNonce));
        await this.alias.bulkPut(dbAliases);
    }
    async getAlias(aliasHash, address) {
        const alias = await this.alias.get({
            aliasHash: new Uint8Array(aliasHash.toBuffer()),
            address: new Uint8Array(address.toBuffer()),
        });
        return alias ? dexieAliasToAlias(alias) : undefined;
    }
    async getAliases(aliasHash) {
        const aliases = await this.alias.where({ aliasHash: new Uint8Array(aliasHash.toBuffer()) }).toArray();
        return aliases.map(alias => dexieAliasToAlias(alias));
    }
    async getLatestNonceByAddress(address) {
        var _a;
        const aliases = await this.alias
            .where({
            address: new Uint8Array(address.toBuffer()),
        })
            .reverse()
            .sortBy('latestNonce');
        return (_a = aliases[0]) === null || _a === void 0 ? void 0 : _a.latestNonce;
    }
    async getLatestNonceByAliasHash(aliasHash) {
        var _a;
        const aliases = await this.alias
            .where({
            aliasHash: new Uint8Array(aliasHash.toBuffer()),
        })
            .reverse()
            .sortBy('latestNonce');
        return (_a = aliases[0]) === null || _a === void 0 ? void 0 : _a.latestNonce;
    }
    async getAliasHashByAddress(address, accountNonce) {
        const collection = this.alias
            .where({
            address: new Uint8Array(address.toBuffer()),
        })
            .filter(a => accountNonce === undefined || a.latestNonce >= accountNonce);
        if (accountNonce === undefined) {
            collection.reverse();
        }
        const aliases = await collection.sortBy('latestNonce');
        return aliases.length ? new account_id_1.AliasHash(Buffer.from(aliases[0].aliasHash)) : undefined;
    }
    async getAccountId(aliasHash, accountNonce) {
        const collection = this.alias
            .where({
            aliasHash: new Uint8Array(aliasHash.toBuffer()),
        })
            .filter(a => accountNonce === undefined || a.latestNonce >= accountNonce);
        if (accountNonce === undefined) {
            collection.reverse();
        }
        const [alias] = await collection.sortBy('latestNonce');
        return alias
            ? new account_id_1.AccountId(new address_1.GrumpkinAddress(Buffer.from(alias.address)), accountNonce !== null && accountNonce !== void 0 ? accountNonce : alias.latestNonce)
            : undefined;
    }
    async acquireLock(name, timeout) {
        const now = Date.now();
        await this.mutex.filter(lock => lock.name === name && lock.expiredAt <= now).delete();
        try {
            await this.mutex.add({ name, expiredAt: now + timeout });
            return true;
        }
        catch (e) {
            return false;
        }
    }
    async extendLock(name, timeout) {
        await this.mutex.update(name, { expiredAt: Date.now() + timeout });
    }
    async releaseLock(name) {
        await this.mutex.delete(name);
    }
}
exports.DexieDatabase = DexieDatabase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV4aWVfZGF0YWJhc2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGF0YWJhc2UvZGV4aWVfZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtEQUFzRTtBQUN0RSx5REFBMEU7QUFDMUUsNkRBQXlEO0FBQ3pELHFFQUE0RDtBQUM1RCx5RUFBK0Q7QUFDL0QscURBQWlEO0FBQ2pELDBEQUEwQjtBQUMxQix3Q0FBbUY7QUFDbkYsa0NBQStCO0FBSS9CLE1BQU0sZUFBZSxHQUFHLFNBQVMsQ0FBQztBQUVsQyxNQUFNLFlBQVksR0FBRyxDQUFDLElBQVksRUFBRSxLQUFhLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxLQUFLLEtBQUssRUFBRSxDQUFDO0FBRTFFLE1BQU0sU0FBUztJQUNiLFlBQ1MsS0FBaUIsRUFDakIsT0FBZSxFQUNmLEtBQWEsRUFDYixVQUFzQixFQUN0QixhQUF5QixFQUN6QixjQUEwQixFQUMxQixVQUFzQixFQUN0QixTQUFxQixFQUNyQixVQUFtQixFQUNuQixLQUFhLEVBQ2IsU0FBZ0IsRUFDaEIsT0FBYyxFQUNkLFFBQXFCO1FBWnJCLFVBQUssR0FBTCxLQUFLLENBQVk7UUFDakIsWUFBTyxHQUFQLE9BQU8sQ0FBUTtRQUNmLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixlQUFVLEdBQVYsVUFBVSxDQUFZO1FBQ3RCLGtCQUFhLEdBQWIsYUFBYSxDQUFZO1FBQ3pCLG1CQUFjLEdBQWQsY0FBYyxDQUFZO1FBQzFCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFDdEIsY0FBUyxHQUFULFNBQVMsQ0FBWTtRQUNyQixlQUFVLEdBQVYsVUFBVSxDQUFTO1FBQ25CLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDYixjQUFTLEdBQVQsU0FBUyxDQUFPO1FBQ2hCLFlBQU8sR0FBUCxPQUFPLENBQU87UUFDZCxhQUFRLEdBQVIsUUFBUSxDQUFhO0lBQzNCLENBQUM7Q0FDTDtBQUVELE1BQU0sZUFB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LENBQUMsSUFBSSxZQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDcEQsQ0FBQztJQUVELEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBVSxFQUFFLE1BQWlCO1FBQzlDLE1BQU0sSUFBSSxDQUFDLE1BQU07YUFDZCxLQUFLLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxVQUFVLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsTUFBTSxFQUFFLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxFQUFFLENBQUM7YUFDM0YsTUFBTSxFQUFFLENBQUM7SUFDZCxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFpQjtRQUNoQyxNQUFNLElBQUksR0FBRyxNQUFNLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPO1FBRWxCLE1BQU0sRUFBRSxHQUFHLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztRQUNqRCxNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7UUFDdEQsTUFBTSxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO1FBQzlDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVTtRQUNkLE1BQU0sSUFBSSxD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