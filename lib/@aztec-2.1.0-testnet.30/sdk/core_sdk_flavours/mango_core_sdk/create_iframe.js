"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createIframe = exports.Iframe = void 0;
class Iframe {
    constructor(src, id = 'aztec-sdk-iframe') {
        this.src = src;
        this.id = id;
        this.origin = new URL(src).origin;
    }
    get window() {
        return this.frame.contentWindow;
    }
    async init() {
        var _a;
        (_a = document.getElementById(this.id)) === null || _a === void 0 ? void 0 : _a.remove();
        if (document.getElementById(this.id)) {
            throw new Error(`iframe#${this.id} already exists.`);
        }
        const frame = document.createElement('iframe');
        frame.id = this.id;
        frame.height = '0';
        frame.width = '0';
        frame.style.display = 'none';
        frame.style.border = 'none';
        frame.src = this.src;
        await this.awaitFrameReady(() => document.body.appendChild(frame));
        this.frame = frame;
    }
    async awaitFrameReady(fn) {
        let resolveFrameCreated;
        const frameReadyPromise = new Promise(resolve => {
            resolveFrameCreated = resolve;
        });
        const handleFrameReadyEvent = (e) => {
            if (e.origin !== this.origin) {
                console.error(`Failed to init Iframe as ${e.origin} !== ${this.origin}`);
                return;
            }
            window.removeEventListener('message', handleFrameReadyEvent);
            resolveFrameCreated();
        };
        window.addEventListener('message', handleFrameReadyEvent);
        fn();
        await frameReadyPromise;
    }
}
exports.Iframe = Iframe;
async function createIframe(src) {
    const iframe = new Iframe(src);
    await iframe.init();
    return iframe;
}
exports.createIframe = createIframe;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX2lmcmFtZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlX3Nka19mbGF2b3Vycy9tYW5nb19jb3JlX3Nkay9jcmVhdGVfaWZyYW1lLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLE1BQWEsTUFBTTtJQUlqQixZQUFvQixHQUFXLEVBQVUsS0FBSyxrQkFBa0I7UUFBNUMsUUFBRyxHQUFILEdBQUcsQ0FBUTtRQUFVLE9BQUUsR0FBRixFQUFFLENBQXFCO1FBQzlELElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDO0lBQ3BDLENBQUM7SUFFRCxJQUFJLE1BQU07UUFDUixPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsYUFBYyxDQUFDO0lBQ25DLENBQUM7SUFFTSxLQUFLLENBQUMsSUFBSTs7UUFDZixNQUFBLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQywwQ0FBRSxNQUFNLEVBQUUsQ0FBQztRQUUzQyxJQUFJLFFBQVEsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxFQUFFO1lBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQUMsVUFBVSxJQUFJLENBQUMsRUFBRSxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3REO1FBRUQsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxLQUFLLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDbkIsS0FBSyxDQUFDLE1BQU0sR0FBRyxHQUFHLENBQUM7UUFDbkIsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUM7UUFDbEIsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDO1FBQzdCLEtBQUssQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUM1QixLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7UUFFckIsTUFBTSxJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7UUFFbkUsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVPLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBYztRQUMxQyxJQUFJLG1CQUFtQixDQUFDO1FBQ3hCLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDOUMsbUJBQW1CLEdBQUcsT0FBTyxDQUFDO1FBQ2hDLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxxQkFBcUIsR0FBRyxDQUFDLENBQWUsRUFBRSxFQUFFO1lBQ2hELElBQUksQ0FBQyxDQUFDLE1BQU0sS0FBSyxJQUFJLENBQUMsTUFBTSxFQUFFO2dCQUM1QixPQUFPO2FBQ1I7WUFFRCxNQUFNLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLHFCQUFxQixDQUFDLENBQUM7WUFDN0QsbUJBQW1CLEVBQUUsQ0FBQztRQUN4QixDQUFDLENBQUM7UUFFRixNQUFNLENBQUMsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLHFCQUFxQixDQUFDLENBQUM7UUFFMUQsRUFBRSxFQUFFLENBQUM7UUFFTCxNQUFNLGlCQUFpQixDQUFDO0lBQzFCLENBQUM7Q0FDRjtBQXJERCx3QkFxREM7QUFFTSxLQUFLLFVBQVUsWUFBWSxDQUFDLEdBQVc7SUFDNUMsTUFBTSxNQUFNLEdBQUcsSUFBSSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDL0IsTUFBTSxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDcEIsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQztBQUpELG9DQUlDIn0=