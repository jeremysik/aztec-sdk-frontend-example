import { CoreSdkClientStub } from '../../core_sdk';
import { TransportClient } from '../transport';
import { BananaCoreSdkOptions } from './banana_core_sdk_options';
export declare class SharedWorkerFrontend {
    private transportClient;
    private jobQueue;
    private coreSdk;
    constructor(transportClient: TransportClient);
    initComponents(options: BananaCoreSdkOptions): Promise<{
        coreSdk: CoreSdkClientStub;
    }>;
    jobQueueDispatch: ({ fn, args }: import("../transport").DispatchMsg) => Promise<any>;
    coreSdkDispatch: ({ fn, args }: import("../transport").DispatchMsg) => Promise<any>;
    private getCrsData;
}
//# sourceMappingURL=shared_worker_frontend.d.ts.map