"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BananaCoreSdk = void 0;
const tslib_1 = require("tslib");
const debug_1 = tslib_1.__importDefault(require("debug"));
const core_sdk_1 = require("../../core_sdk");
const debug = (0, debug_1.default)('bb:banana_core_sdk');
class BananaCoreSdk extends core_sdk_1.CoreSdkDispatch {
    constructor(dispatch, jobQueueWorker, workerPool) {
        super(dispatch);
        this.jobQueueWorker = jobQueueWorker;
        this.workerPool = workerPool;
    }
    async destroy() {
        var _a;
        // We don't actually destroy a remote sdk. Just emit the destroy event to perform any cleanup.
        debug('Destroying banana core sdk...');
        await ((_a = this.jobQueueWorker) === null || _a === void 0 ? void 0 : _a.stop());
        await this.workerPool.destroy();
        this.emit(core_sdk_1.SdkEvent.DESTROYED);
        debug('Banana core sdk destroyed.');
    }
}
exports.BananaCoreSdk = BananaCoreSdk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFuYW5hX2NvcmVfc2RrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmVfc2RrX2ZsYXZvdXJzL2JhbmFuYV9jb3JlX3Nkay9iYW5hbmFfY29yZV9zZGsudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLDBEQUFnQztBQUNoQyw2Q0FBMkQ7QUFJM0QsTUFBTSxLQUFLLEdBQUcsSUFBQSxlQUFXLEVBQUMsb0JBQW9CLENBQUMsQ0FBQztBQUVoRCxNQUFhLGFBQWMsU0FBUSwwQkFBZTtJQUNoRCxZQUNFLFFBQTRDLEVBQ3BDLGNBQThCLEVBQzlCLFVBQXNCO1FBRTlCLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUhSLG1CQUFjLEdBQWQsY0FBYyxDQUFnQjtRQUM5QixlQUFVLEdBQVYsVUFBVSxDQUFZO0lBR2hDLENBQUM7SUFFTSxLQUFLLENBQUMsT0FBTzs7UUFDbEIsOEZBQThGO1FBQzlGLEtBQUssQ0FBQywrQkFBK0IsQ0FBQyxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQSxNQUFBLElBQUksQ0FBQyxjQUFjLDBDQUFFLElBQUksRUFBRSxDQUFBLENBQUM7UUFDbEMsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUM5QixLQUFLLENBQUMsNEJBQTRCLENBQUMsQ0FBQztJQUN0QyxDQUFDO0NBQ0Y7QUFqQkQsc0NBaUJDIn0=