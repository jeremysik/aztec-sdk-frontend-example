"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EthersAdapter = void 0;
const ethers_1 = require("ethers");
/**
 * Adapts an ethers provider into an EIP1193 compatible provider for injecting into the sdk.
 */
class EthersAdapter {
    constructor(ethersProvider) {
        if (ethersProvider instanceof ethers_1.Signer) {
            this.provider = ethersProvider.provider;
        }
        else {
            this.provider = ethersProvider;
        }
    }
    request(args) {
        return this.provider.send(args.method, args.params);
    }
    on() {
        throw new Error('Events not supported.');
    }
    removeListener() {
        throw new Error('Events not supported.');
    }
}
exports.EthersAdapter = EthersAdapter;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXRoZXJzX2FkYXB0ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvcHJvdmlkZXIvZXRoZXJzX2FkYXB0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsbUNBQWdDO0FBR2hDOztHQUVHO0FBQ0gsTUFBYSxhQUFhO0lBR3hCLFlBQVksY0FBaUM7UUFDM0MsSUFBSSxjQUFjLFlBQVksZUFBTSxFQUFFO1lBQ3BDLElBQUksQ0FBQyxRQUFRLEdBQUcsY0FBYyxDQUFDLFFBQWUsQ0FBQztTQUNoRDthQUFNO1lBQ0wsSUFBSSxDQUFDLFFBQVEsR0FBRyxjQUFxQixDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVNLE9BQU8sQ0FBQyxJQUFzQjtRQUNuQyxPQUFPLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU8sQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxFQUFFO1FBQ0EsTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRCxjQUFjO1FBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDRjtBQXRCRCxzQ0FzQkMifQ==