import { WorkerPool } from '@aztec/barretenberg/wasm';
import { CoreSdkDispatch } from '../../core_sdk';
import { JobQueueWorker } from '../job_queue';
import { DispatchMsg } from '../transport';
export declare class BananaCoreSdk extends CoreSdkDispatch {
    private jobQueueWorker;
    private workerPool;
    constructor(dispatch: (msg: DispatchMsg) => Promise<any>, jobQueueWorker: JobQueueWorker, workerPool: WorkerPool);
    destroy(): Promise<void>;
}
//# sourceMappingURL=banana_core_sdk.d.ts.map