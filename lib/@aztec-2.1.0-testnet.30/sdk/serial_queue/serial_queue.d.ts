export interface SerialQueue {
    length(): number;
    push<T>(fn: () => Promise<T>): Promise<T>;
    cancel(): void;
}
//# sourceMappingURL=serial_queue.d.ts.map