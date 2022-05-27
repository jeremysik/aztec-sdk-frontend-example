"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transport_1 = require("../transport");
const shared_worker_backend_1 = require("./shared_worker_backend");
const shared_worker_transport_listener_1 = require("./shared_worker_transport_listener");
function main() {
    const sharedWorkerBackend = new shared_worker_backend_1.SharedWorkerBackend();
    /**
     * Messages from our transport layer, are function calls to be dispatched to SharedWorkerBackend.
     * We can descend an arbitrary component stack by adding dispatch functions to classes, and nesting our messages.
     * An example message may look like:
     *   const msg = {
     *     fn: 'coreSdkDispatch',
     *     args: [{
     *       fn: 'getTxFees',
     *       args: [0]
     *     }]
     *   }
     */
    const dispatchFn = async ({ fn, args }) => sharedWorkerBackend[fn](...args);
    const listener = new shared_worker_transport_listener_1.SharedWorkerTransportListener(self);
    const transportServer = new transport_1.TransportServer(listener, dispatchFn);
    sharedWorkerBackend.on('dispatch_msg', (msg) => transportServer.broadcast(msg));
    transportServer.start();
}
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3dvcmtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlX3Nka19mbGF2b3Vycy9jaG9jb2xhdGVfY29yZV9zZGsvc2hhcmVkX3dvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUE0RDtBQUM1RCxtRUFBOEQ7QUFDOUQseUZBQW1GO0FBSW5GLFNBQVMsSUFBSTtJQUNYLE1BQU0sbUJBQW1CLEdBQUcsSUFBSSwyQ0FBbUIsRUFBRSxDQUFDO0lBRXREOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsTUFBTSxVQUFVLEdBQUcsS0FBSyxFQUFFLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBZSxFQUFFLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ3pGLE1BQU0sUUFBUSxHQUFHLElBQUksZ0VBQTZCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDekQsTUFBTSxlQUFlLEdBQUcsSUFBSSwyQkFBZSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNsRSxtQkFBbUIsQ0FBQyxFQUFFLENBQUMsY0FBYyxFQUFFLENBQUMsR0FBZ0IsRUFBRSxFQUFFLENBQUMsZUFBZSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBRTdGLGVBQWUsQ0FBQyxLQUFLLEVBQUUsQ0FBQztBQUMxQixDQUFDO0FBRUQsSUFBSSxFQUFFLENBQUMifQ==