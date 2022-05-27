"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Serializer = void 0;
const _1 = require(".");
const free_funcs_1 = require("./free_funcs");
// export type DeserializeFn<T> = (buf: Buffer, offset: number) => { elem: T; adv: number };
class Serializer {
    constructor() {
        this.buf = [];
    }
    bool(bool) {
        this.buf.push((0, free_funcs_1.boolToByte)(bool));
    }
    uInt32(num) {
        this.buf.push((0, free_funcs_1.numToUInt32BE)(num));
    }
    int32(num) {
        this.buf.push((0, free_funcs_1.numToInt32BE)(num));
    }
    bigInt(num) {
        this.buf.push((0, free_funcs_1.serializeBigInt)(num));
    }
    /**
     * The given buffer is of variable length. Prefixes the buffer with its length.
     */
    vector(buf) {
        this.buf.push((0, free_funcs_1.serializeBufferToVector)(buf));
    }
    /**
     * Directly serializes a buffer that maybe of fixed, or variable length.
     * It is assumed the corresponding deserialize function will handle variable length data, thus the length
     * does not need to be prefixed here.
     * If serializing a raw, variable length buffer, use vector().
     */
    buffer(buf) {
        this.buf.push(buf);
    }
    string(str) {
        this.vector(Buffer.from(str));
    }
    date(date) {
        this.buf.push((0, free_funcs_1.serializeDate)(date));
    }
    getBuffer() {
        return Buffer.concat(this.buf);
    }
    serializeArray(arr) {
        this.buf.push((0, _1.serializeBufferArrayToVector)(arr.map((e) => e.toBuffer())));
    }
}
exports.Serializer = Serializer;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9zZXJpYWxpemUvc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSx3QkFBaUQ7QUFDakQsNkNBT3NCO0FBRXRCLDRGQUE0RjtBQUU1RixNQUFhLFVBQVU7SUFHckI7UUFGUSxRQUFHLEdBQWEsRUFBRSxDQUFDO0lBRVosQ0FBQztJQUVULElBQUksQ0FBQyxJQUFhO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUEsdUJBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ2xDLENBQUM7SUFFTSxNQUFNLENBQUMsR0FBVztRQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFBLDBCQUFhLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRU0sS0FBSyxDQUFDLEdBQVc7UUFDdEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBQSx5QkFBWSxFQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVNLE1BQU0sQ0FBQyxHQUFXO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUEsNEJBQWUsRUFBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNJLE1BQU0sQ0FBQyxHQUFXO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUEsb0NBQXVCLEVBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSSxNQUFNLENBQUMsR0FBVztRQUN2QixJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBRU0sTUFBTSxDQUFDLEdBQVc7UUFDdkIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDaEMsQ0FBQztJQUVNLElBQUksQ0FBQyxJQUFVO1FBQ3BCLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUEsMEJBQWEsRUFBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JDLENBQUM7SUFFTSxTQUFTO1FBQ2QsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNqQyxDQUFDO0lBRU0sY0FBYyxDQUFJLEdBQVE7UUFDL0IsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBQSwrQkFBNEIsRUFBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakYsQ0FBQztDQUNGO0FBckRELGdDQXFEQyJ9