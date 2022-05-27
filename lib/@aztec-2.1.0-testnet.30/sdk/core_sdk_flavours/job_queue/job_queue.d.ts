/// <reference types="node" />
import EventEmitter from 'events';
import { Job, JobQueueTarget } from './job';
import { JobQueueInterface } from './job_queue_interface';
export declare class JobQueue extends EventEmitter implements JobQueueInterface {
    private jobId;
    private pendingJobs;
    private pending?;
    private interruptableSleep;
    constructor();
    private processPendingJobs;
    private broadcastNewJob;
    getJob(): Promise<Job | undefined>;
    ping(jobId: number): Promise<number | undefined>;
    completeJob(jobId: number, data?: any, error?: string): Promise<void>;
    createJob(target: JobQueueTarget, query: string, args?: any[]): Promise<any>;
}
//# sourceMappingURL=job_queue.d.ts.map