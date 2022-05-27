"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Deserializer = void 0;
const free_funcs_1 = require("./free_funcs");
class Deserializer {
    constructor(buf, offset = 0) {
        this.buf = buf;
        this.offset = offset;
    }
    bool() {
        return this.exec(free_funcs_1.deserializeBool) ? true : false;
    }
    uInt32() {
        return this.exec(free_funcs_1.deserializeUInt32);
    }
    int32() {
        return this.exec(free_funcs_1.deserializeInt32);
    }
    bigInt(width = 32) {
        return this.exec((buf, offset) => (0, free_funcs_1.deserializeBigInt)(buf, offset, width));
    }
    vector() {
        return this.exec(free_funcs_1.deserializeBufferFromVector);
    }
    buffer(width) {
        const buf = this.buf.slice(this.offset, this.offset + width);
        this.offset += width;
        return buf;
    }
    string() {
        return this.vector().toString();
    }
    date() {
        return new Date(Number(this.bigInt(8)));
    }
    deserializeArray(fn) {
        return this.exec((buf, offset) => (0, free_funcs_1.deserializeArrayFromVector)(fn, buf, offset));
    }
    exec(fn) {
        const { elem, adv } = fn(this.buf, this.offset);
        this.offset += adv;
        return elem;
    }
    getOffset() {
        return this.offset;
    }
}
exports.Deserializer = Deserializer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVzZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3NlcmlhbGl6ZS9kZXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsNkNBT3NCO0FBSXRCLE1BQWEsWUFBWTtJQUN2QixZQUFvQixHQUFXLEVBQVUsU0FBUyxDQUFDO1FBQS9CLFFBQUcsR0FBSCxHQUFHLENBQVE7UUFBVSxXQUFNLEdBQU4sTUFBTSxDQUFJO0lBQUcsQ0FBQztJQUVoRCxJQUFJO1FBQ1QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLDRCQUFlLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUM7SUFDbkQsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsOEJBQWlCLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRU0sS0FBSztRQUNWLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyw2QkFBZ0IsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxNQUFNLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFDdEIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBVyxFQUFFLE1BQWMsRUFBRSxFQUFFLENBQUMsSUFBQSw4QkFBaUIsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsd0NBQTJCLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRU0sTUFBTSxDQUFDLEtBQWE7UUFDekIsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDO1FBQ3JCLE9BQU8sR0FBRyxDQUFDO0lBQ2IsQ0FBQztJQUVNLE1BQU07UUFDWCxPQUFPLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNsQyxDQUFDO0lBRU0sSUFBSTtRQUNULE9BQU8sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFTSxnQkFBZ0IsQ0FBSSxFQUFvQjtRQUM3QyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFXLEVBQUUsTUFBYyxFQUFFLEVBQUUsQ0FBQyxJQUFBLHVDQUEwQixFQUFDLEVBQUUsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQztJQUNqRyxDQUFDO0lBRU0sSUFBSSxDQUFJLEVBQW9CO1FBQ2pDLE1BQU0sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxNQUFNLElBQUksR0FBRyxDQUFDO1FBQ25CLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQztJQUVNLFNBQVM7UUFDZCxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDckIsQ0FBQztDQUNGO0FBbERELG9DQWtEQyJ9