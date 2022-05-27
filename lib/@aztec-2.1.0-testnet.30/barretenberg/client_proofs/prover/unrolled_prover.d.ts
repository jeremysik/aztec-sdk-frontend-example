import { Fft } from '../../fft';
import { Pippenger } from '../../pippenger';
import { BarretenbergWasm, BarretenbergWorker } from '../../wasm';
import { Prover } from './prover';
/**
 * An UnrolledProver is used for proofs that are verified inside a another snark (e.g. the rollup).
 */
export declare class UnrolledProver extends Prover {
    constructor(wasm: BarretenbergWorker | BarretenbergWasm, pippenger: Pippenger, fft: Fft);
}
//# sourceMappingURL=unrolled_prover.d.ts.map