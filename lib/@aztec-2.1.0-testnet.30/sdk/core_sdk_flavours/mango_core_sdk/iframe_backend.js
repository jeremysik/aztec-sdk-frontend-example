"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IframeBackend = void 0;
const tslib_1 = require("tslib");
const debug_1 = require("@aztec/barretenberg/debug");
const events_1 = tslib_1.__importDefault(require("events"));
const core_sdk_1 = require("../../core_sdk");
const transport_1 = require("../transport");
const create_mango_core_sdk_1 = require("./create_mango_core_sdk");
const debug = (0, debug_1.createLogger)('aztec:sdk:iframe_backend');
async function getServerUrl() {
    if (process.env.NODE_ENV === 'production') {
        const deployTag = await fetch('/DEPLOY_TAG', {})
            .then(resp => (!resp.ok ? '' : resp.text()))
            .catch(() => '');
        if (deployTag) {
            return `https://api.aztec.network/${deployTag}/falafel`;
        }
        else {
            return await fetch('/ROLLUP_PROVIDER_URL').then(resp => {
                if (!resp.ok) {
                    throw new Error('Failed to fetch /ROLLUP_PROVIDER_URL.');
                }
                return resp.text();
            });
        }
    }
    else {
        return 'http://localhost:8081';
    }
}
class IframeBackend extends events_1.default {
    constructor(origin) {
        super();
        this.origin = origin;
        this.coreSdkDispatch = (0, transport_1.createDispatchFn)(this, 'coreSdk', debug);
    }
    async initComponents(options) {
        if (!this.initPromise) {
            this.initPromise = this.initInternal(options);
        }
        await this.initPromise;
    }
    async initInternal(options) {
        if (options.debug) {
            (0, debug_1.enableLogs)(options.debug);
        }
        const serverUrl = await getServerUrl();
        this.coreSdk = await (0, create_mango_core_sdk_1.createMangoCoreSdk)(this.origin, { ...options, serverUrl });
        for (const e in core_sdk_1.SdkEvent) {
            const event = core_sdk_1.SdkEvent[e];
            this.coreSdk.on(event, (...args) => {
                // IframeFrontend has corresponding coreSdkDispatch method.
                this.emit('dispatch_msg', {
                    fn: 'coreSdkDispatch',
                    args: [{ fn: 'emit', args: [event, ...args] }],
                });
            });
        }
    }
}
exports.IframeBackend = IframeBackend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaWZyYW1lX2JhY2tlbmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZV9zZGtfZmxhdm91cnMvbWFuZ29fY29yZV9zZGsvaWZyYW1lX2JhY2tlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHFEQUFxRTtBQUNyRSw0REFBa0M7QUFDbEMsNkNBQTBDO0FBRTFDLDRDQUE2RDtBQUM3RCxtRUFBNkQ7QUFHN0QsTUFBTSxLQUFLLEdBQUcsSUFBQSxvQkFBWSxFQUFDLDBCQUEwQixDQUFDLENBQUM7QUFFdkQsS0FBSyxVQUFVLFlBQVk7SUFDekIsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsS0FBSyxZQUFZLEVBQUU7UUFDekMsTUFBTSxTQUFTLEdBQUcsTUFBTSxLQUFLLENBQUMsYUFBYSxFQUFFLEVBQUUsQ0FBQzthQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUMzQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFbkIsSUFBSSxTQUFTLEVBQUU7WUFDYixPQUFPLDZCQUE2QixTQUFTLFVBQVUsQ0FBQztTQUN6RDthQUFNO1lBQ0wsT0FBTyxNQUFNLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDckQsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFLEVBQUU7b0JBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyx1Q0FBdUMsQ0FBQyxDQUFDO2lCQUMxRDtnQkFDRCxPQUFPLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNyQixDQUFDLENBQUMsQ0FBQztTQUNKO0tBQ0Y7U0FBTTtRQUNMLE9BQU8sdUJBQXVCLENBQUM7S0FDaEM7QUFDSCxDQUFDO0FBT0QsTUFBYSxhQUFjLFNBQVEsZ0JBQVk7SUFJN0MsWUFBb0IsTUFBYztRQUNoQyxLQUFLLEVBQUUsQ0FBQztRQURVLFdBQU0sR0FBTixNQUFNLENBQVE7UUE4QjNCLG9CQUFlLEdBQUcsSUFBQSw0QkFBZ0IsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBNUJsRSxDQUFDO0lBRU0sS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUE2QjtRQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDL0M7UUFDRCxNQUFNLElBQUksQ0FBQyxXQUFXLENBQUM7SUFDekIsQ0FBQztJQUVPLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBNkI7UUFDdEQsSUFBSSxPQUFPLENBQUMsS0FBSyxFQUFFO1lBQ2pCLElBQUEsa0JBQVUsRUFBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDM0I7UUFFRCxNQUFNLFNBQVMsR0FBRyxNQUFNLFlBQVksRUFBRSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxPQUFPLEdBQUcsTUFBTSxJQUFBLDBDQUFrQixFQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLE9BQU8sRUFBRSxTQUFTLEVBQUUsQ0FBQyxDQUFDO1FBQ2hGLEtBQUssTUFBTSxDQUFDLElBQUksbUJBQVEsRUFBRTtZQUN4QixNQUFNLEtBQUssR0FBSSxtQkFBZ0IsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLElBQVcsRUFBRSxFQUFFO2dCQUN4QywyREFBMkQ7Z0JBQzNELElBQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFO29CQUN4QixFQUFFLEVBQUUsaUJBQWlCO29CQUNyQixJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztpQkFDL0MsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7Q0FHRjtBQW5DRCxzQ0FtQ0MifQ==