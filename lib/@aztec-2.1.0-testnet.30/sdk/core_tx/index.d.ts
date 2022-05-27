import { CoreAccountTx, CoreAccountTxJson } from './core_account_tx';
import { CoreDefiTx, CoreDefiTxJson } from './core_defi_tx';
import { CorePaymentTx, CorePaymentTxJson } from './core_payment_tx';
export * from './core_account_tx';
export * from './core_claim_tx';
export * from './core_defi_tx';
export * from './core_payment_tx';
export declare type CoreUserTx = CoreAccountTx | CorePaymentTx | CoreDefiTx;
export declare const coreUserTxToJson: (tx: CoreUserTx) => CoreAccountTxJson | CoreDefiTxJson | CorePaymentTxJson;
export declare const coreUserTxFromJson: (json: CoreAccountTxJson | CorePaymentTxJson | CoreDefiTxJson) => CoreAccountTx | CoreDefiTx | CorePaymentTx;
//# sourceMappingURL=index.d.ts.map