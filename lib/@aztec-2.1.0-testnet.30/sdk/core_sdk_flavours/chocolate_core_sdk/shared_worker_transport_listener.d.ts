/// <reference types="node" />
import EventEmitter from 'events';
import { TransportListener } from '../../transport';
export declare class SharedWorkerTransportListener extends EventEmitter implements TransportListener {
    private sharedWorker;
    constructor(sharedWorker: SharedWorkerGlobalScope);
    open(): void;
    close(): void;
    private handleMessageEvent;
}
//# sourceMappingURL=shared_worker_transport_listener.d.ts.map