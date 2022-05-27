"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerRollupProvider = void 0;
const account_id_1 = require("../account_id");
const asset_1 = require("../asset");
const block_source_1 = require("../block_source");
const iso_fetch_1 = require("../iso_fetch");
const tx_id_1 = require("../tx_id");
const rollup_provider_1 = require("./rollup_provider");
const rollup_provider_status_1 = require("./rollup_provider_status");
class ServerRollupProvider extends block_source_1.ServerBlockSource {
    constructor(baseUrl, pollInterval = 10000) {
        super(baseUrl, pollInterval);
    }
    async sendTxs(txs) {
        const data = txs.map(rollup_provider_1.txToJson);
        const response = await this.fetch('/txs', data);
        const body = await response.json();
        return body.txIds.map(txId => tx_id_1.TxId.fromString(txId));
    }
    async getTxFees(assetId) {
        const response = await this.fetch('/tx-fees', { assetId });
        const txFees = (await response.json());
        return txFees.map(fees => fees.map(asset_1.assetValueFromJson));
    }
    async getDefiFees(bridgeId) {
        const response = await this.fetch('/defi-fees', { bridgeId: bridgeId.toString() });
        const defiFees = (await response.json());
        return defiFees.map(asset_1.assetValueFromJson);
    }
    async getStatus() {
        const response = await this.fetch('/status');
        try {
            return (0, rollup_provider_status_1.rollupProviderStatusFromJson)(await response.json());
        }
        catch (err) {
            throw new Error('Bad response: getStatus()');
        }
    }
    async getPendingTxs() {
        const response = await this.fetch('/get-pending-txs');
        const txs = await response.json();
        return txs.map(rollup_provider_1.pendingTxFromJson);
    }
    async getPendingNoteNullifiers() {
        const response = await this.fetch('/get-pending-note-nullifiers');
        const nullifiers = (await response.json());
        return nullifiers.map(n => Buffer.from(n, 'hex'));
    }
    async clientLog(log) {
        await this.fetch('/client-log', log);
    }
    async getInitialWorldState() {
        const response = await this.fetch('/get-initial-world-state');
        const arrBuffer = await response.arrayBuffer();
        return {
            initialAccounts: Buffer.from(arrBuffer),
        };
    }
    async getLatestAccountNonce(accountPubKey) {
        const response = await this.fetch('/get-latest-account-nonce', {
            accountPubKey: accountPubKey.toString(),
        });
        return +(await response.text());
    }
    async getLatestAliasNonce(alias) {
        const response = await this.fetch('/get-latest-alias-nonce', { alias });
        return +(await response.text());
    }
    async getAccountId(alias, accountNonce) {
        const response = await this.fetch('/get-account-id', { alias, accountNonce });
        const accountId = await response.text();
        return accountId ? account_id_1.AccountId.fromString(accountId) : undefined;
    }
    async getUnsettledAccountTxs() {
        const response = await this.fetch('/get-unsettled-account-txs');
        const txs = await response.json();
        return txs.map(rollup_provider_1.accountTxFromJson);
    }
    async getUnsettledPaymentTxs() {
        const response = await this.fetch('/get-unsettled-payment-txs');
        const txs = await response.json();
        return txs.map(rollup_provider_1.joinSplitTxFromJson);
    }
    async fetch(path, data) {
        const url = new URL(`${this.baseUrl}${path}`);
        const init = data ? { method: 'POST', body: JSON.stringify(data) } : undefined;
        const response = await (0, iso_fetch_1.fetch)(url.toString(), init).catch(() => undefined);
        if (!response) {
            throw new Error('Failed to contact rollup provider.');
        }
        if (response.status === 400) {
            const body = await response.json();
            throw new Error(body.error);
        }
        if (response.status !== 200) {
            throw new Error(`Bad response code ${response.status}.`);
        }
        return response;
    }
}
exports.ServerRollupProvider = ServerRollupProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyX3JvbGx1cF9wcm92aWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9yb2xsdXBfcHJvdmlkZXIvc2VydmVyX3JvbGx1cF9wcm92aWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4Q0FBMEM7QUFFMUMsb0NBQThEO0FBQzlELGtEQUFvRDtBQUVwRCw0Q0FBcUM7QUFFckMsb0NBQWdDO0FBQ2hDLHVEQUF3SDtBQUN4SCxxRUFBd0U7QUFFeEUsTUFBYSxvQkFBcUIsU0FBUSxnQ0FBaUI7SUFDekQsWUFBWSxPQUFZLEVBQUUsWUFBWSxHQUFHLEtBQUs7UUFDNUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMvQixDQUFDO0lBRUQsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFTO1FBQ3JCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsMEJBQVEsQ0FBQyxDQUFDO1FBQy9CLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEQsTUFBTSxJQUFJLEdBQUcsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDbkMsT0FBTyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQsS0FBSyxDQUFDLFNBQVMsQ0FBQyxPQUFlO1FBQzdCLE1BQU0sUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQUUsRUFBRSxPQUFPLEVBQUUsQ0FBQyxDQUFDO1FBQzNELE1BQU0sTUFBTSxHQUFHLENBQUMsTUFBTSxRQUFRLENBQUMsSUFBSSxFQUFFLENBQXVCLENBQUM7UUFDN0QsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxF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