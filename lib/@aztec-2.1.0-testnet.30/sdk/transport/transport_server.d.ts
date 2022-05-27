import { TransportListener } from './transport_listener';
/**
 * Keeps track of clients, providing a broadcast, and request/response api with multiplexing.
 */
export declare class TransportServer<Payload> {
    private listener;
    private msgHandlerFn;
    private sockets;
    constructor(listener: TransportListener, msgHandlerFn: (msg: Payload) => Promise<any>);
    start(): void;
    stop(): void;
    broadcast(msg: Payload): Promise<void>;
    private handleNewSocket;
    private handleSocketMessage;
}
//# sourceMappingURL=transport_server.d.ts.map