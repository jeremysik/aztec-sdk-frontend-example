"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MutexSerialQueue = void 0;
const fifo_1 = require("@aztec/barretenberg/fifo");
const mutex_1 = require("@aztec/barretenberg/mutex");
class MutexSerialQueue {
    constructor(db, name, expiry = 5000, tryLockInterval = 2000, pingInterval = 2000) {
        this.queue = new fifo_1.MemoryFifo();
        this.queue.process(fn => fn());
        this.mutex = new mutex_1.Mutex(db, name, expiry, tryLockInterval, pingInterval);
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
                await this.mutex.lock();
                try {
                    const res = await fn();
                    resolve(res);
                }
                catch (e) {
                    reject(e);
                }
                finally {
                    await this.mutex.unlock();
                }
            });
        });
    }
}
exports.MutexSerialQueue = MutexSerialQueue;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXV0ZXhfc2VyaWFsX3F1ZXVlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcmlhbF9xdWV1ZS9tdXRleF9zZXJpYWxfcXVldWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbURBQXNEO0FBQ3RELHFEQUFpRTtBQUdqRSxNQUFhLGdCQUFnQjtJQUkzQixZQUFZLEVBQWlCLEVBQUUsSUFBWSxFQUFFLE1BQU0sR0FBRyxJQUFJLEVBQUUsZUFBZSxHQUFHLElBQUksRUFBRSxZQUFZLEdBQUcsSUFBSTtRQUh0RixVQUFLLEdBQUcsSUFBSSxpQkFBVSxFQUF1QixDQUFDO1FBSTdELElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksYUFBSyxDQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLGVBQWUsRUFBRSxZQUFZLENBQUMsQ0FBQztJQUMxRSxDQUFDO0lBRU0sTUFBTTtRQUNYLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUM3QixDQUFDO0lBRU0sTUFBTTtRQUNYLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUM7SUFDdEIsQ0FBQztJQUVNLEtBQUssQ0FBQyxJQUFJLENBQUksRUFBb0I7UUFDdkMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtZQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDeEIsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO2dCQUN4QixJQUFJO29CQUNGLE1BQU0sR0FBRyxHQUFHLE1BQU0sRUFBRSxFQUFFLENBQUM7b0JBQ3ZCLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQztpQkFDZDtnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFDVixNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ1g7d0JBQVM7b0JBQ1IsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFBRSxDQUFDO2lCQUMzQjtZQUNILENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFoQ0QsNENBZ0NDIn0=