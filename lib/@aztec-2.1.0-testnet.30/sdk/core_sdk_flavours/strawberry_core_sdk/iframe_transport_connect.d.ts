import { MessageChannelTransportSocket, TransportConnect } from '../../transport';
export declare class IframeTransportConnect implements TransportConnect {
    private window;
    private targetOrigin;
    constructor(window: Window, targetOrigin: string);
    createSocket(): Promise<MessageChannelTransportSocket>;
}
//# sourceMappingURL=iframe_transport_connect.d.ts.map