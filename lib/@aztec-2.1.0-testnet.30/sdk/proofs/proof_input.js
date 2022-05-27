"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.joinSplitProofInputFromJson = exports.joinSplitProofInputToJson = exports.accountProofInputFromJson = exports.accountProofInputToJson = void 0;
const address_1 = require("@aztec/barretenberg/address");
const client_proofs_1 = require("@aztec/barretenberg/client_proofs");
const crypto_1 = require("@aztec/barretenberg/crypto");
const viewing_key_1 = require("@aztec/barretenberg/viewing_key");
const accountProofInputToJson = ({ tx, signingData, signature }) => ({
    tx: new Uint8Array(tx.toBuffer()),
    signingData: new Uint8Array(signingData),
    signature: signature ? signature.toString() : undefined,
});
exports.accountProofInputToJson = accountProofInputToJson;
const accountProofInputFromJson = ({ tx, signingData, signature, }) => ({
    tx: client_proofs_1.AccountTx.fromBuffer(Buffer.from(tx)),
    signingData: Buffer.from(signingData),
    signature: signature ? crypto_1.SchnorrSignature.fromString(signature) : undefined,
});
exports.accountProofInputFromJson = accountProofInputFromJson;
const joinSplitProofInputToJson = ({ tx, viewingKeys, partialStateSecretEphPubKey, signingData, signature, }) => ({
    tx: new Uint8Array(tx.toBuffer()),
    viewingKeys: viewingKeys.map(vk => vk.toString()),
    partialStateSecretEphPubKey: partialStateSecretEphPubKey ? partialStateSecretEphPubKey.toString() : undefined,
    signingData: new Uint8Array(signingData),
    signature: signature ? signature.toString() : undefined,
});
exports.joinSplitProofInputToJson = joinSplitProofInputToJson;
const joinSplitProofInputFromJson = ({ tx, viewingKeys, partialStateSecretEphPubKey, signingData, signature, }) => ({
    tx: client_proofs_1.JoinSplitTx.fromBuffer(Buffer.from(tx)),
    viewingKeys: viewingKeys.map(vk => viewing_key_1.ViewingKey.fromString(vk)),
    partialStateSecretEphPubKey: partialStateSecretEphPubKey
        ? address_1.GrumpkinAddress.fromString(partialStateSecretEphPubKey)
        : undefined,
    signingData: Buffer.from(signingData),
    signature: signature ? crypto_1.SchnorrSignature.fromString(signature) : undefined,
});
exports.joinSplitProofInputFromJson = joinSplitProofInputFromJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvb2ZfaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJvb2ZzL3Byb29mX2lucHV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLHlEQUE4RDtBQUM5RCxxRUFBMkU7QUFDM0UsdURBQThEO0FBQzlELGlFQUE2RDtBQWN0RCxNQUFNLHVCQUF1QixHQUFHLENBQUMsRUFBRSxFQUFFLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBcUIsRUFBeUIsRUFBRSxDQUFDLENBQUM7SUFDcEgsRUFBRSxFQUFFLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQyxXQUFXLEVBQUUsSUFBSSxVQUFVLENBQUMsV0FBVyxDQUFDO0lBQ3hDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUztDQUN4RCxDQUFDLENBQUM7QUFKVSxRQUFBLHVCQUF1QiwyQkFJakM7QUFFSSxNQUFNLHlCQUF5QixHQUFHLENBQUMsRUFDeEMsRUFBRSxFQUNGLFdBQVcsRUFDWCxTQUFTLEdBQ2EsRUFBcUIsRUFBRSxDQUFDLENBQUM7SUFDL0MsRUFBRSxFQUFFLHlCQUFTLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDekMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQ3JDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLHlCQUFnQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztDQUMxRSxDQUFDLENBQUM7QUFSVSxRQUFBLHlCQUF5Qiw2QkFRbkM7QUFrQkksTUFBTSx5QkFBeUIsR0FBRyxDQUFDLEVBQ3hDLEVBQUUsRUFDRixXQUFXLEVBQ1gsMkJBQTJCLEVBQzNCLFdBQVcsRUFDWCxTQUFTLEdBQ1csRUFBMkIsRUFBRSxDQUFDLENBQUM7SUFDbkQsRUFBRSxFQUFFLElBQUksVUFBVSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqQyxXQUFXLEVBQUUsV0FBVyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUNqRCwyQkFBMkIsRUFBRSwyQkFBMkIsQ0FBQyxDQUFDLENBQUMsMkJBQTJCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7SUFDN0csV0FBVyxFQUFFLElBQUksVUFBVSxDQUFDLFdBQVcsQ0FBQztJQUN4QyxTQUFTLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVM7Q0FDeEQsQ0FBQyxDQUFDO0FBWlUsUUFBQSx5QkFBeUIsNkJBWW5DO0FBRUksTUFBTSwyQkFBMkIsR0FBRyxDQUFDLEVBQzFDLEVBQUUsRUFDRixXQUFXLEVBQ1gsMkJBQTJCLEVBQzNCLFdBQVcsRUFDWCxTQUFTLEdBQ2UsRUFBdUIsRUFBRSxDQUFDLENBQUM7SUFDbkQsRUFBRSxFQUFFLDJCQUFXLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDM0MsV0FBVyxFQUFFLFdBQVcsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyx3QkFBVSxDQUFDLFVBQVUsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUM3RCwyQkFBMkIsRUFBRSwyQkFBMkI7UUFDdEQsQ0FBQyxDQUFDLHlCQUFlLENBQUMsVUFBVSxDQUFDLDJCQUEyQixDQUFDO1FBQ3pELENBQUMsQ0FBQyxTQUFTO0lBQ2IsV0FBVyxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQ3JDLFNBQVMsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDLHlCQUFnQixDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUztDQUMxRSxDQUFDLENBQUM7QUFkVSxRQUFBLDJCQUEyQiwrQkFjckMifQ==