"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IframeFrontend = void 0;
const debug_1 = require("@aztec/barretenberg/debug");
const core_sdk_1 = require("../../core_sdk");
const transport_1 = require("../transport");
const debug = (0, debug_1.createLogger)('aztec:sdk:iframe_frontend');
class IframeFrontend {
    constructor(transportClient) {
        this.transportClient = transportClient;
        this.coreSdkDispatch = (0, transport_1.createDispatchFn)(this, 'coreSdk', debug);
    }
    async initComponents(options) {
        // Call `initComponents` on the IframeBackend. Constructs and initializes the strawberry core sdk.
        await this.transportClient.request({ fn: 'initComponents', args: [options] });
        // All requests on CoreSdkDispatch will be sent to IframeBackend coreSdkDispatch function.
        this.coreSdk = new core_sdk_1.CoreSdkDispatch(msg => {
            debug(`dispatch request: ${msg.fn}(${msg.args})`);
            return this.transportClient.request({ fn: 'coreSdkDispatch', args: [msg] });
        });
        this.transportClient.on('event_msg', ({ fn, args }) => this[fn](...args));
        return { coreSdk: new core_sdk_1.CoreSdkClientStub(this.coreSdk) };
    }
}
exports.IframeFrontend = IframeFrontend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lX2Zyb250ZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmVfc2RrX2ZsYXZvdXJzL3N0cmF3YmVycnlfY29yZV9zZGsvaWZyYW1lX2Zyb250ZW5kLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHFEQUF5RDtBQUN6RCw2Q0FBZ0c7QUFDaEcsNENBQWlFO0FBR2pFLE1BQU0sS0FBSyxHQUFHLElBQUEsb0JBQVksRUFBQywyQkFBMkIsQ0FBQyxDQUFDO0FBRXhELE1BQWEsY0FBYztJQUd6QixZQUFvQixlQUFnQztRQUFoQyxvQkFBZSxHQUFmLGVBQWUsQ0FBaUI7UUFpQjdDLG9CQUFlLEdBQUcsSUFBQSw0QkFBZ0IsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBakJYLENBQUM7SUFFakQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFpQztRQUMzRCxrR0FBa0c7UUFDbEcsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxnQkFBZ0IsRUFBRSxJQUFJLEVBQUUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFOUUsMEZBQTBGO1FBQzFGLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSwwQkFBZSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ3ZDLEtBQUssQ0FBQyxxQkFBcUIsR0FBRyxDQUFDLEVBQUUsSUFBSSxHQUFHLENBQUMsSUFBSSxHQUFHLENBQUMsQ0FBQztZQUNsRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsRUFBRSxFQUFFLGlCQUFpQixFQUFFLElBQUksRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5RSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksQ0FBQyxlQUFlLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBRTFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSw0QkFBaUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0NBR0Y7QUFyQkQsd0NBcUJDIn0=