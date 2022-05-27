"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IframeTransportListener = void 0;
const tslib_1 = require("tslib");
const events_1 = tslib_1.__importDefault(require("events"));
const transport_1 = require("../../transport");
class IframeTransportListener extends events_1.default {
    constructor(window) {
        super();
        this.window = window;
        this.handleMessageEvent = (event) => {
            const [port] = event.ports;
            if (!port) {
                return;
            }
            this.emit('new_socket', new transport_1.MessageChannelTransportSocket(port));
        };
    }
    open() {
        this.window.addEventListener('message', this.handleMessageEvent);
    }
    close() {
        this.window.removeEventListener('message', this.handleMessageEvent);
    }
}
exports.IframeTransportListener = IframeTransportListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lX3RyYW5zcG9ydF9saXN0ZW5lci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlX3Nka19mbGF2b3Vycy9tYW5nb19jb3JlX3Nkay9pZnJhbWVfdHJhbnNwb3J0X2xpc3RlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSw0REFBa0M7QUFDbEMsK0NBQW1GO0FBRW5GLE1BQWEsdUJBQXdCLFNBQVEsZ0JBQVk7SUFDdkQsWUFBb0IsTUFBYztRQUNoQyxLQUFLLEVBQUUsQ0FBQztRQURVLFdBQU0sR0FBTixNQUFNLENBQVE7UUFZMUIsdUJBQWtCLEdBQUcsQ0FBQyxLQUFtQixFQUFFLEVBQUU7WUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLHlDQUE2QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDO0lBaEJGLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDbkUsQ0FBQztJQUVELEtBQUs7UUFDSCxJQUFJLENBQUMsTUFBTSxDQUFDLG1CQUFtQixDQUFDLFNBQVMsRUFBRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUN0RSxDQUFDO0NBU0Y7QUFwQkQsMERBb0JDIn0=