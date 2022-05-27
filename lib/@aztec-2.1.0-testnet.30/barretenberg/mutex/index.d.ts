import { MutexDatabase } from './mutex_database';
export * from './mutex_database';
export declare class Mutex {
    private readonly db;
    private readonly name;
    private readonly timeout;
    private readonly tryLockInterval;
    private readonly pingInterval;
    private id;
    private pingTimeout;
    constructor(db: MutexDatabase, name: string, timeout?: number, tryLockInterval?: number, pingInterval?: number);
    lock(): Promise<void>;
    unlock(): Promise<void>;
    private ping;
}
//# sourceMappingURL=index.d.ts.map