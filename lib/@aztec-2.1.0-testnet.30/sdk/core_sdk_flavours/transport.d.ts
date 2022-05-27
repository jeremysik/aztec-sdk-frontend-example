import { TransportClient as TransportTransportClient, TransportServer as TransportTransportServer, EventMessage as TransportEventMessage, RequestMessage as TransportRequestMessage, ResponseMessage as TransportResponseMessage } from '../transport';
export interface DispatchMsg {
    fn: string;
    args: any[];
}
export declare function createDispatchFn(container: any, target: string, debug?: {
    (...data: any[]): void;
    (...data: any[]): void;
    (message?: any, ...optionalParams: any[]): void;
}): ({ fn, args }: DispatchMsg) => Promise<any>;
export declare class TransportClient extends TransportTransportClient<DispatchMsg> {
}
export declare class TransportServer extends TransportTransportServer<DispatchMsg> {
}
export declare type RequestMessage = TransportRequestMessage<DispatchMsg>;
export declare type ResponseMessage = TransportResponseMessage<DispatchMsg>;
export declare type EventMessage = TransportEventMessage<DispatchMsg>;
//# sourceMappingURL=transport.d.ts.map