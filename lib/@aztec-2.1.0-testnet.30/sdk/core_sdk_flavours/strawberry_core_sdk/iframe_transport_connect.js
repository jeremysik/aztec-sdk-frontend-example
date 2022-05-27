"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IframeTransportConnect = void 0;
const transport_1 = require("../../transport");
class IframeTransportConnect {
    constructor(window, targetOrigin) {
        this.window = window;
        this.targetOrigin = targetOrigin;
    }
    async createSocket() {
        const { port1, port2 } = new MessageChannel();
        this.window.postMessage(undefined, this.targetOrigin, [port2]);
        return new transport_1.MessageChannelTransportSocket(port1);
    }
}
exports.IframeTransportConnect = IframeTransportConnect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lX3RyYW5zcG9ydF9jb25uZWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmVfc2RrX2ZsYXZvdXJzL3N0cmF3YmVycnlfY29yZV9zZGsvaWZyYW1lX3RyYW5zcG9ydF9jb25uZWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUFrRjtBQUVsRixNQUFhLHNCQUFzQjtJQUNqQyxZQUFvQixNQUFjLEVBQVUsWUFBb0I7UUFBNUMsV0FBTSxHQUFOLE1BQU0sQ0FBUTtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFRO0lBQUcsQ0FBQztJQUVwRSxLQUFLLENBQUMsWUFBWTtRQUNoQixNQUFNLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxHQUFHLElBQUksY0FBYyxFQUFFLENBQUM7UUFDOUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1FBQy9ELE9BQU8sSUFBSSx5Q0FBNkIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNsRCxDQUFDO0NBQ0Y7QUFSRCx3REFRQyJ9