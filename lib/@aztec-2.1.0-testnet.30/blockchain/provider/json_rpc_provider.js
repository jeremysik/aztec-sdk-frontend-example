"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsonRpcProvider = void 0;
const iso_fetch_1 = require("@aztec/barretenberg/iso_fetch");
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('json_rpc_provider');
class JsonRpcProvider {
    constructor(host) {
        this.host = host;
        this.id = 0;
    }
    async request({ method, params }) {
        const body = {
            jsonrpc: '2.0',
            id: this.id++,
            method,
            params,
        };
        log(`->`, body);
        const resp = await (0, iso_fetch_1.fetch)(this.host, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: { 'content-type': 'application/json' },
        });
        const res = JSON.parse(await resp.text());
        log(`<-`, res);
        if (res.error) {
            throw res.error;
        }
        return res.result;
    }
    on() {
        throw new Error('Events not supported.');
    }
    removeListener() {
        throw new Error('Events not supported.');
    }
}
exports.JsonRpcProvider = JsonRpcProvider;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbl9ycGNfcHJvdmlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJvdmlkZXIvanNvbl9ycGNfcHJvdmlkZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQ0EsNkRBQXNEO0FBQ3RELGtEQUEwQjtBQUUxQixNQUFNLEdBQUcsR0FBRyxJQUFBLGVBQUssRUFBQyxtQkFBbUIsQ0FBQyxDQUFDO0FBRXZDLE1BQWEsZUFBZTtJQUcxQixZQUFvQixJQUFZO1FBQVosU0FBSSxHQUFKLElBQUksQ0FBUTtRQUZ4QixPQUFFLEdBQUcsQ0FBQyxDQUFDO0lBRW9CLENBQUM7SUFFN0IsS0FBSyxDQUFDLE9BQU8sQ0FBQyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQW9CO1FBQ3ZELE1BQU0sSUFBSSxHQUFHO1lBQ1gsT0FBTyxFQUFFLEtBQUs7WUFDZCxFQUFFLEVBQUUsSUFBSSxDQUFDLEVBQUUsRUFBRTtZQUNiLE1BQU07WUFDTixNQUFNO1NBQ1AsQ0FBQztRQUNGLEdBQUcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDaEIsTUFBTSxJQUFJLEdBQUcsTUFBTSxJQUFBLGlCQUFLLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBRTtZQUNsQyxNQUFNLEVBQUUsTUFBTTtZQUNkLElBQUksRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQztZQUMxQixPQUFPLEVBQUUsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLEVBQUU7U0FDaEQsQ0FBQyxDQUFDO1FBQ0gsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLEdBQUcsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDZixJQUFJLEdBQUcsQ0FBQyxLQUFLLEVBQUU7WUFDYixNQUFNLEdBQUcsQ0FBQyxLQUFLLENBQUM7U0FDakI7UUFDRCxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUM7SUFDcEIsQ0FBQztJQUVELEVBQUU7UUFDQSxNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVELGNBQWM7UUFDWixNQUFNLElBQUksS0FBSyxDQUFDLHVCQUF1QixDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNGO0FBakNELDBDQWlDQyJ9