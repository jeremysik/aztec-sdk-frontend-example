"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNumWorkers = void 0;
const tslib_1 = require("tslib");
const detect_node_1 = tslib_1.__importDefault(require("detect-node"));
const os_1 = tslib_1.__importDefault(require("os"));
function getNumWorkers() {
    const nextLowestPowerOf2 = (n) => Math.pow(2, Math.floor(Math.log(n) / Math.log(2)));
    const numCPU = !detect_node_1.default ? navigator.hardwareConcurrency || 2 : os_1.default.cpus().length;
    return nextLowestPowerOf2(Math.min(numCPU, 8));
}
exports.getNumWorkers = getNumWorkers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0X251bV93b3JrZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2NvcmVfc2RrX2ZsYXZvdXJzL2dldF9udW1fd29ya2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsc0VBQWlDO0FBQ2pDLG9EQUFvQjtBQUVwQixTQUFnQixhQUFhO0lBQzNCLE1BQU0sa0JBQWtCLEdBQUcsQ0FBQyxDQUFTLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3RixNQUFNLE1BQU0sR0FBRyxDQUFDLHFCQUFNLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLFlBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLENBQUM7SUFDL0UsT0FBTyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0FBQ2pELENBQUM7QUFKRCxzQ0FJQyJ9