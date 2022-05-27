import { BarretenbergWorker } from '../wasm/worker';
import { Fft, FftFactory } from './fft';
export declare class SingleFft implements Fft {
    private wasm;
    private domainPtr;
    constructor(wasm: BarretenbergWorker);
    init(circuitSize: number): Promise<void>;
    destroy(): Promise<void>;
    fft(coefficients: Uint8Array, constant: Uint8Array): Promise<Uint8Array>;
    ifft(coefficients: Uint8Array): Promise<Uint8Array>;
}
export declare class SingleFftFactory implements FftFactory {
    private wasm;
    private ffts;
    constructor(wasm: BarretenbergWorker);
    createFft(circuitSize: number): Promise<Fft>;
}
//# sourceMappingURL=single_fft.d.ts.map