"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobQueueFftFactoryClient = exports.JobQueueFftFactory = void 0;
const job_1 = require("./job");
class JobQueueFft {
    constructor(queue, circuitSize) {
        this.queue = queue;
        this.circuitSize = circuitSize;
        this.target = job_1.JobQueueTarget.FFT;
    }
    async fft(coefficients, constant) {
        return this.queue.createJob(this.target, 'fft', [this.circuitSize, coefficients, constant]);
    }
    async ifft(coefficients) {
        return this.queue.createJob(this.target, 'ifft', [this.circuitSize, coefficients]);
    }
}
class JobQueueFftFactory {
    constructor(queue) {
        this.queue = queue;
    }
    async createFft(circuitSize) {
        return new JobQueueFft(this.queue, circuitSize);
    }
}
exports.JobQueueFftFactory = JobQueueFftFactory;
class JobQueueFftClient {
    constructor(fftInstance) {
        this.fftInstance = fftInstance;
    }
    async fft(coefficients, constant) {
        return this.fftInstance.fft(coefficients, constant);
    }
    async ifft(coefficients) {
        return this.fftInstance.ifft(coefficients);
    }
}
class JobQueueFftFactoryClient {
    constructor(fftFactory) {
        this.fftFactory = fftFactory;
        this.ffts = {};
    }
    async createFft(circuitSize) {
        if (!this.ffts[circuitSize]) {
            const fft = await this.fftFactory.createFft(circuitSize);
            this.ffts[circuitSize] = new JobQueueFftClient(fft);
        }
        return this.ffts[circuitSize];
    }
    async getFft(circuitSize) {
        return this.createFft(circuitSize);
    }
}
exports.JobQueueFftFactoryClient = JobQueueFftFactoryClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9iX3F1ZXVlX2ZmdF9mYWN0b3J5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmVfc2RrX2ZsYXZvdXJzL2pvYl9xdWV1ZS9qb2JfcXVldWVfZmZ0X2ZhY3RvcnkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsK0JBQXVDO0FBR3ZDLE1BQU0sV0FBVztJQUdmLFlBQW9CLEtBQWUsRUFBVSxXQUFtQjtRQUE1QyxVQUFLLEdBQUwsS0FBSyxDQUFVO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVE7UUFGL0MsV0FBTSxHQUFHLG9CQUFjLENBQUMsR0FBRyxDQUFDO0lBRXNCLENBQUM7SUFFcEUsS0FBSyxDQUFDLEdBQUcsQ0FBQyxZQUF3QixFQUFFLFFBQW9CO1FBQ3RELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO0lBQzlGLENBQUM7SUFFRCxLQUFLLENBQUMsSUFBSSxDQUFDLFlBQXdCO1FBQ2pDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLFlBQVksQ0FBQyxDQUFDLENBQUM7SUFDckYsQ0FBQztDQUNGO0FBRUQsTUFBYSxrQkFBa0I7SUFDN0IsWUFBb0IsS0FBZTtRQUFmLFVBQUssR0FBTCxLQUFLLENBQVU7SUFBRyxDQUFDO0lBRXZDLEtBQUssQ0FBQyxTQUFTLENBQUMsV0FBbUI7UUFDakMsT0FBTyxJQUFJLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDRjtBQU5ELGdEQU1DO0FBRUQsTUFBTSxpQkFBaUI7SUFDckIsWUFBb0IsV0FBZ0I7UUFBaEIsZ0JBQVcsR0FBWCxXQUFXLENBQUs7SUFBRyxDQUFDO0lBRXhDLEtBQUssQ0FBQyxHQUFHLENBQUMsWUFBd0IsRUFBRSxRQUFvQjtRQUN0RCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0RCxDQUFDO0lBRUQsS0FBSyxDQUFDLElBQUksQ0FBQyxZQUF3QjtRQUNqQyxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO0lBQzdDLENBQUM7Q0FDRjtBQUVELE1BQWEsd0JBQXdCO0lBR25DLFlBQW9CLFVBQXNCO1FBQXRCLGVBQVUsR0FBVixVQUFVLENBQVk7UUFGbEMsU0FBSSxHQUFpRCxFQUFFLENBQUM7SUFFbkIsQ0FBQztJQUU5QyxLQUFLLENBQUMsU0FBUyxDQUFDLFdBQW1CO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFO1lBQzNCLE1BQU0sR0FBRyxHQUFHLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxJQUFJLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3JEO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDO0lBQ2hDLENBQUM7SUFFRCxLQUFLLENBQUMsTUFBTSxDQUFDLFdBQW1CO1FBQzlCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNyQyxDQUFDO0NBQ0Y7QUFoQkQsNERBZ0JDIn0=