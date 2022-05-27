"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedWorkerFrontend = void 0;
const crs_1 = require("@aztec/barretenberg/crs");
const crypto_1 = require("@aztec/barretenberg/crypto");
const debug_1 = require("@aztec/barretenberg/debug");
const fft_1 = require("@aztec/barretenberg/fft");
const pippenger_1 = require("@aztec/barretenberg/pippenger");
const wasm_1 = require("@aztec/barretenberg/wasm");
const core_sdk_1 = require("../../core_sdk");
const get_num_workers_1 = require("../get_num_workers");
const job_queue_1 = require("../job_queue");
const transport_1 = require("../transport");
const banana_core_sdk_1 = require("./banana_core_sdk");
const debug = (0, debug_1.createLogger)('aztec:sdk:shared_worker_frontend');
class SharedWorkerFrontend {
    constructor(transportClient) {
        this.transportClient = transportClient;
        this.jobQueueDispatch = (0, transport_1.createDispatchFn)(this, 'jobQueue', debug);
        this.coreSdkDispatch = (0, transport_1.createDispatchFn)(this, 'coreSdk', debug);
    }
    async initComponents(options) {
        console.log(`SharedWorkerFrontend.initComponents() called`);
        // All calls on JobQueueDispatch will be sent to jobQueueDispatch function on SharedWorkerBackend.
        this.jobQueue = new job_queue_1.JobQueueDispatch(msg => {
            debug(`job queue dispatch request: ${msg.fn}(${msg.args})`);
            return this.transportClient.request({ fn: 'jobQueueDispatch', args: [msg] });
        });
        const { numWorkers = (0, get_num_workers_1.getNumWorkers)() } = options;
        const barretenberg = await wasm_1.BarretenbergWasm.new();
        const workerPool = await wasm_1.WorkerPool.new(barretenberg, numWorkers);
        const pedersen = new crypto_1.PooledPedersen(barretenberg, workerPool);
        const pippenger = new pippenger_1.PooledPippenger(workerPool);
        const fftFactory = new fft_1.PooledFftFactory(workerPool);
        const jobQueueWorker = new job_queue_1.JobQueueWorker(this.jobQueue, pedersen, pippenger, fftFactory);
        const crsData = await this.getCrsData();
        await jobQueueWorker.init(crsData);
        debug('starting job queue worker...');
        jobQueueWorker.start();
        // Event messages from the SharedWorkerBackend are dispatch messages (that call emit on their targets).
        this.transportClient.on('event_msg', ({ fn, args }) => this[fn](...args));

        // Call `init` on the SharedWorkerBackend. Constructs and initializes the chocolate core sdk.
        console.log(`Transport client requesting 'initComponents' from SharedWorkerBackend`);
        console.warn(`This is where it stops functioning`);
        await this.transportClient.request({ fn: 'initComponents', args: [options] });

        console.log(`Shouldn't see this message, it never loads to this point!`);

        // All calls on BananaCoreSdk will be sent to coreSdkDispatch function on SharedWorkerBackend.
        this.coreSdk = new banana_core_sdk_1.BananaCoreSdk(msg => {
            debug(`core sdk dispatch request: ${msg.fn}(${msg.args})`);
            return this.transportClient.request({ fn: 'coreSdkDispatch', args: [msg] });
        }, jobQueueWorker, workerPool);
        this.coreSdk.on(core_sdk_1.SdkEvent.DESTROYED, () => this.transportClient.close());
        return { coreSdk: new core_sdk_1.CoreSdkClientStub(this.coreSdk) };
    }
    async getCrsData() {
        const circuitSize = 2 ** 16;
        debug(`downloading crs data (circuit size: ${circuitSize})...`);
        const crs = new crs_1.Crs(circuitSize);
        await crs.download();
        debug('done.');
        return Buffer.from(crs.getData());
    }
}
exports.SharedWorkerFrontend = SharedWorkerFrontend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3dvcmtlcl9mcm9udGVuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlX3Nka19mbGF2b3Vycy9iYW5hbmFfY29yZV9zZGsvc2hhcmVkX3dvcmtlcl9mcm9udGVuZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxpREFBOEM7QUFDOUMsdURBQTREO0FBQzVELHFEQUF5RDtBQUN6RCxpREFBMkQ7QUFDM0QsNkRBQWdFO0FBQ2hFLG1EQUF3RTtBQUN4RSw2Q0FBeUY7QUFDekYsd0RBQW1EO0FBQ25ELDRDQUFtRjtBQUNuRiw0Q0FBaUU7QUFDakUsdURBQWtEO0FBR2xELE1BQU0sS0FBSyxHQUFHLElBQUEsb0JBQVksRUFBQyxrQ0FBa0MsQ0FBQyxDQUFDO0FBRS9ELE1BQWEsb0JBQW9CO0lBSS9CLFlBQW9CLGVBQWdDO1FBQWhDLG9CQUFlLEdBQWYsZUFBZSxDQUFpQjtRQTJDN0MscUJBQWdCLEdBQUcsSUFBQSw0QkFBZ0IsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdELG9CQUFlLEdBQUcsSUFBQSw0QkFBZ0IsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBNUNYLENBQUM7SUFFakQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUE2QjtRQUN2RCxrR0FBa0c7UUFDbEcsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDRCQUFnQixDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLEtBQUssQ0FBQywrQkFBK0IsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUM1RCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLGtCQUFrQixFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvRSxDQUFDLENBQUMsQ0FBQztRQUVILE1B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