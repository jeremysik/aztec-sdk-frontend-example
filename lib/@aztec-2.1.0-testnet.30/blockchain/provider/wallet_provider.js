"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletProvider = void 0;
const ethers_1 = require("ethers");
const address_1 = require("@aztec/barretenberg/address");
const ethers_adapter_1 = require("./ethers_adapter");
const providers_1 = require("@ethersproject/providers");
/**
 * Given an EIP1193 provider, wraps it, and provides the ability to add local accounts.
 */
class WalletProvider {
    constructor(provider) {
        this.provider = provider;
        this.accounts = [];
    }
    static fromHost(ethereumHost) {
        const ethersProvider = new providers_1.JsonRpcProvider(ethereumHost);
        return new WalletProvider(new ethers_adapter_1.EthersAdapter(ethersProvider));
    }
    addAccount(privateKey) {
        return this.addEthersWallet(new ethers_1.Wallet(privateKey, new providers_1.Web3Provider(this.provider)));
    }
    addAccountFromSeed(mnemonic, path) {
        return this.addEthersWallet(ethers_1.Wallet.fromMnemonic(mnemonic, path).connect(new providers_1.Web3Provider(this.provider)));
    }
    addEthersWallet(wallet) {
        this.accounts.push(wallet);
        return address_1.EthAddress.fromString(wallet.address);
    }
    getAccounts() {
        return this.accounts.map(a => address_1.EthAddress.fromString(a.address));
    }
    getAccount(account) {
        return address_1.EthAddress.fromString(this.accounts[account].address);
    }
    getPrivateKey(account) {
        return Buffer.from(this.accounts[account].privateKey.slice(2), 'hex');
    }
    getPrivateKeyForAddress(account) {
        const wallet = this.accounts.find(w => account.equals(address_1.EthAddress.fromString(w.address)));
        return wallet ? Buffer.from(wallet.privateKey.slice(2), 'hex') : undefined;
    }
    async request(args) {
        switch (args.method) {
            case 'eth_accounts':
                return this.accounts.length ? this.accounts.map(a => a.address) : await this.provider.request(args);
            case 'eth_sign':
                return await this.sign(args);
            case 'personal_sign':
                return await this.personalSign(args);
            case 'eth_signTypedData_v4':
                return this.signTypedData(args);
            case 'eth_signTransaction':
                return this.signTransaction(args);
            case 'eth_sendTransaction':
                return this.sendTransaction(args);
            default: {
                return await this.provider.request(args);
            }
        }
    }
    async personalSign(args) {
        const [message, from] = args.params;
        const account = this.accounts.find(a => a.address.toLowerCase() === from);
        if (account) {
            return await account.signMessage(Buffer.from(message.slice(2), 'hex'));
        }
        return await this.provider.request(args);
    }
    async sign(args) {
        const [from, message] = args.params;
        const account = this.accounts.find(a => a.address.toLowerCase() === from);
        if (account) {
            return await account.signMessage(Buffer.from(message.slice(2), 'hex'));
        }
        return await this.provider.request(args);
    }
    async signTypedData(args) {
        const [from, data] = args.params;
        const { types, domain, message } = JSON.parse(data);
        const account = this.accounts.find(a => a.address.toLowerCase() === from);
        if (account) {
            delete types.EIP712Domain;
            return await account._signTypedData(domain, types, message);
        }
        return this.provider.request(args);
    }
    /**
     * Given a tx in Eth Json Rpc format, convert to ethers format and give to account to sign.
     * Populate any missing fields.
     */
    async signTxLocally(tx, account) {
        const { gas = null, value = 0, from, to, data, nonce = null } = tx;
        const txReq = {
            from,
            to,
            data,
            gasLimit: gas,
            value,
            nonce,
        };
        const toSign = await account.populateTransaction(txReq);
        return await account.signTransaction(toSign);
    }
    async signTransaction(args) {
        const tx = args.params[0];
        const account = this.accounts.find(a => a.address.toLowerCase() === tx.from.toLowerCase());
        if (account) {
            return this.signTxLocally(tx, account);
        }
        return this.provider.request(args);
    }
    async sendTransaction(args) {
        const tx = args.params[0];
        const account = this.accounts.find(a => a.address.toLowerCase() === tx.from.toLowerCase());
        if (account) {
            const result = await this.signTxLocally(tx, account);
            return this.provider.request({ method: 'eth_sendRawTransaction', params: [result] });
        }
        return this.provider.request(args);
    }
    on(notification, listener) {
        return this.provider.on(notification, listener);
    }
    removeListener(notification, listener) {
        return this.provider.removeListener(notification, listener);
    }
}
exports.WalletProvider = WalletProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2FsbGV0X3Byb3ZpZGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3Byb3ZpZGVyL3dhbGxldF9wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFPQSxtQ0FBZ0M7QUFDaEMseURBQXlEO0FBQ3pELHFEQUFpRDtBQUNqRCx3REFBNkY7QUFFN0Y7O0dBRUc7QUFDSCxNQUFhLGNBQWM7SUFHekIsWUFBb0IsUUFBMEI7UUFBMUIsYUFBUSxHQUFSLFFBQVEsQ0FBa0I7UUFGdEMsYUFBUSxHQUFhLEVBQUUsQ0FBQztJQUVpQixDQUFDO0lBRTNDLE1BQU0sQ0FBQyxRQUFRLENBQUMsWUFBb0I7UUFDekMsTUFBTSxjQUFjLEdBQUcsSUFBSSwyQkFBZSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ3pELE9BQU8sSUFBSSxjQUFjLENBQUMsSUFBSSw4QkFBYSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7SUFDL0QsQ0FBQztJQUVNLFVBQVUsQ0FBQyxVQUFrQjtRQUNsQyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxlQUFNLENBQUMsVUFBVSxFQUFFLElBQUksd0JBQVksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ3ZGLENBQUM7SUFFTSxrQkFBa0IsQ0FBQyxRQUFnQixFQUFFLElBQVk7UUFDdEQsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLGVBQU0sQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLHdCQUFZLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1RyxDQUFDO0lBRU8sZUFBZSxDQUFDLE1BQWM7UUFDcEMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDM0IsT0FBTyxvQkFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7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