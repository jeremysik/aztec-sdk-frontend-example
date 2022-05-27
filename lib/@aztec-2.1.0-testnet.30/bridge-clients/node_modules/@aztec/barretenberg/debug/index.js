"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableLogs = exports.createLogger = void 0;
const tslib_1 = require("tslib");
const debug_1 = (0, tslib_1.__importDefault)(require("debug"));
exports.createLogger = debug_1.default;
function enableLogs(str) {
    debug_1.default.enable(str);
}
exports.enableLogs = enableLogs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvZGVidWcvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLCtEQUEwQjtBQUViLFFBQUEsWUFBWSxHQUFHLGVBQUssQ0FBQztBQUVsQyxTQUFnQixVQUFVLENBQUMsR0FBVztJQUNwQyxlQUFLLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3BCLENBQUM7QUFGRCxnQ0FFQyJ9