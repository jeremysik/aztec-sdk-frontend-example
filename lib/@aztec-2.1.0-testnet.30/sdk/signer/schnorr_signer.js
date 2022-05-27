"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchnorrSigner = void 0;
class SchnorrSigner {
    constructor(schnorr, publicKey, privateKey) {
        this.schnorr = schnorr;
        this.publicKey = publicKey;
        this.privateKey = privateKey;
    }
    getPublicKey() {
        return this.publicKey;
    }
    async signMessage(message) {
        return this.schnorr.constructSignature(message, this.privateKey);
    }
}
exports.SchnorrSigner = SchnorrSigner;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nobm9ycl9zaWduZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2lnbmVyL3NjaG5vcnJfc2lnbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQVFBLE1BQWEsYUFBYTtJQUN4QixZQUFvQixPQUFnQixFQUFVLFNBQTBCLEVBQVUsVUFBa0I7UUFBaEYsWUFBTyxHQUFQLE9BQU8sQ0FBUztRQUFVLGNBQVMsR0FBVCxTQUFTLENBQWlCO1FBQVUsZUFBVSxHQUFWLFVBQVUsQ0FBUTtJQUFHLENBQUM7SUFFeEcsWUFBWTtRQUNWLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDO0lBRUQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFlO1FBQy9CLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FDRjtBQVZELHNDQVVDIn0=