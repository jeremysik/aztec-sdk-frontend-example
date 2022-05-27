export declare class InterruptableSleep {
    private interruptResolve;
    private interruptPromise;
    private timeouts;
    sleep(ms: number): Promise<void>;
    interrupt(): void;
}
export declare function sleep(ms: number): Promise<unknown>;
//# sourceMappingURL=index.d.ts.map