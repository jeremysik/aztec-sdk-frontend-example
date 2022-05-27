/// <reference types="node" />
import { BarretenbergWasm, WorkerPool } from '../../wasm';
import { SinglePedersen } from './single_pedersen';
/**
 * Multi-threaded implementation of pedersen.
 */
export declare class PooledPedersen extends SinglePedersen {
    pool: SinglePedersen[];
    /**
     * @param wasm Synchronous functions will use use this wasm directly on the calling thread.
     * @param pool Asynchronous functions use this pool of workers to multi-thread processing.
     */
    constructor(wasm: BarretenbergWasm, pool: WorkerPool);
    init(): Promise<void>;
    hashToTree(values: Buffer[]): Promise<Buffer[]>;
}
//# sourceMappingURL=pooled_pedersen.d.ts.map