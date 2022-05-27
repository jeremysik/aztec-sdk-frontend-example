import { TransportSocket } from './transport_socket';
/**
 * Opens a socket with corresponding TransportListener.
 */
export interface TransportConnect {
    createSocket(): Promise<TransportSocket>;
}
//# sourceMappingURL=transport_connect.d.ts.map