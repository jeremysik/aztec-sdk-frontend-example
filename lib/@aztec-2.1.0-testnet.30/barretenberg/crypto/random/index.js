"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.randomBytes = void 0;
const tslib_1 = require("tslib");
const detect_node_1 = (0, tslib_1.__importDefault)(require("detect-node"));
const getWebCrypto = () => {
    if (typeof window !== 'undefined' && window.crypto)
        return window.crypto;
    if (typeof self !== 'undefined' && self.crypto)
        return self.crypto;
    return undefined;
};
const randomBytes = (len) => {
    if (detect_node_1.default) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return require('crypto').randomBytes(len);
    }
    const crypto = getWebCrypto();
    if (crypto) {
        const buf = Buffer.alloc(len);
        crypto.getRandomValues(buf);
        return buf;
    }
    throw new Error('randomBytes UnsupportedEnvironment');
};
exports.randomBytes = randomBytes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY3J5cHRvL3JhbmRvbS9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsMkVBQWlDO0FBRWpDLE1BQU0sWUFBWSxHQUFHLEdBQUcsRUFBRTtJQUN4QixJQUFJLE9BQU8sTUFBTSxLQUFLLFdBQVcsSUFBSSxNQUFNLENBQUMsTUFBTTtRQUFFLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQztJQUN6RSxJQUFJLE9BQU8sSUFBSSxLQUFLLFdBQVcsSUFBSSxJQUFJLENBQUMsTUFBTTtRQUFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNuRSxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDLENBQUM7QUFFSyxNQUFNLFdBQVcsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFO0lBQ3pDLElBQUkscUJBQU0sRUFBRTtRQUNWLDhEQUE4RDtRQUM5RCxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFXLENBQUM7S0FDckQ7SUFFRCxNQUFNLE1BQU0sR0FBRyxZQUFZLEVBQUUsQ0FBQztJQUM5QixJQUFJLE1BQU0sRUFBRTtRQUNWLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDOUIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixPQUFPLEdBQUcsQ0FBQztLQUNaO0lBRUQsTUFBTSxJQUFJLEtBQUssQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0FBQ3hELENBQUMsQ0FBQztBQWRXLFFBQUEsV0FBVyxlQWN0QiJ9