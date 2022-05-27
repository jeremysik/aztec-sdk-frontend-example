"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBananaCoreSdk = void 0;
const chocolate_core_sdk_1 = require("../chocolate_core_sdk");
const transport_1 = require("../transport");
const shared_worker_frontend_1 = require("./shared_worker_frontend");
const shared_worker_transport_connect_1 = require("./shared_worker_transport_connect");
async function createBananaCoreSdk(options) {
    console.log(`createBananaCoreSdk() called`);
    console.log(`Creating shared workers`);
    const worker = await (0, chocolate_core_sdk_1.createSharedWorker)();
    const connector = new shared_worker_transport_connect_1.SharedWorkerTransportConnect(worker);
    const transportClient = new transport_1.TransportClient(connector);
    await transportClient.open();
    const sharedWorkerFrontend = new shared_worker_frontend_1.SharedWorkerFrontend(transportClient);
    const { coreSdk } = await sharedWorkerFrontend.initComponents(options);
    return coreSdk;
}
exports.createBananaCoreSdk = createBananaCoreSdk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX2JhbmFuYV9jb3JlX3Nkay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlX3Nka19mbGF2b3Vycy9iYW5hbmFfY29yZV9zZGsvY3JlYXRlX2JhbmFuYV9jb3JlX3Nkay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSw4REFBMkQ7QUFDM0QsNENBQStDO0FBRS9DLHFFQUFnRTtBQUNoRSx1RkFBaUY7QUFFMUUsS0FBSyxVQUFVLG1CQUFtQixDQUFDLE9BQTZCO0lBQ3JFLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSx1Q0FBa0IsR0FBRSxDQUFDO0lBQzFDLE1BQU0sU0FBUyxHQUFHLElBQUksOERBQTRCLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDM0QsTUFBTSxlQUFlLEdBQUcsSUFBSSwyQkFBZSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3ZELE1BQU0sZUFBZSxDQUFDLElBQUksRUFBRSxDQUFDO0lBRTdCLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSw2Q0FBb0IsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUN2RSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsTUFBTSxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDdkUsT0FBTyxPQUFPLENBQUM7QUFDakIsQ0FBQztBQVRELGtEQVNDIn0=