"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedWorkerTransportListener = void 0;
const tslib_1 = require("tslib");
const events_1 = tslib_1.__importDefault(require("events"));
const transport_1 = require("../../transport");
class SharedWorkerTransportListener extends events_1.default {
    constructor(sharedWorker) {
        super();
        this.sharedWorker = sharedWorker;
        this.handleMessageEvent = (event) => {
            const [port] = event.ports;
            if (!port) {
                return;
            }
            this.emit('new_socket', new transport_1.MessageChannelTransportSocket(port));
        };
    }
    open() {
        this.sharedWorker.onconnect = this.handleMessageEvent;
    }
    close() {
        this.sharedWorker.onconnect = () => { };
    }
}
exports.SharedWorkerTransportListener = SharedWorkerTransportListener;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3dvcmtlcl90cmFuc3BvcnRfbGlzdGVuZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZV9zZGtfZmxhdm91cnMvY2hvY29sYXRlX2NvcmVfc2RrL3NoYXJlZF93b3JrZXJfdHJhbnNwb3J0X2xpc3RlbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSw0REFBa0M7QUFDbEMsK0NBQW1GO0FBRW5GLE1BQWEsNkJBQThCLFNBQVEsZ0JBQVk7SUFDN0QsWUFBb0IsWUFBcUM7UUFDdkQsS0FBSyxFQUFFLENBQUM7UUFEVSxpQkFBWSxHQUFaLFlBQVksQ0FBeUI7UUFZakQsdUJBQWtCLEdBQUcsQ0FBQyxLQUFtQixFQUFFLEVBQUU7WUFDbkQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDVCxPQUFPO2FBQ1I7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxJQUFJLHlDQUE2QixDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDbkUsQ0FBQyxDQUFDO0lBaEJGLENBQUM7SUFFRCxJQUFJO1FBQ0YsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDO0lBQ3hELENBQUM7SUFFRCxLQUFLO1FBQ0gsSUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7Q0FTRjtBQXBCRCxzRUFvQkMifQ==