"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MemorySerialQueue = void 0;
const fifo_1 = require("@aztec/barretenberg/fifo");
class MemorySerialQueue {
    constructor() {
        this.queue = new fifo_1.MemoryFifo();
        this.queue.process(fn => fn());
    }
    length() {
        return this.queue.length();
    }
    cancel() {
        this.queue.cancel();
    }
    async push(fn) {
        return new Promise((resolve, reject) => {
            this.queue.put(async () => {
                try {
                    const res = await fn();
                    resolve(res);
                }
                catch (e) {
                    reject(e);
                }
            });
        });
    }
}
exports.MemorySerialQueue = MemorySerialQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVtb3J5X3NlcmlhbF9xdWV1ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJpYWxfcXVldWUvbWVtb3J5X3NlcmlhbF9xdWV1ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtREFBc0Q7QUFHdEQsTUFBYSxpQkFBaUI7SUFHNUI7UUFGaUIsVUFBSyxHQUFHLElBQUksaUJBQVUsRUFBdUIsQ0FBQztRQUc3RCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDakMsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDN0IsQ0FBQztJQUVNLE1BQU07UUFDWCxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQ3RCLENBQUM7SUFFTSxLQUFLLENBQUMsSUFBSSxDQUFJLEVBQW9CO1FBQ3ZDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7WUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsS0FBSyxJQUFJLEVBQUU7Z0JBQ3hCLElBQUk7b0JBQ0YsTUFBTSxHQUFHLEdBQUcsTUFBTSxFQUFFLEVBQUUsQ0FBQztvQkFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2lCQUNkO2dCQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNWLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDWDtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUEzQkQsOENBMkJDIn0=