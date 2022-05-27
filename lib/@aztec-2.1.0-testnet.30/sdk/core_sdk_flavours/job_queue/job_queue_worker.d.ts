import { Pedersen } from '@aztec/barretenberg/crypto';
import { FftFactory } from '@aztec/barretenberg/fft';
import { Pippenger } from '@aztec/barretenberg/pippenger';
import { JobQueueInterface } from './job_queue_interface';
/**
 * Responsible for getting jobs from a JobQueue, processing them, and returning the result.
 */
export declare class JobQueueWorker {
    private jobQueue;
    private newJobPromise?;
    private pingTimeout;
    private readonly pedersen;
    private readonly pippenger;
    private readonly fftFactory;
    constructor(jobQueue: JobQueueInterface, pedersen: Pedersen, pippenger: Pippenger, fftFactory: FftFactory);
    init(crsData: Uint8Array): Promise<void>;
    start(): void;
    stop(): Promise<void>;
    private notifyNewJob;
    private fetchAndProcess;
    private ping;
    private processJob;
    private process;
}
//# sourceMappingURL=job_queue_worker.d.ts.map