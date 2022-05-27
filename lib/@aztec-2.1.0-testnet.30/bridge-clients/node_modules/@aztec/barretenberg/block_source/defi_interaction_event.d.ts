/// <reference types="node" />
import { DefiInteractionNote } from '../note_algorithms';
import { BridgeId } from '../bridge_id';
export declare class DefiInteractionEvent {
    readonly bridgeId: BridgeId;
    readonly nonce: number;
    readonly totalInputValue: bigint;
    readonly totalOutputValueA: bigint;
    readonly totalOutputValueB: bigint;
    readonly result: boolean;
    readonly errorReason: Buffer;
    static EMPTY: DefiInteractionEvent;
    constructor(bridgeId: BridgeId, nonce: number, totalInputValue: bigint, totalOutputValueA: bigint, totalOutputValueB: bigint, result: boolean, errorReason?: Buffer);
    static deserialize(buffer: Buffer, offset: number): {
        elem: DefiInteractionEvent;
        adv: number;
    };
    static random(): DefiInteractionEvent;
    static fromBuffer(buf: Buffer): DefiInteractionEvent;
    toBuffer(): Buffer;
    equals(note: DefiInteractionEvent): boolean;
    toDefiInteractionNote(): DefiInteractionNote;
}
//# sourceMappingURL=defi_interaction_event.d.ts.map