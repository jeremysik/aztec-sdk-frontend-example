"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDefiTx = exports.UserDefiInteractionResultState = void 0;
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
var UserDefiInteractionResultState;
(function (UserDefiInteractionResultState) {
    UserDefiInteractionResultState["PENDING"] = "PENDING";
    UserDefiInteractionResultState["AWAITING_FINALISATION"] = "AWAITING_FINALISATION";
    UserDefiInteractionResultState["AWAITING_SETTLEMENT"] = "AWAITING_SETTLEMENT";
    UserDefiInteractionResultState["SETTLED"] = "SETTLED";
})(UserDefiInteractionResultState = exports.UserDefiInteractionResultState || (exports.UserDefiInteractionResultState = {}));
class UserDefiTx {
    constructor(txId, userId, bridgeId, depositValue, fee, created, settled, interactionResult) {
        this.txId = txId;
        this.userId = userId;
        this.bridgeId = bridgeId;
        this.depositValue = depositValue;
        this.fee = fee;
        this.created = created;
        this.settled = settled;
        this.interactionResult = interactionResult;
        this.proofId = client_proofs_1.ProofId.DEFI_DEPOSIT;
    }
}
exports.UserDefiTx = UserDefiTx;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcl9kZWZpX3R4LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3VzZXJfdHgvdXNlcl9kZWZpX3R4LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUdBLHFFQUE0RDtBQUc1RCxJQUFZLDhCQUtYO0FBTEQsV0FBWSw4QkFBOEI7SUFDeEMscURBQW1CLENBQUE7SUFDbkIsaUZBQStDLENBQUE7SUFDL0MsNkVBQTJDLENBQUE7SUFDM0MscURBQW1CLENBQUE7QUFDckIsQ0FBQyxFQUxXLDhCQUE4QixHQUE5QixzQ0FBOEIsS0FBOUIsc0NBQThCLFFBS3pDO0FBYUQsTUFBYSxVQUFVO0lBR3JCLFlBQ2tCLElBQVUsRUFDVixNQUFpQixFQUNqQixRQUFrQixFQUNsQixZQUF3QixFQUN4QixHQUFlLEVBQ2YsT0FBYSxFQUNiLE9BQXlCLEVBQ3pCLGlCQUE0QztRQVA1QyxTQUFJLEdBQUosSUFBSSxDQUFNO1FBQ1YsV0FBTSxHQUFOLE1BQU0sQ0FBVztRQUNqQixhQUFRLEdBQVIsUUFBUSxDQUFVO1FBQ2xCLGlCQUFZLEdBQVosWUFBWSxDQUFZO1FBQ3hCLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFDZixZQUFPLEdBQVAsT0FBTyxDQUFNO1FBQ2IsWUFBTyxHQUFQLE9BQU8sQ0FBa0I7UUFDekIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUEyQjtRQVY5QyxZQUFPLEdBQUcsdUJBQU8sQ0FBQyxZQUFZLENBQUM7SUFXNUMsQ0FBQztDQUNMO0FBYkQsZ0NBYUMifQ==