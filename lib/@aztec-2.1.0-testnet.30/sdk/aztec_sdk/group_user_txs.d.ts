import { CoreUserTx } from '../core_tx';
import { UserAccountTx, UserDefiClaimTx, UserDefiTx, UserPaymentTx } from '../user_tx';
export declare const groupUserTxs: (txs: CoreUserTx[]) => (UserAccountTx | UserDefiTx | UserDefiClaimTx | UserPaymentTx)[];
//# sourceMappingURL=group_user_txs.d.ts.map