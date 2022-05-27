"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SinglePedersen = void 0;
const serialize_1 = require("../../serialize");
/**
 * Single threaded implementation of pedersen.
 */
class SinglePedersen {
    /**
     * Long running functions can execute on a worker. If none is provided, call the wasm on the calling thread.
     *
     * @param wasm Synchronous functions will use use this wasm directly on the calling thread.
     * @param worker Asynchronous functions execute on this worker, preventing blocking the calling thread.
     */
    constructor(wasm, worker = wasm) {
        this.wasm = wasm;
        this.worker = worker;
    }
    async init() {
        this.wasm.call('pedersen__init');
        await this.worker.call('pedersen__init');
    }
    compress(lhs, rhs) {
        this.wasm.transferToHeap(lhs, 0);
        this.wasm.transferToHeap(rhs, 32);
        this.wasm.call('pedersen__compress_fields', 0, 32, 64);
        return Buffer.from(this.wasm.sliceMemory(64, 96));
    }
    compressInputs(inputs) {
        const inputVectors = (0, serialize_1.serializeBufferArrayToVector)(inputs);
        this.wasm.transferToHeap(inputVectors, 0);
        this.wasm.call('pedersen__compress', 0, 0);
        return Buffer.from(this.wasm.sliceMemory(0, 32));
    }
    compressWithHashIndex(inputs, hashIndex) {
        const inputVectors = (0, serialize_1.serializeBufferArrayToVector)(inputs);
        this.wasm.transferToHeap(inputVectors, 0);
        this.wasm.call('pedersen__compress_with_hash_index', 0, 0, hashIndex);
        return Buffer.from(this.wasm.sliceMemory(0, 32));
    }
    hashToField(data) {
        const mem = this.wasm.call('bbmalloc', data.length);
        this.wasm.transferToHeap(data, mem);
        this.wasm.call('pedersen__buffer_to_field', mem, data.length, 0);
        this.wasm.call('bbfree', mem);
        return Buffer.from(this.wasm.sliceMemory(0, 32));
    }
    async hashToTree(values) {
        const data = (0, serialize_1.serializeBufferArrayToVector)(values);
        const inputPtr = await this.worker.call('bbmalloc', data.length);
        await this.worker.transferToHeap(data, inputPtr);
        const resultPtr = await this.worker.call('pedersen__hash_to_tree', inputPtr);
        const resultNumFields = Buffer.from(await this.worker.sliceMemory(resultPtr, resultPtr + 4)).readUInt32BE(0);
        const resultData = Buffer.from(await this.worker.sliceMemory(resultPtr, resultPtr + 4 + resultNumFields * 32));
        await this.worker.call('bbfree', inputPtr);
        await this.worker.call('bbfree', resultPtr);
        return (0, serialize_1.deserializeArrayFromVector)(serialize_1.deserializeField, resultData).elem;
    }
}
exports.SinglePedersen = SinglePedersen;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2luZ2xlX3BlZGVyc2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NyeXB0by9wZWRlcnNlbi9zaW5nbGVfcGVkZXJzZW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsK0NBQTZHO0FBSzdHOztHQUVHO0FBQ0gsTUFBYSxjQUFjO0lBQ3pCOzs7OztPQUtHO0lBQ0gsWUFBb0IsSUFBc0IsRUFBVSxTQUE2QixJQUFXO1FBQXhFLFNBQUksR0FBSixJQUFJLENBQWtCO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBa0M7SUFBRyxDQUFDO0lBRXpGLEtBQUssQ0FBQyxJQUFJO1FBQ2YsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNqQyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVNLFFBQVEsQ0FBQyxHQUFlLEVBQUUsR0FBZTtRQUM5QyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUMsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDdkQsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQ3BELENBQUM7SUFFTSxjQUFjLENBQUMsTUFBZ0I7UUFDcEMsTUFBTSxZQUFZLEdBQUcsSUFBQSx3Q0FBNEIsRUFBQyxNQUFNLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxD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