"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateBridgeId = void 0;
const validateBridgeId = (bridgeId) => {
    if (bridgeId.inputAssetIdA === bridgeId.inputAssetIdB) {
        throw new Error('Identical input assets.');
    }
    if (!bridgeId.secondOutputVirtual && bridgeId.outputAssetIdA === bridgeId.outputAssetIdB) {
        throw new Error('Identical output assets.');
    }
};
exports.validateBridgeId = validateBridgeId;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGVfYnJpZGdlX2lkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2JyaWRnZV9pZC92YWxpZGF0ZV9icmlkZ2VfaWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRU8sTUFBTSxnQkFBZ0IsR0FBRyxDQUFDLFFBQWtCLEVBQUUsRUFBRTtJQUNyRCxJQUFJLFFBQVEsQ0FBQyxhQUFhLEtBQUssUUFBUSxDQUFDLGFBQWEsRUFBRTtRQUNyRCxNQUFNLElBQUksS0FBSyxDQUFDLHlCQUF5QixDQUFDLENBQUM7S0FDNUM7SUFDRCxJQUFJLENBQUMsUUFBUSxDQUFDLG1CQUFtQixJQUFJLFFBQVEsQ0FBQyxjQUFjLEtBQUssUUFBUSxDQUFDLGNBQWMsRUFBRTtRQUN4RixNQUFNLElBQUksS0FBSyxDQUFDLDBCQUEwQixDQUFDLENBQUM7S0FDN0M7QUFDSCxDQUFDLENBQUM7QUFQVyxRQUFBLGdCQUFnQixvQkFPM0IifQ==