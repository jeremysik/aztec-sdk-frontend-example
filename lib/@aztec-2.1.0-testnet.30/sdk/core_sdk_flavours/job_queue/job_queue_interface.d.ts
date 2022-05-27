/// <reference types="node" />
import EventEmitter from 'events';
import { Job } from './job';
export interface JobQueueInterface extends EventEmitter {
    on(name: 'new_job', cb: () => void): this;
    getJob(): Promise<Job | undefined>;
    ping(jobId: number): Promise<number | undefined>;
    completeJob(jobId: number, data?: any, error?: string): Promise<void>;
}
//# sourceMappingURL=job_queue_interface.d.ts.map