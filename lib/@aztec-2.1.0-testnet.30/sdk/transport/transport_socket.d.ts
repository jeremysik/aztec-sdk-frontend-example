/**
 * Represents one end of a socket connection.
 * A message sent via `send` will be handled by the corresponding TransportSocket's handler function at the other end.
 * Implementations could use e.g. MessagePorts for communication between browser workers,
 * or WebSockets for communication between processes.
 */
export interface TransportSocket {
    send(msg: any): Promise<void>;
    registerHandler(cb: (msg: any) => Promise<any>): void;
    close(): any;
}
/**
 * An implementation of a TransportSocket using MessagePorts.
 */
export declare class MessageChannelTransportSocket implements TransportSocket {
    private port;
    constructor(port: MessagePort);
    send(msg: any): Promise<void>;
    registerHandler(cb: (msg: any) => Promise<any>): void;
    close(): void;
}
//# sourceMappingURL=transport_socket.d.ts.map