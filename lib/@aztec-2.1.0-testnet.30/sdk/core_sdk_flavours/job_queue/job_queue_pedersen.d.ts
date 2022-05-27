/// <reference types="node" />
import { Pedersen, SinglePedersen } from '@aztec/barretenberg/crypto';
import { BarretenbergWasm } from '@aztec/barretenberg/wasm';
import { JobQueue } from './job_queue';
export declare class JobQueuePedersen extends SinglePedersen implements Pedersen {
    private queue;
    private readonly target;
    constructor(wasm: BarretenbergWasm, queue: JobQueue);
    hashToTree(values: Buffer[]): Promise<any>;
}
export declare class JobQueuePedersenClient {
    private pedersen;
    constructor(pedersen: Pedersen);
    hashToTree(values: Uint8Array[]): Promise<Uint8Array[]>;
}
//# sourceMappingURL=job_queue_pedersen.d.ts.map