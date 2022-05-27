"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createVanillaCoreSdk = exports.getDb = exports.getLevelDb = void 0;
const tslib_1 = require("tslib");
const crypto_1 = require("@aztec/barretenberg/crypto");
const fft_1 = require("@aztec/barretenberg/fft");
const pippenger_1 = require("@aztec/barretenberg/pippenger");
const rollup_provider_1 = require("@aztec/barretenberg/rollup_provider");
const wasm_1 = require("@aztec/barretenberg/wasm");
const detect_node_1 = tslib_1.__importDefault(require("detect-node"));
const fs_1 = require("fs");
const levelup_1 = tslib_1.__importDefault(require("levelup"));
const typeorm_1 = require("typeorm");
const core_sdk_1 = require("../../core_sdk");
const database_1 = require("../../database");
const get_num_workers_1 = require("../get_num_workers");
function getLevelDb(memoryDb = false, identifier) {
    if (detect_node_1.default) {
        const folder = identifier ? `/${identifier}` : '';
        const dbPath = `./data${folder}`;
        if (memoryDb) {
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            return (0, levelup_1.default)(require('memdown')());
        }
        else {
            (0, fs_1.mkdirSync)(dbPath, { recursive: true });
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            return (0, levelup_1.default)(require('leveldown')(`${dbPath}/aztec2-sdk.db`));
        }
    }
    else {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        return (0, levelup_1.default)(require('level-js')(`aztec2-sdk`));
    }
}
exports.getLevelDb = getLevelDb;
async function getDb(memoryDb = false, identifier) {
    if (detect_node_1.default) {
        const config = (0, database_1.getOrmConfig)(memoryDb, identifier);
        const connection = await (0, typeorm_1.createConnection)(config);
        return new database_1.SQLDatabase(connection);
    }
    else {
        return new database_1.DexieDatabase();
    }
}
exports.getDb = getDb;
/**
 * Construct a vanilla version of the CodeSdk.
 * This is used in backend node apps.
 * Dapps should use either strawberry or chocolate.
 */
async function createVanillaCoreSdk(options) {
    const { numWorkers = (0, get_num_workers_1.getNumWorkers)() } = options;
    const wasm = await wasm_1.BarretenbergWasm.new();
    const workerPool = await wasm_1.WorkerPool.new(wasm, numWorkers);
    const pedersen = new crypto_1.PooledPedersen(wasm, workerPool);
    const pippenger = new pippenger_1.PooledPippenger(workerPool);
    const fftFactory = new fft_1.PooledFftFactory(workerPool);
    const { memoryDb, identifier, serverUrl, pollInterval } = options;
    const leveldb = getLevelDb(memoryDb, identifier);
    const db = await getDb(memoryDb, identifier);
    await db.init();
    const host = new URL(serverUrl);
    const rollupProvider = new rollup_provider_1.ServerRollupProvider(host, pollInterval);
    const coreSdk = new core_sdk_1.CoreSdk(leveldb, db, rollupProvider, wasm, pedersen, pippenger, fftFactory, workerPool);
    await coreSdk.init(options);
    return coreSdk;
}
exports.createVanillaCoreSdk = createVanillaCoreSdk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZV9zZGtfZmxhdm91cnMvdmFuaWxsYV9jb3JlX3Nkay9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsdURBQTREO0FBQzVELGlEQUEyRDtBQUMzRCw2REFBZ0U7QUFDaEUseUVBQTJFO0FBQzNFLG1EQUF3RTtBQUN4RSxzRUFBaUM7QUFDakMsMkJBQStCO0FBQy9CLDhEQUEyQztBQUMzQyxxQ0FBMkM7QUFDM0MsNkNBQXlEO0FBQ3pELDZDQUEwRTtBQUMxRSx3REFBbUQ7QUFFbkQsU0FBZ0IsVUFBVSxDQUFDLFFBQVEsR0FBRyxLQUFLLEVBQUUsVUFBbUI7SUFDOUQsSUFBSSxxQkFBTSxFQUFFO1FBQ1YsTUFBTSxNQUFNLEdBQUcsVUFBVSxDQUFDLENBQUMsQ0FBQyxJQUFJLFVBQVUsRUFBRSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDbEQsTUFBTSxNQUFNLEdBQUcsU0FBUyxNQUFNLEVBQUUsQ0FBQztRQUNqQyxJQUFJLFFBQVEsRUFBRTtZQUNaLDhEQUE4RDtZQUM5RCxPQUFPLElBQUEsaUJBQU8sRUFBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQ3RDO2FBQU07WUFDTCxJQUFBLGNBQVMsRUFBQyxNQUFNLEVBQUUsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUN2Qyw4REFBOEQ7WUFDOUQsT0FBTyxJQUFBLGlCQUFPLEVBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxDQUFDLEdBQUcsTUFBTSxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7U0FDakU7S0FDRjtTQUFNO1FBQ0wsOERBQThEO1FBQzlELE9BQU8sSUFBQSxpQkFBTyxFQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0tBQ25EO0FBQ0gsQ0FBQztBQWhCRCxnQ0FnQkM7QUFFTSxLQUFLLFVBQVUsS0FBSyxDQUFDLFFBQVEsR0FBRyxLQUFLLEVBQUUsVUFBbUI7SUFDL0QsSUFBSSxxQkFBTSxFQUFFO1FBQ1YsTUFBTSxNQUFNLEdBQUcsSUFBQSx1QkFBWSxFQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUNsRCxNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUEsMEJBQWdCLEVBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsT0FBTyxJQUFJLHNCQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7S0FDcEM7U0FBTTtRQUNMLE9BQU8sSUFBSSx3QkFBYSxFQUFFLENBQUM7S0FDNUI7QUFDSCxDQUFDO0FBUkQsc0JBUUM7QUFVRDs7OztHQUlHO0FBQ0ksS0FBSyxVQUFVLG9CQUFvQixDQUFDLE9BQThCO0lBQ3ZFLE1BQU0sRUFBRSxVQUFVLEdBQUcsSUFBQSwrQkFBYSxHQUFFLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFDakQsTUFBTSxJQUFJLEdBQUcsTUFBTSx1QkFBZ0IsQ0FBQyxHQUFHLEVBQUUsQ0FBQztJQUMxQyxNQUFNLFVBQVUsR0FBRyxNQUFNLGlCQUFVLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQztJQUMxRCxNQUFNLFFBQVEsR0FBRyxJQUFJLHVCQUFjLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBQ3RELE1BQU0sU0FBUyxHQUFHLElBQUksMkJBQWUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNsRCxNQUFNLFVBQVUsR0FBRyxJQUFJLHNCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDO0lBQ3BELE1BQU0sRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsR0FBRyxPQUFPLENBQUM7SUFFbEUsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNqRCxNQUFNLEVBQUUsR0FBRyxNQUFNLEtBQUssQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDN0MsTUFBTSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFaEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDaEMsTUFBTSxjQUFjLEdBQUcsSUFBSSxzQ0FBb0IsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7SUFFcEUsTUFBTSxPQUFPLEdBQUcsSUFBSSxrQkFBTyxDQUFDLE9BQU8sRUFBRSxFQUFFLEVBQUUsY0FBYyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUM1RyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUIsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQW5CRCxvREFtQkMifQ==