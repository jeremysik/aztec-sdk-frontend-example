import { CoreSdkClientStub } from '../../core_sdk';
import { TransportClient } from '../transport';
import { StrawberryCoreSdkOptions } from './strawberry_core_sdk_options';
export declare class IframeFrontend {
    private transportClient;
    private coreSdk;
    constructor(transportClient: TransportClient);
    initComponents(options: StrawberryCoreSdkOptions): Promise<{
        coreSdk: CoreSdkClientStub;
    }>;
    coreSdkDispatch: ({ fn, args }: import("../transport").DispatchMsg) => Promise<any>;
}
//# sourceMappingURL=iframe_frontend.d.ts.map