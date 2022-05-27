"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStrawberryCoreSdk = void 0;
const mango_core_sdk_1 = require("../mango_core_sdk");
const transport_1 = require("../transport");
const iframe_frontend_1 = require("./iframe_frontend");
const iframe_transport_connect_1 = require("./iframe_transport_connect");
async function createStrawberryCoreSdk(options) {
    const iframe = await (0, mango_core_sdk_1.createIframe)(options.serverUrl);
    const connector = new iframe_transport_connect_1.IframeTransportConnect(iframe.window, options.serverUrl);
    const transportClient = new transport_1.TransportClient(connector);
    await transportClient.open();
    const iframeFrontend = new iframe_frontend_1.IframeFrontend(transportClient);
    const { coreSdk } = await iframeFrontend.initComponents(options);
    return coreSdk;
}
exports.createStrawberryCoreSdk = createStrawberryCoreSdk;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX3N0cmF3YmVycnlfY29yZV9zZGsuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZV9zZGtfZmxhdm91cnMvc3RyYXdiZXJyeV9jb3JlX3Nkay9jcmVhdGVfc3RyYXdiZXJyeV9jb3JlX3Nkay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxzREFBaUQ7QUFDakQsNENBQStDO0FBQy9DLHVEQUFtRDtBQUNuRCx5RUFBb0U7QUFHN0QsS0FBSyxVQUFVLHVCQUF1QixDQUFDLE9BQWlDO0lBQzdFLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBQSw2QkFBWSxFQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUVyRCxNQUFNLFNBQVMsR0FBRyxJQUFJLGlEQUFzQixDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9FLE1BQU0sZUFBZSxHQUFHLElBQUksMkJBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUN2RCxNQUFNLGVBQWUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUU3QixNQUFNLGNBQWMsR0FBRyxJQUFJLGdDQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7SUFDM0QsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLE1BQU0sY0FBYyxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUVqRSxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDO0FBWEQsMERBV0MifQ==