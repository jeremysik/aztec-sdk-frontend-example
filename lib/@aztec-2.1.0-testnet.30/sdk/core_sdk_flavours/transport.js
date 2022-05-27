"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransportServer = exports.TransportClient = exports.createDispatchFn = void 0;
const transport_1 = require("../transport");
function createDispatchFn(container, target, debug = console.error) {
    return async ({ fn, args }) => {
        debug(`dispatching to ${target}: ${fn}(${args})`);
        if (!container[target][fn] || typeof container[target][fn] !== 'function') {
            debug(`dispatch error, undefined or not a function on ${target}: ${fn}`);
            return;
        }
        return await container[target][fn](...args);
    };
}
exports.createDispatchFn = createDispatchFn;
class TransportClient extends transport_1.TransportClient {
}
exports.TransportClient = TransportClient;
class TransportServer extends transport_1.TransportServer {
}
exports.TransportServer = TransportServer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmVfc2RrX2ZsYXZvdXJzL3RyYW5zcG9ydC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw0Q0FNc0I7QUFPdEIsU0FBZ0IsZ0JBQWdCLENBQUMsU0FBYyxFQUFFLE1BQWMsRUFBRSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUs7SUFDcEYsT0FBTyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFlLEVBQUUsRUFBRTtRQUN6QyxLQUFLLENBQUMsa0JBQWtCLE1BQU0sS0FBSyxFQUFFLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztRQUNsRCxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxJQUFJLE9BQU8sU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLFVBQVUsRUFBRTtZQUN6RSxLQUFLLENBQUMsa0RBQWtELE1BQU0sS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBQ3pFLE9BQU87U0FDUjtRQUNELE9BQU8sTUFBTSxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQztJQUM5QyxDQUFDLENBQUM7QUFDSixDQUFDO0FBVEQsNENBU0M7QUFFRCxNQUFhLGVBQWdCLFNBQVEsMkJBQXFDO0NBQUc7QUFBN0UsMENBQTZFO0FBQzdFLE1BQWEsZUFBZ0IsU0FBUSwyQkFBcUM7Q0FBRztBQUE3RSwwQ0FBNkUifQ==