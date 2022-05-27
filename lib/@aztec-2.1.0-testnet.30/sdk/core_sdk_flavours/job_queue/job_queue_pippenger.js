"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobQueuePippengerClient = exports.JobQueuePippenger = void 0;
const job_1 = require("./job");
class JobQueuePippenger {
    constructor(queue) {
        this.queue = queue;
        this.target = job_1.JobQueueTarget.PIPPENGER;
    }
    async init() {
        // Don't need to do anything, as the actual work is done by a job queue worker.
    }
    async pippengerUnsafe(scalars, from, range) {
        const result = await this.queue.createJob(this.target, 'pippengerUnsafe', [scalars, from, range]);
        return Buffer.from(result);
    }
}
exports.JobQueuePippenger = JobQueuePippenger;
class JobQueuePippengerClient {
    constructor(pippenger) {
        this.pippenger = pippenger;
    }
    async init(crsData) {
        await this.pippenger.init(crsData);
    }
    async pippengerUnsafe(scalars, from, range) {
        const result = await this.pippenger.pippengerUnsafe(scalars, from, range);
        return new Uint8Array(result);
    }
}
exports.JobQueuePippengerClient = JobQueuePippengerClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9iX3F1ZXVlX3BpcHBlbmdlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlX3Nka19mbGF2b3Vycy9qb2JfcXVldWUvam9iX3F1ZXVlX3BpcHBlbmdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSwrQkFBdUM7QUFHdkMsTUFBYSxpQkFBaUI7SUFHNUIsWUFBb0IsS0FBZTtRQUFmLFVBQUssR0FBTCxLQUFLLENBQVU7UUFGbEIsV0FBTSxHQUFHLG9CQUFjLENBQUMsU0FBUyxDQUFDO0lBRWIsQ0FBQztJQUV2QyxLQUFLLENBQUMsSUFBSTtRQUNSLCtFQUErRTtJQUNqRixDQUFDO0lBRUQsS0FBSyxDQUFDLGVBQWUsQ0FBQyxPQUFtQixFQUFFLElBQVksRUFBRSxLQUFhO1FBQ3BFLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxpQkFBaUIsRUFBRSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUNsRyxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNGO0FBYkQsOENBYUM7QUFFRCxNQUFhLHVCQUF1QjtJQUNsQyxZQUFvQixTQUFvQjtRQUFwQixjQUFTLEdBQVQsU0FBUyxDQUFXO0lBQUcsQ0FBQztJQUU1QyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQW1CO1FBQzVCLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVELEtBQUssQ0FBQyxlQUFlLENBQUMsT0FBbUIsRUFBRSxJQUFZLEVBQUUsS0FBYTtRQUNwRSxNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDMUUsT0FBTyxJQUFJLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDO0NBQ0Y7QUFYRCwwREFXQyJ9