/// <reference types="node" />
import EventEmitter from 'events';
import { TransportConnect } from './transport_connect';
export interface TransportClient<Payload> extends EventEmitter {
    on(name: 'event_msg', handler: (payload: Payload) => void): this;
    emit(name: 'event_msg', payload: Payload): boolean;
}
/**
 * A TransportClient provides a request/response and event api to a corresponding TransportServer.
 * If `broadcast` is called on TransportServer, TransportClients will emit an `event_msg`.
 * The `request` method will block until a response is returned from the TransportServer's dispatch function.
 * Request multiplexing is supported.
 */
export declare class TransportClient<Payload> extends EventEmitter {
    private transportConnect;
    private msgId;
    private pendingRequests;
    private socket?;
    constructor(transportConnect: TransportConnect);
    open(): Promise<void>;
    close(): void;
    request(payload: Payload): Promise<any>;
    private handleSocketMessage;
}
//# sourceMappingURL=transport_client.d.ts.map