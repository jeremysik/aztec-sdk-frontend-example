import { Fft, FftFactory } from '@aztec/barretenberg/fft';
import { JobQueue } from './job_queue';
declare class JobQueueFft implements Fft {
    private queue;
    private circuitSize;
    private readonly target;
    constructor(queue: JobQueue, circuitSize: number);
    fft(coefficients: Uint8Array, constant: Uint8Array): Promise<any>;
    ifft(coefficients: Uint8Array): Promise<any>;
}
export declare class JobQueueFftFactory implements FftFactory {
    private queue;
    constructor(queue: JobQueue);
    createFft(circuitSize: number): Promise<JobQueueFft>;
}
declare class JobQueueFftClient {
    private fftInstance;
    constructor(fftInstance: Fft);
    fft(coefficients: Uint8Array, constant: Uint8Array): Promise<Uint8Array>;
    ifft(coefficients: Uint8Array): Promise<Uint8Array>;
}
export declare class JobQueueFftFactoryClient {
    private fftFactory;
    private ffts;
    constructor(fftFactory: FftFactory);
    createFft(circuitSize: number): Promise<JobQueueFftClient>;
    getFft(circuitSize: number): Promise<JobQueueFftClient>;
}
export {};
//# sourceMappingURL=job_queue_fft_factory.d.ts.map