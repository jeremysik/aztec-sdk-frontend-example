import { MessageChannelTransportSocket, TransportConnect } from '../../transport';
export declare class SharedWorkerTransportConnect implements TransportConnect {
    private sharedWorker;
    constructor(sharedWorker: SharedWorker);
    createSocket(): Promise<MessageChannelTransportSocket>;
}
//# sourceMappingURL=shared_worker_transport_connect.d.ts.map