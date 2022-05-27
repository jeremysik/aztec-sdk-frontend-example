"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JobQueuePedersenClient = exports.JobQueuePedersen = void 0;
const crypto_1 = require("@aztec/barretenberg/crypto");
const job_1 = require("./job");
class JobQueuePedersen extends crypto_1.SinglePedersen {
    constructor(wasm, queue) {
        super(wasm);
        this.queue = queue;
        this.target = job_1.JobQueueTarget.PEDERSEN;
    }
    async hashToTree(values) {
        const result = await this.queue.createJob(this.target, 'hashToTree', [values.map(v => new Uint8Array(v))]);
        return result.map(v => Buffer.from(v));
    }
}
exports.JobQueuePedersen = JobQueuePedersen;
class JobQueuePedersenClient {
    constructor(pedersen) {
        this.pedersen = pedersen;
    }
    async hashToTree(values) {
        const result = await this.pedersen.hashToTree(values.map(v => Buffer.from(v)));
        return result.map(v => new Uint8Array(v));
    }
}
exports.JobQueuePedersenClient = JobQueuePedersenClient;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiam9iX3F1ZXVlX3BlZGVyc2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmVfc2RrX2ZsYXZvdXJzL2pvYl9xdWV1ZS9qb2JfcXVldWVfcGVkZXJzZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsdURBQXNFO0FBRXRFLCtCQUF1QztBQUd2QyxNQUFhLGdCQUFpQixTQUFRLHVCQUFjO0lBR2xELFlBQVksSUFBc0IsRUFBVSxLQUFlO1FBQ3pELEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUQ4QixVQUFLLEdBQUwsS0FBSyxDQUFVO1FBRjFDLFdBQU0sR0FBRyxvQkFBYyxDQUFDLFFBQVEsQ0FBQztJQUlsRCxDQUFDO0lBRUQsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFnQjtRQUMvQixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQzNHLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQ0Y7QUFYRCw0Q0FXQztBQUVELE1BQWEsc0JBQXNCO0lBQ2pDLFlBQW9CLFFBQWtCO1FBQWxCLGFBQVEsR0FBUixRQUFRLENBQVU7SUFBRyxDQUFDO0lBRTFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBb0I7UUFDbkMsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDL0UsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0NBQ0Y7QUFQRCx3REFPQyJ9