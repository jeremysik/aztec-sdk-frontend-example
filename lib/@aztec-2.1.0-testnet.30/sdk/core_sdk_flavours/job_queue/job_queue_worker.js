"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobQueueWorker = void 0;
const debug_1 = require("@aztec/barretenberg/debug");
const job_1 = require("./job");
const job_queue_fft_factory_1 = require("./job_queue_fft_factory");
const job_queue_pedersen_1 = require("./job_queue_pedersen");
const job_queue_pippenger_1 = require("./job_queue_pippenger");
const debug = (0, debug_1.createLogger)('aztec:sdk:job_queue_worker');
const backgroundFetchDelay = 500;
const pingInterval = 1000;
/**
 * Responsible for getting jobs from a JobQueue, processing them, and returning the result.
 */
class JobQueueWorker {
    constructor(jobQueue, pedersen, pippenger, fftFactory) {
        this.jobQueue = jobQueue;
        this.notifyNewJob = async () => {
            if (this.newJobPromise) {
                return;
            }
            this.newJobPromise = this.fetchAndProcess();
            await this.newJobPromise;
            this.newJobPromise = undefined;
        };
        this.pedersen = new job_queue_pedersen_1.JobQueuePedersenClient(pedersen);
        this.pippenger = new job_queue_pippenger_1.JobQueuePippengerClient(pippenger);
        this.fftFactory = new job_queue_fft_factory_1.JobQueueFftFactoryClient(fftFactory);
    }
    async init(crsData) {
        await this.pippenger.init(crsData);
    }
    start() {
        this.jobQueue.on('new_job', this.notifyNewJob);
    }
    async stop() {
        this.jobQueue.off('new_job', this.notifyNewJob);
        await this.newJobPromise;
    }
    async fetchAndProcess() {
        if (document.hidden) {
            // We want foreground tabs to pick up a job first.
            await new Promise(resolve => setTimeout(resolve, backgroundFetchDelay));
        }
        try {
            const job = await this.jobQueue.getJob();
            if (job) {
                this.pingTimeout = setTimeout(() => this.ping(job.id), pingInterval);
                await this.processJob(job);
            }
        }
        catch (e) {
            debug(e);
        }
        finally {
            clearTimeout(this.pingTimeout);
        }
    }
    async ping(jobId) {
        try {
            const currentJobId = await this.jobQueue.ping(jobId);
            if (currentJobId === jobId) {
                this.pingTimeout = setTimeout(() => this.ping(jobId), pingInterval);
            }
        }
        catch (e) {
            debug(e);
        }
    }
    async processJob(job) {
        let data;
        let error = '';
        try {
            data = await this.process(job);
        }
        catch (e) {
            debug(e);
            error = e.message;
        }
        try {
            await this.jobQueue.completeJob(job.id, data, error);
        }
        catch (e) {
            debug(e);
        }
    }
    async process({ target, query, args }) {
        switch (target) {
            case job_1.JobQueueTarget.PEDERSEN:
                return this.pedersen[query](...args);
            case job_1.JobQueueTarget.PIPPENGER:
                return this.pippenger[query](...args);
            case job_1.JobQueueTarget.FFT: {
                const [circuitSize, ...fftArgs] = args;
                const fft = await this.fftFactory.getFft(circuitSize);
                return fft[query](...fftArgs);
            }
        }
    }
}
exports.JobQueueWorker = JobQueueWorker;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9iX3F1ZXVlX3dvcmtlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlX3Nka19mbGF2b3Vycy9qb2JfcXVldWUvam9iX3F1ZXVlX3dvcmtlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxxREFBeUQ7QUFHekQsK0JBQTRDO0FBQzVDLG1FQUFtRTtBQUVuRSw2REFBOEQ7QUFDOUQsK0RBQWdFO0FBRWhFLE1BQU0sS0FBSyxHQUFHLElBQUEsb0JBQVksRUFBQyw0QkFBNEIsQ0FBQyxDQUFDO0FBRXpELE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxDQUFDO0FBQ2pDLE1BQU0sWUFBWSxHQUFHLElBQUksQ0FBQztBQUUxQjs7R0FFRztBQUNILE1BQWEsY0FBYztJQVF6QixZQUFvQixRQUEyQixFQUFFLFFBQWtCLEVBQUUsU0FBb0IsRUFBRSxVQUFzQjtRQUE3RixhQUFRLEdBQVIsUUFBUSxDQUFtQjtRQW1CdkMsaUJBQVksR0FBRyxLQUFLLElBQUksRUFBRTtZQUNoQyxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7Z0JBQ3RCLE9BQU87YUFDUjtZQUVELElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1lBQzVDLE1BQU0sSUFBSSxDQUFDLGFBQWEsQ0FBQztZQUN6QixJQUFJLENBQUMsYUFBYSxHQUFHLFNBQVMsQ0FBQztRQUNqQyxDQUFDLENBQUM7UUExQkEsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLDJDQUFzQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ3JELElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSw2Q0FBdUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4RCxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksZ0RBQXdCLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDN0QsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBbUI7UUFDbkMsTUFBTSxJQUFJLENBQUMsU0FB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