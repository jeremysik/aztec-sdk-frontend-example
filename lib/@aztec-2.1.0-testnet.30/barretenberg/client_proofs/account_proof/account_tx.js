"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountTx = void 0;
const account_id_1 = require("../../account_id");
const address_1 = require("../../address");
const merkle_tree_1 = require("../../merkle_tree");
const serialize_1 = require("../../serialize");
class AccountTx {
    constructor(merkleRoot, accountPublicKey, newAccountPublicKey, newSigningPubKey1, newSigningPubKey2, accountAliasId, migrate, accountIndex, accountPath, signingPubKey) {
        this.merkleRoot = merkleRoot;
        this.accountPublicKey = accountPublicKey;
        this.newAccountPublicKey = newAccountPublicKey;
        this.newSigningPubKey1 = newSigningPubKey1;
        this.newSigningPubKey2 = newSigningPubKey2;
        this.accountAliasId = accountAliasId;
        this.migrate = migrate;
        this.accountIndex = accountIndex;
        this.accountPath = accountPath;
        this.signingPubKey = signingPubKey;
    }
    toBuffer() {
        return Buffer.concat([
            this.merkleRoot,
            this.accountPublicKey.toBuffer(),
            this.newAccountPublicKey.toBuffer(),
            this.newSigningPubKey1.toBuffer(),
            this.newSigningPubKey2.toBuffer(),
            this.accountAliasId.aliasHash.toBuffer32(),
            (0, serialize_1.numToUInt32BE)(this.accountAliasId.accountNonce),
            Buffer.from([this.migrate ? 1 : 0]),
            (0, serialize_1.numToUInt32BE)(this.accountIndex),
            this.accountPath.toBuffer(),
            this.signingPubKey.toBuffer(),
        ]);
    }
    static fromBuffer(buf) {
        let dataStart = 0;
        const merkleRoot = buf.slice(dataStart, dataStart + 32);
        dataStart += 32;
        const accountPublicKey = new address_1.GrumpkinAddress(buf.slice(dataStart, dataStart + 64));
        dataStart += 64;
        const newAccountPublicKey = new address_1.GrumpkinAddress(buf.slice(dataStart, dataStart + 64));
        dataStart += 64;
        const newSigningPubKey1 = new address_1.GrumpkinAddress(buf.slice(dataStart, dataStart + 64));
        dataStart += 64;
        const newSigningPubKey2 = new address_1.GrumpkinAddress(buf.slice(dataStart, dataStart + 64));
        dataStart += 64;
        const aliasHash = new account_id_1.AliasHash(buf.slice(dataStart + 4, dataStart + 32));
        dataStart += 32;
        const accountNonce = buf.readUInt32BE(dataStart);
        dataStart += 4;
        const accountAliasId = new account_id_1.AccountAliasId(aliasHash, accountNonce);
        const migrate = !!buf[dataStart];
        dataStart += 1;
        const accountIndex = buf.readUInt32BE(dataStart);
        dataStart += 4;
        const { elem: accountPath, adv } = merkle_tree_1.HashPath.deserialize(buf, dataStart);
        dataStart += adv;
        const signingPubKey = new address_1.GrumpkinAddress(buf.slice(dataStart, dataStart + 64));
        return new AccountTx(merkleRoot, accountPublicKey, newAccountPublicKey, newSigningPubKey1, newSigningPubKey2, accountAliasId, migrate, accountIndex, accountPath, signingPubKey);
    }
}
exports.AccountTx = AccountTx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3VudF90eC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jbGllbnRfcHJvb2ZzL2FjY291bnRfcHJvb2YvYWNjb3VudF90eC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpREFBNkQ7QUFDN0QsMkNBQWdEO0FBQ2hELG1EQUE2QztBQUM3QywrQ0FBZ0Q7QUFFaEQsTUFBYSxTQUFTO0lBQ3BCLFlBQ1MsVUFBa0IsRUFDbEIsZ0JBQWlDLEVBQ2pDLG1CQUFvQyxFQUNwQyxpQkFBa0MsRUFDbEMsaUJBQWtDLEVBQ2xDLGNBQThCLEVBQzlCLE9BQWdCLEVBQ2hCLFlBQW9CLEVBQ3BCLFdBQXFCLEVBQ3JCLGFBQThCO1FBVDlCLGVBQVUsR0FBVixVQUFVLENBQVE7UUFDbEIscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUNqQyx3QkFBbUIsR0FBbkIsbUJBQW1CLENBQWlCO1FBQ3BDLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBaUI7UUFDbEMsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFpQjtRQUNsQyxtQkFBYyxHQUFkLGNBQWMsQ0FBZ0I7UUFDOUIsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUNoQixpQkFBWSxHQUFaLFlBQVksQ0FBUTtRQUNwQixnQkFBVyxHQUFYLFdBQVcsQ0FBVTtRQUNyQixrQkFBYSxHQUFiLGFBQWEsQ0FBaUI7SUFDcEMsQ0FBQztJQUVKLFFBQVE7UUFDTixPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUM7WUFDbkIsSUFBSSxDQUFDLFVBQVU7WUFDZixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFO1lBQ2hDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxRQUFRLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsRUFBRTtZQUNqQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLFVBQVUsRUFB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