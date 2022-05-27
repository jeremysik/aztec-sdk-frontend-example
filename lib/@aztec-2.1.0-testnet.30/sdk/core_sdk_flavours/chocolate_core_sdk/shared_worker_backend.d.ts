/// <reference types="node" />
import EventEmitter from 'events';
import { DispatchMsg } from '../transport';
import { ChocolateCoreSdkOptions } from './chocolate_core_sdk_options';
export interface SharedWorkerBackend extends EventEmitter {
    on(name: 'dispatch_msg', handler: (msg: DispatchMsg) => void): this;
    emit(name: 'dispatch_msg', payload: DispatchMsg): boolean;
}
export declare class SharedWorkerBackend extends EventEmitter {
    private jobQueue;
    private coreSdk;
    private initPromise;
    constructor();
    initComponents(options: ChocolateCoreSdkOptions): Promise<void>;
    private initComponentsInternal;
    jobQueueDispatch: ({ fn, args }: DispatchMsg) => Promise<any>;
    coreSdkDispatch: ({ fn, args }: DispatchMsg) => Promise<any>;
}
//# sourceMappingURL=shared_worker_backend.d.ts.map