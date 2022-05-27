/// <reference types="node" />
import EventEmitter from 'events';
import { TransportListener } from '../../transport';
export declare class IframeTransportListener extends EventEmitter implements TransportListener {
    private window;
    constructor(window: Window);
    open(): void;
    close(): void;
    private handleMessageEvent;
}
//# sourceMappingURL=iframe_transport_listener.d.ts.map