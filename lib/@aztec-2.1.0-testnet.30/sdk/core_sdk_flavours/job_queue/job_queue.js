"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobQueue = void 0;
const tslib_1 = require("tslib");
const fifo_1 = require("@aztec/barretenberg/fifo");
const sleep_1 = require("@aztec/barretenberg/sleep");
const events_1 = tslib_1.__importDefault(require("events"));
const broadcastInterval = 1000;
const pingElapsed = 2000;
class JobQueue extends events_1.default {
    constructor() {
        super();
        this.jobId = 0;
        this.pendingJobs = new fifo_1.MemoryFifo();
        this.interruptableSleep = new sleep_1.InterruptableSleep();
        this.processPendingJobs();
    }
    async processPendingJobs() {
        while (true) {
            const job = await this.pendingJobs.get();
            if (!job) {
                break;
            }
            await this.broadcastNewJob(job);
        }
    }
    async broadcastNewJob(job) {
        this.pending = job;
        while (this.pending) {
            if (Date.now() - this.pending.timestamp >= pingElapsed) {
                this.emit('new_job');
            }
            await this.interruptableSleep.sleep(broadcastInterval);
        }
    }
    async getJob() {
        const now = Date.now();
        const pendingJob = this.pending;
        if (!pendingJob || now - pendingJob.timestamp < pingElapsed) {
            return;
        }
        pendingJob.timestamp = now;
        return pendingJob.job;
    }
    async ping(jobId) {
        if (!this.pending) {
            return;
        }
        if (this.pending.job.id === jobId) {
            const now = Date.now();
            this.pending.timestamp = now;
        }
        return this.pending.job.id;
    }
    async completeJob(jobId, data, error) {
        if (!this.pending || this.pending.job.id !== jobId) {
            return;
        }
        if (error) {
            this.pending.reject(new Error(error));
        }
        else {
            this.pending.resolve(data);
        }
        this.pending = undefined;
        this.interruptableSleep.interrupt();
    }
    async createJob(target, query, args = []) {
        return new Promise((resolve, reject) => {
            const job = { id: this.jobId++, target, query, args };
            this.pendingJobs.put({ job, resolve, reject, timestamp: 0 });
        });
    }
}
exports.JobQueue = JobQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9iX3F1ZXVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmVfc2RrX2ZsYXZvdXJzL2pvYl9xdWV1ZS9qb2JfcXVldWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLG1EQUFzRDtBQUN0RCxxREFBK0Q7QUFDL0QsNERBQWtDO0FBV2xDLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxDQUFDO0FBQy9CLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQztBQUV6QixNQUFhLFFBQVMsU0FBUSxnQkFBWTtJQU14QztRQUNFLEtBQUssRUFBRSxDQUFDO1FBTkYsVUFBSyxHQUFHLENBQUMsQ0FBQztRQUNWLGdCQUFXLEdBQUcsSUFBSSxpQkFBVSxFQUFjLENBQUM7UUFFM0MsdUJBQWtCLEdBQUcsSUFBSSwwQkFBa0IsRUFBRSxDQUFDO1FBSXBELElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO0lBQzVCLENBQUM7SUFFTyxLQUFLLENBQUMsa0JBQWtCO1FBQzlCLE9BQU8sSUFBSSxFQUFFO1lBQ1gsTUFBTSxHQUFHLEdBQUcsTUFBTSxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3pDLElBQUksQ0FBQyxHQUFHLEVBQUU7Z0JBQ1IsTUFBTTthQUNQO1lBRUQsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2pDO0lBQ0gsQ0FBQztJQUVPLEtBQUssQ0FBQyxlQUFlLENBQUMsR0FBZTtRQUMzQyxJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixPQUFPLElBQUksQ0FBQyxPQUFPLEVBQUU7WUFDbkIsSUFBSSxJQUFJLENBQUMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLElBQUksV0FBVyxFQUFFO2dCQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2FBQ3RCO1lBQ0QsTUFBTSxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDeEQ7SUFDSCxDQUFDO0lBRUQsS0FBSyxDQUFDLE1BQU07UUFDVixNQUFNLEdBQUcsR0FBRyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDdkIsTUFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQztRQUNoQyxJQUFJLENBQUMsVUFBVSxJQUFJLEdBQUcsR0FBRyxVQUFVLENBQUMsU0FBUyxHQUFHLFdBQVcsRUFBRTtZQUMzRCxPQUFPO1NBQ1I7UUFFRCxVQUFVLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztRQUUzQixPQUFPLFVBQVUsQ0FBQyxHQUFHLENBQUM7SUFDeEIsQ0FBQztJQUVELEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBYTtRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRTtZQUNqQixPQUFPO1NBQ1I7UUFDRCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsS0FBSyxLQUFLLEVBQUU7WUFDakMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxHQUFHLEdBQUcsQ0FBQztTQUM5QjtRQUNELE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFFRCxLQUFLLENBQUMsV0FBVyxDQUFDLEtBQWEsRUFBRSxJQUFVLEVBQUUsS0FBYztRQUN6RCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssS0FBSyxFQUFFO1lBQ2xELE9BQU87U0FDUjtRQUVELElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztTQUN2QzthQUFNO1lBQ0wsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDNUI7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQztRQUN6QixJQUFJLENBQUMsa0JBQWtCLENBQUMsU0FBUyxFQUFFLENBQUM7SUFDdEMsQ0FBQztJQUVELEtBQUssQ0FBQyxTQUFTLENBQUMsTUFBc0IsRUFBRSxLQUFhLEVBQUUsT0FBYyxFQUFFO1FBQ3JFLE9BQU8sSUFBSSxPQUFPLENBQU0sQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDMUMsTUFBTSxHQUFHLEdBQUcsRUFBRSxFQUFFLEVBQUUsSUFBSSxDQUFDLEtBQUssRUFBRSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLENBQUM7WUFDdEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxHQUFHLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMvRCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTNFRCw0QkEyRUMifQ==