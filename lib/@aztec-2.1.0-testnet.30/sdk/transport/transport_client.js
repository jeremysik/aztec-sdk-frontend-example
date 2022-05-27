"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportClient = void 0;
const tslib_1 = require("tslib");
const events_1 = tslib_1.__importDefault(require("events"));
const messages_1 = require("./messages");
/**
 * A TransportClient provides a request/response and event api to a corresponding TransportServer.
 * If `broadcast` is called on TransportServer, TransportClients will emit an `event_msg`.
 * The `request` method will block until a response is returned from the TransportServer's dispatch function.
 * Request multiplexing is supported.
 */
class TransportClient extends events_1.default {
    constructor(transportConnect) {
        super();
        this.transportConnect = transportConnect;
        this.msgId = 0;
        this.pendingRequests = [];
    }
    async open() {
        this.socket = await this.transportConnect.createSocket();
        this.socket.registerHandler(msg => this.handleSocketMessage(msg));
    }
    close() {
        var _a;
        (_a = this.socket) === null || _a === void 0 ? void 0 : _a.close();
        this.removeAllListeners();
    }
    async request(payload) {
        if (!this.socket) {
            throw new Error('Socket not open.');
        }
        const msgId = this.msgId++;
        return new Promise((resolve, reject) => {
            this.pendingRequests.push({ resolve, reject, msgId });
            this.socket.send({ msgId, payload });
        });
    }
    async handleSocketMessage(msg) {
        if ((0, messages_1.isEventMessage)(msg)) {
            this.emit('event_msg', msg.payload);
            return;
        }
        const reqIndex = this.pendingRequests.findIndex(r => r.msgId === msg.msgId);
        if (reqIndex === -1) {
            return;
        }
        const [pending] = this.pendingRequests.splice(reqIndex, 1);
        if (msg.error) {
            pending.reject(new Error(msg.error));
        }
        else {
            pending.resolve(msg.payload);
        }
    }
}
exports.TransportClient = TransportClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0X2NsaWVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy90cmFuc3BvcnQvdHJhbnNwb3J0X2NsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsNERBQWtDO0FBQ2xDLHlDQUEyRTtBQWUzRTs7Ozs7R0FLRztBQUNILE1BQWEsZUFBeUIsU0FBUSxnQkFBWTtJQUt4RCxZQUFvQixnQkFBa0M7UUFDcEQsS0FBSyxFQUFFLENBQUM7UUFEVSxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWtCO1FBSjlDLFVBQUssR0FBRyxDQUFDLENBQUM7UUFDVixvQkFBZSxHQUFxQixFQUFFLENBQUM7SUFLL0MsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJO1FBQ1IsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6RCxJQUFJLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxLQUFLOztRQUNILE1BQUEsSUFBSSxDQUFDLE1BQU0sMENBQUUsS0FBSyxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBZ0I7UUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3JDO1FBQ0QsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQzNCLE9BQU8sSUFBSSxPQUFPLENBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDMUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7WUFDdEQsSUFBSSxDQUFDLE1BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztRQUN4QyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFTyxLQUFLLENBQUMsbUJBQW1CLENBQUMsR0FBcUQ7UUFDckYsSUFBSSxJQUFBLHlCQUFjLEVBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3BDLE9BQU87U0FDUjtRQUNELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDNUUsSUFBSSxRQUFRLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDbkIsT0FBTztTQUNSO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUMzRCxJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDYixPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1NBQ3RDO2FBQU07WUFDTCxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUM7Q0FDRjtBQTlDRCwwQ0E4Q0MifQ==