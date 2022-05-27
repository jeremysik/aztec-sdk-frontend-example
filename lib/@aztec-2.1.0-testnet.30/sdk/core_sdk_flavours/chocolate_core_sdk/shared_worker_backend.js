"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedWorkerBackend = void 0;
const tslib_1 = require("tslib");
const debug_1 = require("@aztec/barretenberg/debug");
const events_1 = tslib_1.__importDefault(require("events"));
const core_sdk_1 = require("../../core_sdk");
const job_queue_1 = require("../job_queue");
const transport_1 = require("../transport");
const create_chocolate_core_sdk_1 = require("./create_chocolate_core_sdk");
const debug = (0, debug_1.createLogger)('aztec:sdk:shared_worker_backend');
class SharedWorkerBackend extends events_1.default {
    constructor() {
        super();
        this.jobQueue = new job_queue_1.JobQueue();
        this.jobQueueDispatch = (0, transport_1.createDispatchFn)(this, 'jobQueue', debug);
        this.coreSdkDispatch = (0, transport_1.createDispatchFn)(this, 'coreSdk', debug);
    }
    async initComponents(options) {
        if (!this.initPromise) {
            this.initPromise = this.initComponentsInternal(options);
        }
        await this.initPromise;
    }
    async initComponentsInternal(options) {
        if (options.debug) {
            (0, debug_1.enableLogs)(options.debug);
        }
        this.jobQueue.on('new_job', () => {
            // SharedWorkerFrontend has corresponding jobQueueDispatch method.
            this.emit('dispatch_msg', {
                fn: 'jobQueueDispatch',
                args: [{ fn: 'emit', args: ['new_job'] }],
            });
        });
        this.coreSdk = await (0, create_chocolate_core_sdk_1.createChocolateCoreSdk)(this.jobQueue, options);
        for (const e in core_sdk_1.SdkEvent) {
            const event = core_sdk_1.SdkEvent[e];
            this.coreSdk.on(event, (...args) => {
                this.emit('dispatch_msg', {
                    fn: 'coreSdkDispatch',
                    args: [{ fn: 'emit', args: [event, ...args] }],
                });
            });
        }
    }
}
exports.SharedWorkerBackend = SharedWorkerBackend;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3dvcmtlcl9iYWNrZW5kLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmVfc2RrX2ZsYXZvdXJzL2Nob2NvbGF0ZV9jb3JlX3Nkay9zaGFyZWRfd29ya2VyX2JhY2tlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLHFEQUFxRTtBQUNyRSw0REFBa0M7QUFDbEMsNkNBQXNFO0FBQ3RFLDRDQUF3QztBQUN4Qyw0Q0FBNkQ7QUFFN0QsMkVBQXFFO0FBRXJFLE1BQU0sS0FBSyxHQUFHLElBQUEsb0JBQVksRUFBQyxpQ0FBaUMsQ0FBQyxDQUFDO0FBTzlELE1BQWEsbUJBQW9CLFNBQVEsZ0JBQVk7SUFLbkQ7UUFDRSxLQUFLLEVBQUUsQ0FBQztRQUxGLGFBQVEsR0FBRyxJQUFJLG9CQUFRLEVBQUUsQ0FBQztRQXlDM0IscUJBQWdCLEdBQUcsSUFBQSw0QkFBZ0IsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQzdELG9CQUFlLEdBQUcsSUFBQSw0QkFBZ0IsRUFBQyxJQUFJLEVBQUUsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBcENsRSxDQUFDO0lBRU0sS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFnQztRQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRTtZQUNyQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN6RDtRQUNELE1BQU0sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUN6QixDQUFDO0lBRU8sS0FBSyxDQUFDLHNCQUFzQixDQUFDLE9BQWdDO1FBQ25FLElBQUksT0FBTyxDQUFDLEtBQUssRUFBRTtZQUNqQixJQUFBLGtCQUFVLEVBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO1FBRUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUMvQixrRUFBa0U7WUFDbEUsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ3hCLEVBQUUsRUFBRSxrQkFBa0I7Z0JBQ3RCLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDO2FBQzFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLElBQUEsa0RBQXNCLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUVwRSxLQUFLLE1BQU0sQ0FBQyxJQUFJLG1CQUFRLEVBQUU7WUFDeEIsTUFBTSxLQUFLLEdBQUksbUJBQWdCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxJQUFXLEVBQUUsRUFBRTtnQkFDeEMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUU7b0JBQ3hCLEVBQUUsRUFBRSxpQkFBaUI7b0JBQ3JCLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxLQUFLLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRSxDQUFDO2lCQUMvQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztDQUlGO0FBNUNELGtEQTRDQyJ9