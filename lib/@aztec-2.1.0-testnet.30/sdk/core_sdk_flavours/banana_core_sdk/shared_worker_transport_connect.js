"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SharedWorkerTransportConnect = void 0;
const transport_1 = require("../../transport");
class SharedWorkerTransportConnect {
    constructor(sharedWorker) {
        this.sharedWorker = sharedWorker;
    }
    async createSocket() {
        return new transport_1.MessageChannelTransportSocket(this.sharedWorker.port);
    }
}
exports.SharedWorkerTransportConnect = SharedWorkerTransportConnect;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hhcmVkX3dvcmtlcl90cmFuc3BvcnRfY29ubmVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlX3Nka19mbGF2b3Vycy9iYW5hbmFfY29yZV9zZGsvc2hhcmVkX3dvcmtlcl90cmFuc3BvcnRfY29ubmVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBa0Y7QUFFbEYsTUFBYSw0QkFBNEI7SUFDdkMsWUFBb0IsWUFBMEI7UUFBMUIsaUJBQVksR0FBWixZQUFZLENBQWM7SUFBRyxDQUFDO0lBRWxELEtBQUssQ0FBQyxZQUFZO1FBQ2hCLE9BQU8sSUFBSSx5Q0FBNkIsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ25FLENBQUM7Q0FDRjtBQU5ELG9FQU1DIn0=