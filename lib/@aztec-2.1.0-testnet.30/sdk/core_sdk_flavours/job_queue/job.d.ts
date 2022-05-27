export declare enum JobQueueTarget {
    PEDERSEN = "PEDERSEN",
    PIPPENGER = "PIPPENGER",
    FFT = "FFT"
}
export interface Job {
    id: number;
    target: JobQueueTarget;
    query: string;
    args: any[];
}
//# sourceMappingURL=job.d.ts.map