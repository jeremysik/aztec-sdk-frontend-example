/// <reference types="node" />
import EventEmitter from 'events';
import { BananaCoreSdkOptions } from '../banana_core_sdk';
import { DispatchMsg } from '../transport';
export interface IframeBackend extends EventEmitter {
    on(name: 'dispatch_msg', handler: (msg: DispatchMsg) => void): this;
    emit(name: 'dispatch_msg', payload: DispatchMsg): boolean;
}
export declare class IframeBackend extends EventEmitter {
    private origin;
    private coreSdk;
    private initPromise;
    constructor(origin: string);
    initComponents(options: BananaCoreSdkOptions): Promise<void>;
    private initInternal;
    coreSdkDispatch: ({ fn, args }: DispatchMsg) => Promise<any>;
}
//# sourceMappingURL=iframe_backend.d.ts.map