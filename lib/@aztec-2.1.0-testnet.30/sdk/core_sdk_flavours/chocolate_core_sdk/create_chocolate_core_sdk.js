"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChocolateCoreSdk = void 0;
const rollup_provider_1 = require("@aztec/barretenberg/rollup_provider");
const wasm_1 = require("@aztec/barretenberg/wasm");
const core_sdk_1 = require("../../core_sdk");
const job_queue_fft_factory_1 = require("../job_queue/job_queue_fft_factory");
const job_queue_pedersen_1 = require("../job_queue/job_queue_pedersen");
const job_queue_pippenger_1 = require("../job_queue/job_queue_pippenger");
const vanilla_core_sdk_1 = require("../vanilla_core_sdk");
/**
 * Construct a chocolate version of the sdk.
 * This creates a CoreSdk for running in some remote context, e.g. a shared worker.
 * It is wrapped in a network type adapter.
 * It is not interfaced with directly, but rather via a banana sdk, over some transport layer.
 */
async function createChocolateCoreSdk(jobQueue, options) {
    const wasm = await wasm_1.BarretenbergWasm.new();
    const pedersen = new job_queue_pedersen_1.JobQueuePedersen(wasm, jobQueue);
    const pippenger = new job_queue_pippenger_1.JobQueuePippenger(jobQueue);
    const fftFactory = new job_queue_fft_factory_1.JobQueueFftFactory(jobQueue);
    const { pollInterval, serverUrl } = options;
    const leveldb = (0, vanilla_core_sdk_1.getLevelDb)();
    const db = await (0, vanilla_core_sdk_1.getDb)();
    await db.init();
    const host = new URL(serverUrl);
    const rollupProvider = new rollup_provider_1.ServerRollupProvider(host, pollInterval);
    const coreSdk = new core_sdk_1.CoreSdk(leveldb, db, rollupProvider, wasm, pedersen, pippenger, fftFactory);
    await coreSdk.init(options);
    return new core_sdk_1.CoreSdkServerStub(coreSdk);
}
exports.createChocolateCoreSdk = createChocolateCoreSdk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX2Nob2NvbGF0ZV9jb3JlX3Nkay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlX3Nka19mbGF2b3Vycy9jaG9jb2xhdGVfY29yZV9zZGsvY3JlYXRlX2Nob2NvbGF0ZV9jb3JlX3Nkay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx5RUFBMkU7QUFDM0UsbURBQTREO0FBQzVELDZDQUE0RDtBQUU1RCw4RUFBd0U7QUFDeEUsd0VBQW1FO0FBQ25FLDBFQUFxRTtBQUNyRSwwREFBd0Q7QUFHeEQ7Ozs7O0dBS0c7QUFDSSxLQUFLLFVBQVUsc0JBQXNCLENBQUMsUUFBa0IsRUFBRSxPQUFnQztJQUMvRixNQUFNLElBQUksR0FBRyxNQUFNLHVCQUFnQixDQUFDLEdBQUcsRUFBRSxDQUFDO0lBQzFDLE1BQU0sUUFBUSxHQUFHLElBQUkscUNBQWdCLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELE1BQU0sU0FBUyxHQUFHLElBQUksdUNBQWlCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDbEQsTUFBTSxVQUFVLEdBQUcsSUFBSSwwQ0FBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwRCxNQUFNLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBRSxHQUFHLE9BQU8sQ0FBQztJQUU1QyxNQUFNLE9BQU8sR0FBRyxJQUFBLDZCQUFVLEdBQUUsQ0FBQztJQUM3QixNQUFNLEVBQUUsR0FBRyxNQUFNLElBQUEsd0JBQUssR0FBRSxDQUFDO0lBQ3pCLE1BQU0sRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRWhCLE1BQU0sSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ2hDLE1BQU0sY0FBYyxHQUFHLElBQUksc0NBQW9CLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBRXBFLE1BQU0sT0FBTyxHQUFHLElBQUksa0JBQU8sQ0FBQyxPQUFPLEVBQUUsRUFBRSxFQUFFLGNBQWMsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNoRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDNUIsT0FBTyxJQUFJLDRCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0FBQ3hDLENBQUM7QUFqQkQsd0RBaUJDIn0=