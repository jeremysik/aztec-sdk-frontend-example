"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coreUserTxFromJson = exports.coreUserTxToJson = void 0;
const tslib_1 = require("tslib");
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
const core_account_tx_1 = require("./core_account_tx");
const core_defi_tx_1 = require("./core_defi_tx");
const core_payment_tx_1 = require("./core_payment_tx");
tslib_1.__exportStar(require("./core_account_tx"), exports);
tslib_1.__exportStar(require("./core_claim_tx"), exports);
tslib_1.__exportStar(require("./core_defi_tx"), exports);
tslib_1.__exportStar(require("./core_payment_tx"), exports);
const coreUserTxToJson = (tx) => {
    switch (tx.proofId) {
        case client_proofs_1.ProofId.ACCOUNT:
            return (0, core_account_tx_1.coreAccountTxToJson)(tx);
        case client_proofs_1.ProofId.DEFI_DEPOSIT:
            return (0, core_defi_tx_1.coreDefiTxToJson)(tx);
        default:
            return (0, core_payment_tx_1.corePaymentTxToJson)(tx);
    }
};
exports.coreUserTxToJson = coreUserTxToJson;
const coreUserTxFromJson = (json) => {
    switch (json.proofId) {
        case client_proofs_1.ProofId.ACCOUNT:
            return (0, core_account_tx_1.coreAccountTxFromJson)(json);
        case client_proofs_1.ProofId.DEFI_DEPOSIT:
            return (0, core_defi_tx_1.coreDefiTxFromJson)(json);
        default:
            return (0, core_payment_tx_1.corePaymentTxFromJson)(json);
    }
};
exports.coreUserTxFromJson = coreUserTxFromJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvY29yZV90eC9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEscUVBQTREO0FBQzVELHVEQUFpSDtBQUNqSCxpREFBa0c7QUFDbEcsdURBQWlIO0FBRWpILDREQUFrQztBQUNsQywwREFBZ0M7QUFDaEMseURBQStCO0FBQy9CLDREQUFrQztBQUkzQixNQUFNLGdCQUFnQixHQUFHLENBQUMsRUFBYyxFQUFFLEVBQUU7SUFDakQsUUFBUSxFQUFFLENBQUMsT0FBTyxFQUFFO1FBQ2xCLEtBQUssdUJBQU8sQ0FBQyxPQUFPO1lBQ2xCLE9BQU8sSUFBQSxxQ0FBbUIsRUFBQyxFQUFFLENBQUMsQ0FBQztRQUNqQyxLQUFLLHVCQUFPLENBQUMsWUFBWTtZQUN2QixPQUFPLElBQUEsK0JBQWdCLEVBQUMsRUFBRSxDQUFDLENBQUM7UUFDOUI7WUFDRSxPQUFPLElBQUEscUNBQW1CLEVBQUMsRUFBRSxDQUFDLENBQUM7S0FDbEM7QUFDSCxDQUFDLENBQUM7QUFUVyxRQUFBLGdCQUFnQixvQkFTM0I7QUFFSyxNQUFNLGtCQUFrQixHQUFHLENBQUMsSUFBNEQsRUFBRSxFQUFFO0lBQ2pHLFFBQVEsSUFBSSxDQUFDLE9BQU8sRUFBRTtRQUNwQixLQUFLLHVCQUFPLENBQUMsT0FBTztZQUNsQixPQUFPLElBQUEsdUNBQXFCLEVBQUMsSUFBeUIsQ0FBQyxDQUFDO1FBQzFELEtBQUssdUJBQU8sQ0FBQyxZQUFZO1lBQ3ZCLE9BQU8sSUFBQSxpQ0FBa0IsRUFBQyxJQUFzQixDQUFDLENBQUM7UUFDcEQ7WUFDRSxPQUFPLElBQUEsdUNBQXFCLEVBQUMsSUFBeUIsQ0FBQyxDQUFDO0tBQzNEO0FBQ0gsQ0FBQyxDQUFDO0FBVFcsUUFBQSxrQkFBa0Isc0JBUzdCIn0=