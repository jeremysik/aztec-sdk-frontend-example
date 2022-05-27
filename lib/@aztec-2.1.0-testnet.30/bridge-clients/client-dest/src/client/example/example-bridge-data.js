"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleBridgeData = void 0;
const bridge_data_1 = require("../bridge-data");
class ExampleBridgeData {
    constructor() {
        this.auxDataConfig = [
            {
                start: 0,
                length: 64,
                solidityType: bridge_data_1.SolidityType.uint64,
                description: 'Not Used',
            },
        ];
    }
    // @dev This function should be implemented for stateful bridges. It should return an array of AssetValue's
    // @dev which define how much a given interaction is worth in terms of Aztec asset ids.
    // @param bigint interactionNonce the interaction nonce to return the value for
    async getInteractionPresentValue(interactionNonce) {
        return [
            {
                assetId: 1n,
                amount: 1000n,
            },
        ];
    }
    async getAuxData(inputAssetA, inputAssetB, outputAssetA, outputAssetB) {
        return [0n];
    }
    async getExpectedOutput(inputAssetA, inputAssetB, outputAssetA, outputAssetB, auxData, precision) {
        return [100n, 0n];
    }
    async getMarketSize(inputAssetA, inputAssetB, outputAssetA, outputAssetB, auxData) {
        return [{ assetId: 0n, amount: 100n }];
    }
}
exports.ExampleBridgeData = ExampleBridgeData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhhbXBsZS1icmlkZ2UtZGF0YS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9jbGllbnQvZXhhbXBsZS9leGFtcGxlLWJyaWRnZS1kYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGdEQUE2RztBQUU3RyxNQUFhLGlCQUFpQjtJQUM1QjtRQXdCTyxrQkFBYSxHQUFvQjtZQUN0QztnQkFDRSxLQUFLLEVBQUUsQ0FBQztnQkFDUixNQUFNLEVBQUUsRUFBRTtnQkFDVixZQUFZLEVBQUUsMEJBQVksQ0FBQyxNQUFNO2dCQUNqQyxXQUFXLEVBQUUsVUFBVTthQUN4QjtTQUNGLENBQUM7SUEvQmEsQ0FBQztJQUVoQiwyR0FBMkc7SUFDM0csdUZBQXVGO0lBQ3ZGLCtFQUErRTtJQUUvRSxLQUFLLENBQUMsMEJBQTBCLENBQUMsZ0JBQXdCO1FBQ3ZELE9BQU87WUFDTDtnQkFDRSxPQUFPLEVBQUUsRUFBRTtnQkFDWCxNQUFNLEVBQUUsS0FBSzthQUNkO1NBQ0YsQ0FBQztJQUNKLENBQUM7SUFFRCxLQUFLLENBQUMsVUFBVSxDQUNkLFdBQXVCLEVBQ3ZCLFdBQXVCLEVBQ3ZCLFlBQXdCLEVBQ3hCLFlBQXdCO1FBRXhCLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNkLENBQUM7SUFXRCxLQUFLLENBQUMsaUJBQWlCLENBQ3JCLFdBQXVCLEVBQ3ZCLFdBQXVCLEVBQ3ZCLFlBQXdCLEVBQ3hCLFlBQXdCLEVBQ3hCLE9BQWUsRUFDZixTQUFpQjtRQUVqQixPQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3BCLENBQUM7SUFFRCxLQUFLLENBQUMsYUFBYSxDQUNqQixXQUF1QixFQUN2QixXQUF1QixFQUN2QixZQUF3QixFQUN4QixZQUF3QixFQUN4QixPQUFlO1FBRWYsT0FBTyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN6QyxDQUFDO0NBQ0Y7QUF0REQsOENBc0RDIn0=