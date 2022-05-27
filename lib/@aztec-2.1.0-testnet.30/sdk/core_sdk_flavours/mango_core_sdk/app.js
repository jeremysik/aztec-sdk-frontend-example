"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const transport_1 = require("../transport");
const iframe_backend_1 = require("./iframe_backend");
const iframe_transport_listener_1 = require("./iframe_transport_listener");
function main() {
    const iframeBackend = new iframe_backend_1.IframeBackend(document.referrer);
    /**
     * Messages from our transport layer, are function calls to be dispatched to sharedWorkerBackend.
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
    const dispatchFn = async ({ fn, args }) => iframeBackend[fn](...args);
    const listener = new iframe_transport_listener_1.IframeTransportListener(window);
    const transportServer = new transport_1.TransportServer(listener, dispatchFn);
    iframeBackend.on('dispatch_msg', (msg) => transportServer.broadcast(msg));
    transportServer.start();
    window.parent.postMessage('Ready', '*');
}
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmVfc2RrX2ZsYXZvdXJzL21hbmdvX2NvcmVfc2RrL2FwcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLDRDQUE0RDtBQUM1RCxxREFBaUQ7QUFDakQsMkVBQXNFO0FBRXRFLFNBQVMsSUFBSTtJQUNYLE1BQU0sYUFBYSxHQUFHLElBQUksOEJBQWEsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFM0Q7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxNQUFNLFVBQVUsR0FBRyxLQUFLLEVBQUUsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFlLEVBQUUsRUFBRSxDQUFDLGFBQWEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQyxDQUFDO0lBQ25GLE1BQU0sUUFBUSxHQUFHLElBQUksbURBQXVCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDckQsTUFBTSxlQUFlLEdBQUcsSUFBSSwyQkFBZSxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUNsRSxhQUFhLENBQUMsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDLEdBQWdCLEVBQUUsRUFBRSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUV2RixlQUFlLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFeEIsTUFBTSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0FBQzFDLENBQUM7QUFFRCxJQUFJLEVBQUUsQ0FBQyJ9