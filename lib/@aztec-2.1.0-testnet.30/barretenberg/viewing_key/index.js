"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewingKey = void 0;
const crypto_1 = require("crypto");
const crypto_2 = require("../crypto");
const grumpkin_1 = require("../ecc/grumpkin");
const serialize_1 = require("../serialize");
function deriveAESSecret(ecdhPubKey, ecdhPrivKey, grumpkin) {
    const sharedSecret = grumpkin.mul(ecdhPubKey.toBuffer(), ecdhPrivKey);
    const secretBuffer = Buffer.concat([sharedSecret, (0, serialize_1.numToUInt8)(1)]);
    const hash = (0, crypto_1.createHash)('sha256').update(secretBuffer).digest();
    return hash;
}
class ViewingKey {
    constructor(buffer) {
        if (buffer && buffer.length > 0) {
            if (buffer.length !== ViewingKey.SIZE) {
                throw new Error('Invalid hash buffer.');
            }
            this.buffer = buffer;
        }
        else {
            this.buffer = Buffer.alloc(0);
        }
    }
    static fromString(str) {
        return new ViewingKey(Buffer.from(str, 'hex'));
    }
    static random() {
        return new ViewingKey((0, crypto_2.randomBytes)(ViewingKey.SIZE));
    }
    /**
     * Returns the AES encrypted "viewing key".
     * [AES: [32 bytes value][4 bytes assetId][4 bytes accountNonce][32 bytes creatorPubKey]] [64 bytes ephPubKey]
     * @param noteBuf = Buffer.concat([value, assetId, accountNonce, creatorPubKey]);
     * @param ownerPubKey - the public key contained within a value note
     * @param ephPrivKey - a random field element (also used alongside the ownerPubKey in deriving a value note's secret)
     */
    static createFromEphPriv(noteBuf, ownerPubKey, ephPrivKey, grumpkin) {
        if (noteBuf.length !== 72) {
            throw new Error('Invalid note buffer.');
        }
        const ephPubKey = grumpkin.mul(grumpkin_1.Grumpkin.one, ephPrivKey);
        const aesSecret = deriveAESSecret(ownerPubKey, ephPrivKey, grumpkin);
        const aesKey = aesSecret.slice(0, 16);
        const iv = aesSecret.slice(16, 32);
        const cipher = (0, crypto_1.createCipheriv)('aes-128-cbc', aesKey, iv);
        cipher.setAutoPadding(false); // plaintext is already a multiple of 16 bytes
        const plaintext = Buffer.concat([iv.slice(0, 8), noteBuf]);
        return new ViewingKey(Buffer.concat([cipher.update(plaintext), cipher.final(), ephPubKey]));
    }
    isEmpty() {
        return this.buffer.length === 0;
    }
    equals(rhs) {
        return this.buffer.equals(rhs.buffer);
    }
    toBuffer() {
        return this.buffer;
    }
    toString() {
        return this.toBuffer().toString('hex');
    }
}
exports.ViewingKey = ViewingKey;
ViewingKey.SIZE = 144;
ViewingKey.EMPTY = new ViewingKey();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvdmlld2luZ19rZXkvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW9EO0FBRXBELHNDQUF3QztBQUN4Qyw4Q0FBMkM7QUFDM0MsNENBQTBDO0FBRTFDLFNBQVMsZUFBZSxDQUFDLFVBQTJCLEVBQUUsV0FBbUIsRUFBRSxRQUFrQjtJQUMzRixNQUFNLFlBQVksR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsRUFBRSxXQUFXLENBQUMsQ0FBQztJQUN0RSxNQUFNLFlBQVksR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsWUFBWSxFQUFFLElBQUEsc0JBQVUsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDbEUsTUFBTSxJQUFJLEdBQUcsSUFBQSxtQkFBVSxFQUFDLFFBQVEsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNoRSxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxNQUFhLFVBQVU7SUFLckIsWUFBWSxNQUFlO1FBQ3pCLElBQUksTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQy9CLElBQUksTUFBTSxDQUFDLE1BQU0sS0FBSyxVQUFVLENBQUMsSUFBSSxFQUFFO2dCQUNyQyxNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUM7YUFDekM7WUFDRCxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztTQUN0QjthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQy9CO0lBQ0gsQ0FBQztJQUVELE1BQU0sQ0FBQyxVQUFVLENBQUMsR0FBVztRQUMzQixPQUFPLElBQUksVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUVELE1BQU0sQ0FBQyxNQUFNO1FBQ1gsT0FBTyxJQUFJLFVBQVUsQ0FBQyxJQUFBLG9CQUFXLEVBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVEOzs7Ozs7T0FNRztJQUNILE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxPQUFlLEVBQUUsV0FBNEIsRUFBRSxVQUFrQixFQUFFLFFBQWtCO1FBQzVHLElBQUksT0FBTyxDQUFDLE1BQU0sS0FBSyxFQUFFLEVBQUU7WUFDekIsTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxtQkFBUSxDQUFDLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUN6RCxNQUFNLFNBQVMsR0FBRyxlQUFlLENBQUMsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyRSxNQUFNLE1BQU0sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN0QyxNQUFNLEVBQUUsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNuQyxNQUFNLE1BQU0sR0FBRyxJQUFBLHVCQUFjLEVBQUMsYUFBYSxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN6RCxNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsOENBQThDO1FBQzVFLE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQzNELE9BQU8sSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEVBQUUsTUFBTSxDQUFDLEtBQUssRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM5RixDQUFDO0lBRUQsT0FBTztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFRCxNQUFNLENBQUMsR0FBZTtRQUNwQixPQUFPLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUN4QyxDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBRUQsUUFBUTtRQUNOLE9BQU8sSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDOztBQTVESCxnQ0E2REM7QUE1RFEsZUFBSSxHQUFHLEdBQUcsQ0FBQztBQUNYLGdCQUFLLEdBQUcsSUFBSSxVQUFVLEVBQUUsQ0FBQyJ9