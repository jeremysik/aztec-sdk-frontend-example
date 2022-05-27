"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InitHelpers = void 0;
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const bigint_buffer_1 = require("../../bigint_buffer");
const pathTools = (0, tslib_1.__importStar)(require("path"));
const init_config_1 = require("./init_config");
const NOTE_LENGTH = 32;
const ADDRESS_LENGTH = 64;
const ALIAS_HASH_LENGTH = 28;
const NULLIFIER_LENGTH = 32;
const SIGNING_KEY_LENGTH = 32;
class InitHelpers {
    static getInitData(chainId) {
        return {
            roots: InitHelpers.getInitRoots(chainId),
            dataTreeSize: InitHelpers.getInitDataSize(chainId),
        };
    }
    static getInitRoots(chainId) {
        const { initDataRoot, initNullRoot, initRootsRoot } = (0, init_config_1.getInitData)(chainId).initRoots;
        return {
            dataRoot: Buffer.from(initDataRoot, 'hex'),
            nullRoot: Buffer.from(initNullRoot, 'hex'),
            rootsRoot: Buffer.from(initRootsRoot, 'hex'),
        };
    }
    static getInitDataSize(chainId) {
        return (0, init_config_1.getInitData)(chainId).initDataSize;
    }
    static getInitAccounts(chainId) {
        return (0, init_config_1.getInitData)(chainId).initAccounts;
    }
    static getAccountDataFile(chainId) {
        if (!(0, init_config_1.getInitData)(chainId).accountsData) {
            return undefined;
        }
        const relPathToFile = (0, init_config_1.getInitData)(chainId).accountsData;
        const fullPath = pathTools.resolve(__dirname, relPathToFile);
        return fullPath;
    }
    static getRootDataFile(chainId) {
        if (!(0, init_config_1.getInitData)(chainId).roots) {
            return undefined;
        }
        const relPathToFile = (0, init_config_1.getInitData)(chainId).roots;
        const fullPath = pathTools.resolve(__dirname, relPathToFile);
        return fullPath;
    }
    static async writeData(filePath, data) {
        const path = pathTools.resolve(__dirname, filePath);
        const fileHandle = await fs_1.promises.open(path, 'w');
        const { bytesWritten } = await fileHandle.write(data);
        await fileHandle.close();
        return bytesWritten;
    }
    static async readData(filePath) {
        const path = pathTools.resolve(__dirname, filePath);
        try {
            const fileHandle = await fs_1.promises.open(path, 'r');
            const data = await fileHandle.readFile();
            await fileHandle.close();
            return data;
        }
        catch (err) {
            console.log(`Failed to read file: ${path}. Error: ${err}`);
            return Buffer.alloc(0);
        }
    }
    static async writeAccountTreeData(accountData, filePath) {
        accountData.forEach(account => {
            if (account.notes.note1.length !== NOTE_LENGTH) {
                throw new Error(`Note1 has length ${account.notes.note1.length}, it should be ${NOTE_LENGTH}`);
            }
            if (account.notes.note2.length !== NOTE_LENGTH) {
                throw new Error(`Note2 has length ${account.notes.note2.length}, it should be ${NOTE_LENGTH}`);
            }
            if (account.alias.aliasHash.length !== ALIAS_HASH_LENGTH) {
                throw new Error(`Alias hash has length ${account.alias.aliasHash.length}, it should be ${ALIAS_HASH_LENGTH}`);
            }
            if (account.alias.address.length !== ADDRESS_LENGTH) {
                throw new Error(`Alias grumpkin address has length ${account.alias.address.length}, it should be ${ADDRESS_LENGTH}`);
            }
            if (account.nullifier.length !== NULLIFIER_LENGTH) {
                throw new Error(`Nullifier has length ${account.nullifier.length}, it should be ${NULLIFIER_LENGTH}`);
            }
            if (account.signingKeys.signingKey1.length !== SIGNING_KEY_LENGTH) {
                throw new Error(`Signing Key 1 has length ${account.signingKeys.signingKey1.length}, it should be ${SIGNING_KEY_LENGTH}`);
            }
            if (account.signingKeys.signingKey2.length !== SIGNING_KEY_LENGTH) {
                throw new Error(`Signing Key 2 has length ${account.signingKeys.signingKey2.length}, it should be ${SIGNING_KEY_LENGTH}`);
            }
        });
        const dataToWrite = accountData.flatMap(account => {
            const nonBuf = Buffer.alloc(4);
            nonBuf.writeUInt32BE(account.alias.accountNonce);
            return [
                nonBuf,
                account.alias.aliasHash,
                account.alias.address,
                account.notes.note1,
                account.notes.note2,
                account.nullifier,
                account.signingKeys.signingKey1,
                account.signingKeys.signingKey2,
            ];
        });
        return await this.writeData(filePath, Buffer.concat(dataToWrite));
    }
    static parseAccountTreeData(data) {
        const lengthOfAccountData = 4 + ALIAS_HASH_LENGTH + ADDRESS_LENGTH + 2 * NOTE_LENGTH + NULLIFIER_LENGTH + 2 * SIGNING_KEY_LENGTH;
        const numAccounts = data.length / lengthOfAccountData;
        if (numAccounts === 0) {
            return [];
        }
        const accounts = new Array(numAccounts);
        for (let i = 0; i < numAccounts; i++) {
            let start = i * lengthOfAccountData;
            const alias = {
                accountNonce: data.readUInt32BE(start),
                aliasHash: data.slice(start + 4, start + (4 + ALIAS_HASH_LENGTH)),
                address: data.slice(start + (4 + ALIAS_HASH_LENGTH), start + (4 + ALIAS_HASH_LENGTH + ADDRESS_LENGTH)),
            };
            start += 4 + ALIAS_HASH_LENGTH + ADDRESS_LENGTH;
            const notes = {
                note1: data.slice(start, start + NOTE_LENGTH),
                note2: data.slice(start + NOTE_LENGTH, start + 2 * NOTE_LENGTH),
            };
            start += 2 * NOTE_LENGTH;
            const nullifier = data.slice(start, start + NULLIFIER_LENGTH);
            start += NULLIFIER_LENGTH;
            const signingKeys = {
                signingKey1: data.slice(start, start + SIGNING_KEY_LENGTH),
                signingKey2: data.slice(start + SIGNING_KEY_LENGTH, start + 2 * SIGNING_KEY_LENGTH),
            };
            const account = {
                notes,
                nullifier,
                alias,
                signingKeys,
            };
            accounts[i] = account;
        }
        return accounts;
    }
    static async readAccountTreeData(filePath) {
        const data = await this.readData(filePath);
        return this.parseAccountTreeData(data);
    }
    static async populateDataAndRootsTrees(accounts, merkleTree, dataTreeIndex, rootsTreeIndex, rollupSize) {
        const entries = accounts.flatMap((account, index) => {
            return [
                {
                    treeId: dataTreeIndex,
                    index: BigInt(index * 2),
                    value: account.notes.note1,
                },
                {
                    treeId: dataTreeIndex,
                    index: BigInt(1 + index * 2),
                    value: account.notes.note2,
                },
            ];
        });
        console.log(`Batch inserting ${entries.length} notes into data tree...`);
        await merkleTree.batchPut(entries);
        if (rollupSize) {
            // we need to expand the data tree to have 'full' rollups worth of notes in
            const numFullRollups = Math.floor(entries.length / rollupSize);
            const additional = entries.length % rollupSize ? 1 : 0;
            const notesRequired = (numFullRollups + additional) * rollupSize;
            if (notesRequired > entries.length) {
                await merkleTree.put(dataTreeIndex, BigInt(notesRequired - 1), Buffer.alloc(32, 0));
            }
        }
        const dataRoot = merkleTree.getRoot(dataTreeIndex);
        await merkleTree.put(rootsTreeIndex, BigInt(0), dataRoot);
        const rootsRoot = merkleTree.getRoot(rootsTreeIndex);
        const dataSize = merkleTree.getSize(dataTreeIndex);
        return { dataRoot, rootsRoot, dataSize };
    }
    static async populateNullifierTree(accounts, merkleTree, nullTreeIndex) {
        const emptyBuffer = Buffer.alloc(32, 0);
        const entries = accounts.flatMap((account) => {
            const nullifiers = [];
            if (account.nullifier.compare(emptyBuffer)) {
                nullifiers.push({
                    treeId: nullTreeIndex,
                    index: (0, bigint_buffer_1.toBigIntBE)(account.nullifier),
                    value: (0, bigint_buffer_1.toBufferBE)(BigInt(1), 32),
                });
            }
            return nullifiers;
        });
        console.log(`Batch inserting ${entries.length} notes into nullifier tree...`);
        await merkleTree.batchPut(entries);
        const root = merkleTree.getRoot(nullTreeIndex);
        return root;
    }
}
exports.InitHelpers = InitHelpers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9lbnZpcm9ubWVudC9pbml0L2luaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLDJCQUFvQztBQUVwQyx1REFBNkQ7QUFDN0QsNkRBQWtDO0FBQ2xDLCtDQUE0QztBQUU1QyxNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7QUFDdkIsTUFBTSxjQUFjLEdBQUcsRUFBRSxDQUFDO0FBQzFCLE1BQU0saUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBQzdCLE1BQU0sZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO0FBQzVCLE1BQU0sa0JBQWtCLEdBQUcsRUFBRSxDQUFDO0FBb0M5QixNQUFhLFdBQVc7SUFDZixNQUFNLENBQUMsV0FBVyxDQUFDLE9BQWU7UUFDdkMsT0FBTztZQUNMLEtBQUssRUFBRSxXQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQztZQUN4QyxZQUFZLEVBQUUsV0FBVyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUM7U0FDbkQsQ0FBQztJQUNKLENBQUM7SUFFTSxNQUFNLENBQUMsWUFBWSxDQUFDLE9BQWU7UUFDeEMsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsYUFBYSxFQUFFLEdBQUcsSUFBQSx5QkFBVyxFQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsQ0FBQztRQUNyRixPQUFPO1lBQ0wsUUFBUSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQztZQUMxQyxRQUFRLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDO1lBQzFDLFNBQVMsRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxLQUFLLENBQUM7U0FDN0MsQ0FBQztJQUNKLENBQUM7SUFFTSxNQUFNLENBQUMsZUFBZSxDQUFDLE9BQWU7UUFDM0MsT0FBTyxJQUFBLHlCQUFXLEVBQUMsT0FBTyxDQUFDLENBQUMs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