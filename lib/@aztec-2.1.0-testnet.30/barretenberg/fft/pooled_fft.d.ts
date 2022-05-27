import { WorkerPool } from '../wasm/worker_pool';
import { Fft, FftFactory } from './fft';
export declare class PooledFft implements Fft {
    private queue;
    private ffts;
    constructor(pool: WorkerPool);
    init(circuitSize: number): Promise<void>;
    destroy(): Promise<void>;
    private processJobs;
    fft(coefficients: Uint8Array, constant: Uint8Array): Promise<Uint8Array>;
    ifft(coefficients: Uint8Array): Promise<Uint8Array>;
}
export declare class PooledFftFactory implements FftFactory {
    private workerPool;
    private ffts;
    constructor(workerPool: WorkerPool);
    createFft(circuitSize: number): Promise<PooledFft>;
}
//# sourceMappingURL=pooled_fft.d.ts.map