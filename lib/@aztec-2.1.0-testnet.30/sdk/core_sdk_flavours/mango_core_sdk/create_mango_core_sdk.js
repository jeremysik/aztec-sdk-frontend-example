"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMangoCoreSdk = void 0;
const tslib_1 = require("tslib");
const levelup_1 = tslib_1.__importDefault(require("levelup"));
const core_sdk_1 = require("../../core_sdk");
const banana_core_sdk_1 = require("../banana_core_sdk");
const vanilla_core_sdk_1 = require("../vanilla_core_sdk");
const mango_core_sdk_1 = require("./mango_core_sdk");
function getLevelDb() {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    return (0, levelup_1.default)(require('level-js')(`aztec2-sdk-auth`));
}
async function createMangoCoreSdk(origin, options) {
    const coreSdk = typeof window.SharedWorker !== 'undefined'
        ? await (0, banana_core_sdk_1.createBananaCoreSdk)(options)
        : await (0, vanilla_core_sdk_1.createVanillaCoreSdk)(options);
    const db = getLevelDb();
    return new mango_core_sdk_1.MangoCoreSdk(new core_sdk_1.CoreSdkServerStub(coreSdk), origin, db);
}
exports.createMangoCoreSdk = createMangoCoreSdk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX21hbmdvX2NvcmVfc2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmVfc2RrX2ZsYXZvdXJzL21hbmdvX2NvcmVfc2RrL2NyZWF0ZV9tYW5nb19jb3JlX3Nkay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsOERBQTJDO0FBQzNDLDZDQUFtRDtBQUNuRCx3REFBeUQ7QUFDekQsMERBQTJEO0FBQzNELHFEQUFnRDtBQUdoRCxTQUFTLFVBQVU7SUFDakIsOERBQThEO0lBQzlELE9BQU8sSUFBQSxpQkFBTyxFQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUVNLEtBQUssVUFBVSxrQkFBa0IsQ0FBQyxNQUFjLEVBQUUsT0FBNEI7SUFDbkYsTUFBTSxPQUFPLEdBQ1gsT0FBTyxNQUFNLENBQUMsWUFBWSxLQUFLLFdBQVc7UUFDeEMsQ0FBQyxDQUFDLE1BQU0sSUFBQSxxQ0FBbUIsRUFBQyxPQUFPLENBQUM7UUFDcEMsQ0FBQyxDQUFDLE1BQU0sSUFBQSx1Q0FBb0IsRUFBQyxPQUFPLENBQUMsQ0FBQztJQUMxQyxNQUFNLEVBQUUsR0FBRyxVQUFVLEVBQUUsQ0FBQztJQUN4QixPQUFPLElBQUksNkJBQVksQ0FBQyxJQUFJLDRCQUFpQixDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxFQUFFLENBQUMsQ0FBQztBQUN0RSxDQUFDO0FBUEQsZ0RBT0MifQ==