import { SerialQueue } from './serial_queue';
export declare class MemorySerialQueue implements SerialQueue {
    private readonly queue;
    constructor();
    length(): number;
    cancel(): void;
    push<T>(fn: () => Promise<T>): Promise<T>;
}
//# sourceMappingURL=memory_serial_queue.d.ts.map