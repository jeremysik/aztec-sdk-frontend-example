/// <reference types="node" />
import { EventEmitter } from 'events';
import { DispatchMsg } from '../transport';
import { Job } from './job';
import { JobQueueInterface } from './job_queue_interface';
export declare class JobQueueDispatch extends EventEmitter implements JobQueueInterface {
    private handler;
    constructor(handler: (msg: DispatchMsg) => Promise<any>);
    getJob(): Promise<Job | undefined>;
    ping(jobId: number): Promise<any>;
    completeJob(jobId: number, data?: any, error?: string): Promise<any>;
}
//# sourceMappingURL=job_queue_dispatch.d.ts.map