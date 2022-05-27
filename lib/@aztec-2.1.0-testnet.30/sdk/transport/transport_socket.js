"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageChannelTransportSocket = void 0;
/**
 * An implementation of a TransportSocket using MessagePorts.
 */
class MessageChannelTransportSocket {
    constructor(port) {
        this.port = port;
    }
    async send(msg) {
        this.port.postMessage(msg);
    }
    registerHandler(cb) {
        this.port.onmessage = async (event) => cb(event.data);
    }
    close() {
        this.port.onmessage = null;
        this.port.close();
    }
}
exports.MessageChannelTransportSocket = MessageChannelTransportSocket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0X3NvY2tldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc3BvcnQvdHJhbnNwb3J0X3NvY2tldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFZQTs7R0FFRztBQUNILE1BQWEsNkJBQTZCO0lBQ3hDLFlBQW9CLElBQWlCO1FBQWpCLFNBQUksR0FBSixJQUFJLENBQWE7SUFBRyxDQUFDO0lBRXpDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBUTtRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsZUFBZSxDQUFDLEVBQThCO1FBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssRUFBQyxLQUFLLEVBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDdEQsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUM7UUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztJQUNwQixDQUFDO0NBQ0Y7QUFmRCxzRUFlQyJ9