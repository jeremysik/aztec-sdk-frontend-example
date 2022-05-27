export declare class Iframe {
    private src;
    private id;
    private origin;
    private frame;
    constructor(src: string, id?: string);
    get window(): Window;
    init(): Promise<void>;
    private awaitFrameReady;
}
export declare function createIframe(src: string): Promise<Iframe>;
//# sourceMappingURL=create_iframe.d.ts.map