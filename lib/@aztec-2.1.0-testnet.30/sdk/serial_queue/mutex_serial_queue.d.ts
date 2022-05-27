import { MutexDatabase } from '@aztec/barretenberg/mutex';
import { SerialQueue } from './serial_queue';
export declare class MutexSerialQueue implements SerialQueue {
    private readonly queue;
    private readonly mutex;
    constructor(db: MutexDatabase, name: string, expiry?: number, tryLockInterval?: number, pingInterval?: number);
    length(): number;
    cancel(): void;
    push<T>(fn: () => Promise<T>): Promise<T>;
}
//# sourceMappingURL=mutex_serial_queue.d.ts.map