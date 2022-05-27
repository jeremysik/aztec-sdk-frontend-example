/// <reference types="node" />
import { Pippenger } from '@aztec/barretenberg/pippenger';
import { JobQueue } from './job_queue';
export declare class JobQueuePippenger implements Pippenger {
    private queue;
    private readonly target;
    constructor(queue: JobQueue);
    init(): Promise<void>;
    pippengerUnsafe(scalars: Uint8Array, from: number, range: number): Promise<Buffer>;
}
export declare class JobQueuePippengerClient {
    private pippenger;
    constructor(pippenger: Pippenger);
    init(crsData: Uint8Array): Promise<void>;
    pippengerUnsafe(scalars: Uint8Array, from: number, range: number): Promise<Uint8Array>;
}
//# sourceMappingURL=job_queue_pippenger.d.ts.map