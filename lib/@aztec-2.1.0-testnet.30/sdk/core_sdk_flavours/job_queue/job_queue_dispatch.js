"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobQueueDispatch = void 0;
const events_1 = require("events");
class JobQueueDispatch extends events_1.EventEmitter {
    constructor(handler) {
        super();
        this.handler = handler;
    }
    async getJob() {
        return await this.handler({ fn: 'getJob', args: [] });
    }
    async ping(jobId) {
        return await this.handler({ fn: 'ping', args: [jobId] });
    }
    async completeJob(jobId, data, error) {
        return await this.handler({ fn: 'completeJob', args: [jobId, data, error] });
    }
}
exports.JobQueueDispatch = JobQueueDispatch;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9iX3F1ZXVlX2Rpc3BhdGNoLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmVfc2RrX2ZsYXZvdXJzL2pvYl9xdWV1ZS9qb2JfcXVldWVfZGlzcGF0Y2gudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQXNDO0FBS3RDLE1BQWEsZ0JBQWlCLFNBQVEscUJBQVk7SUFDaEQsWUFBb0IsT0FBMkM7UUFDN0QsS0FBSyxFQUFFLENBQUM7UUFEVSxZQUFPLEdBQVAsT0FBTyxDQUFvQztJQUUvRCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU07UUFDVixPQUFPLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBYTtRQUN0QixPQUFPLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWEsRUFBRSxJQUFVLEVBQUUsS0FBYztRQUN6RCxPQUFPLE1BQU0sSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsSUFBSSxFQUFFLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRSxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDL0UsQ0FBQztDQUNGO0FBaEJELDRDQWdCQyJ9