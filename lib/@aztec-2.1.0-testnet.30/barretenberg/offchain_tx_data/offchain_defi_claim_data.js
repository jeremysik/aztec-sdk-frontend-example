"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OffchainDefiClaimData = void 0;
class OffchainDefiClaimData {
    constructor() { }
    static fromBuffer(buf) {
        if (buf.length !== OffchainDefiClaimData.SIZE) {
            throw new Error('Invalid buffer size.');
        }
        return new OffchainDefiClaimData();
    }
    toBuffer() {
        return Buffer.alloc(0);
    }
}
exports.OffchainDefiClaimData = OffchainDefiClaimData;
OffchainDefiClaimData.EMPTY = new OffchainDefiClaimData();
OffchainDefiClaimData.SIZE = 0;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib2ZmY2hhaW5fZGVmaV9jbGFpbV9kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL29mZmNoYWluX3R4X2RhdGEvb2ZmY2hhaW5fZGVmaV9jbGFpbV9kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEscUJBQXFCO0lBSWhDLGdCQUFlLENBQUM7SUFFaEIsTUFBTSxDQUFDLFVBQVUsQ0FBQyxHQUFXO1FBQzNCLElBQUksR0FBRyxDQUFDLE1BQU0sS0FBSyxxQkFBcUIsQ0FBQyxJQUFJLEVBQUU7WUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsT0FBTyxJQUFJLHFCQUFxQixFQUFFLENBQUM7SUFDckMsQ0FBQztJQUVELFFBQVE7UUFDTixPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDekIsQ0FBQzs7QUFoQkgsc0RBaUJDO0FBaEJRLDJCQUFLLEdBQUcsSUFBSSxxQkFBcUIsRUFBRSxDQUFDO0FBQ3BDLDBCQUFJLEdBQUcsQ0FBQyxDQUFDIn0=