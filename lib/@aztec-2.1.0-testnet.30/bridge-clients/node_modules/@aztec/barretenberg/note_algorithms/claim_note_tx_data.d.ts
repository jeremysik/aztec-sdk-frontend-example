/// <reference types="node" />
import { BridgeId } from '../bridge_id';
export declare class ClaimNoteTxData {
    value: bigint;
    bridgeId: BridgeId;
    partialStateSecret: Buffer;
    inputNullifier: Buffer;
    static EMPTY: ClaimNoteTxData;
    static SIZE: number;
    constructor(value: bigint, bridgeId: BridgeId, partialStateSecret: Buffer, inputNullifier: Buffer);
    toBuffer(): Buffer;
    equals(note: ClaimNoteTxData): boolean;
    static fromBuffer(buf: Buffer): ClaimNoteTxData;
}
//# sourceMappingURL=claim_note_tx_data.d.ts.map