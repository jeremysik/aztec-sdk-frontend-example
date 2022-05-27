"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deriveNoteSecret = void 0;
const crypto_1 = require("crypto");
const serialize_1 = require("../serialize");
function deriveNoteSecret(ecdhPubKey, ecdhPrivKey, grumpkin) {
    const sharedSecret = grumpkin.mul(ecdhPubKey.toBuffer(), ecdhPrivKey);
    const secretBufferA = Buffer.concat([sharedSecret, (0, serialize_1.numToUInt8)(2)]);
    const secretBufferB = Buffer.concat([sharedSecret, (0, serialize_1.numToUInt8)(3)]);
    const hashA = (0, crypto_1.createHash)('sha256').update(secretBufferA).digest();
    const hashB = (0, crypto_1.createHash)('sha256').update(secretBufferB).digest();
    const hash = Buffer.concat([hashA, hashB]);
    // Note: to get close to uniformly-distributed field elements, we need to start with 512-bits before modulo
    // reduction (not 256) - hence why we hash _twice_ and concatenate above.
    return grumpkin.reduce512BufferToFr(hash);
}
exports.deriveNoteSecret = deriveNoteSecret;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVyaXZlX25vdGVfc2VjcmV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL25vdGVfYWxnb3JpdGhtcy9kZXJpdmVfbm90ZV9zZWNyZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW9DO0FBR3BDLDRDQUEwQztBQUUxQyxTQUFnQixnQkFBZ0IsQ0FBQyxVQUEyQixFQUFFLFdBQW1CLEVBQUUsUUFBa0I7SUFDbkcsTUFBTSxZQUFZLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsV0FBVyxDQUFDLENBQUM7SUFDdEUsTUFBTSxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLFlBQVksRUFBRSxJQUFBLHNCQUFVLEVBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ25FLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsQ0FBQyxZQUFZLEVBQUUsSUFBQSxzQkFBVSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUNuRSxNQUFNLEtBQUssR0FBRyxJQUFBLG1CQUFVLEVBQUMsUUFBUSxDQUFDLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ2xFLE1BQU0sS0FBSyxHQUFHLElBQUEsbUJBQVUsRUFBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDbEUsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQyxDQUFDO0lBQzNDLDJHQUEyRztJQUMzRyx5RUFBeUU7SUFDekUsT0FBTyxRQUFRLENBQUMsbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDNUMsQ0FBQztBQVZELDRDQVVDIn0=