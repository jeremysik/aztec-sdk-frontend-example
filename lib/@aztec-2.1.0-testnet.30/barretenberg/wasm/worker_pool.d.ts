import { BarretenbergWasm } from './barretenberg_wasm';
import { BarretenbergWorker } from './worker';
export declare class WorkerPool {
    workers: BarretenbergWorker[];
    static new(barretenberg: BarretenbergWasm, poolSize: number): Promise<WorkerPool>;
    init(module: WebAssembly.Module, poolSize: number): Promise<void>;
    destroy(): Promise<void>;
}
//# sourceMappingURL=worker_pool.d.ts.map