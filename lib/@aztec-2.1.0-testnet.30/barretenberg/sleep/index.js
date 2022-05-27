"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sleep = exports.InterruptableSleep = void 0;
class InterruptableSleep {
    constructor() {
        this.interruptResolve = () => { };
        this.interruptPromise = new Promise(resolve => (this.interruptResolve = resolve));
        this.timeouts = [];
    }
    async sleep(ms) {
        let timeout;
        const promise = new Promise(resolve => (timeout = setTimeout(resolve, ms)));
        this.timeouts.push(timeout);
        await Promise.race([promise, this.interruptPromise]);
        clearTimeout(timeout);
        this.timeouts.splice(this.timeouts.indexOf(timeout), 1);
    }
    interrupt() {
        this.interruptResolve();
        this.interruptPromise = new Promise(resolve => (this.interruptResolve = resolve));
    }
}
exports.InterruptableSleep = InterruptableSleep;
async function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvc2xlZXAvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBYSxrQkFBa0I7SUFBL0I7UUFDVSxxQkFBZ0IsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDNUIscUJBQWdCLEdBQUcsSUFBSSxPQUFPLENBQU8sT0FBTyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO1FBQ25GLGFBQVEsR0FBcUIsRUFBRSxDQUFDO0lBZTFDLENBQUM7SUFiUSxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQVU7UUFDM0IsSUFBSSxPQUF3QixDQUFDO1FBQzdCLE1BQU0sT0FBTyxHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDNUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDNUIsTUFBTSxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7UUFDckQsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDO0lBQzFELENBQUM7SUFFTSxTQUFTO1FBQ2QsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLElBQUksT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQztJQUNwRixDQUFDO0NBQ0Y7QUFsQkQsZ0RBa0JDO0FBRU0sS0FBSyxVQUFVLEtBQUssQ0FBQyxFQUFVO0lBQ3BDLE9BQU8sSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFDekQsQ0FBQztBQUZELHNCQUVDIn0=