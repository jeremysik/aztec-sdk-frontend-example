/// <reference types="node" />
import { Pippenger } from './pippenger';
import { SinglePippenger } from './single_pippenger';
import { WorkerPool } from '../wasm/worker_pool';
export declare class PooledPippenger implements Pippenger {
    private workerPool;
    pool: SinglePippenger[];
    constructor(workerPool: WorkerPool);
    init(crsData: Uint8Array): Promise<void>;
    pippengerUnsafe(scalars: Uint8Array, from: number, range: number): Promise<Buffer>;
    sumElements(buffer: Uint8Array): Promise<Buffer>;
}
//# sourceMappingURL=pooled_pippenger.d.ts.map