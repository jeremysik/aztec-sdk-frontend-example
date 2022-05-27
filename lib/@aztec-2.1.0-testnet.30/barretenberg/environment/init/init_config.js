"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInitData = void 0;
const initConfig = {
    '1': {
        initRoots: {
            initDataRoot: '08b8089346ce9612be7cf12fcacf49f4bfba619958245ad25cad60507505b654',
            initNullRoot: '0e1168117178772a4063fb7b00645b050ac7d06e683a255d7af95894632a1010',
            initRootsRoot: '27eea2d2b8b24fa2e18fb276396ebdbcd2f18e57caf610fe079589c182b53ad2',
        },
        initDataSize: 128078,
        accountsData: './data/mainnet/accounts',
        firstRollup: 0,
        lastRollup: 2735,
    },
    default: {
        initRoots: {
            initDataRoot: '27f02a53c9a91e244f6f2d04d29c30684fb1f4b384ca72182f95325191315f8f',
            initNullRoot: '23f0ce83b1262404c1f7e3e43c221fb1177ce198fe697691036f0fca58d69dba',
            initRootsRoot: '18d5893d8b28a101fea70db8f4ed9027fcb40786c3bc8b4ca5552bf16d13f376',
        },
        initDataSize: 8,
        accountsData: './data/default/accounts',
        initAccounts: {
            mnemonic: 'once cost physical tongue reason coconut trick whip permit novel victory ritual',
            aliases: ['account1', 'account2', 'account3', 'account4'],
        },
    },
};
function getInitData(chainId) {
    var _a;
    return (_a = initConfig[chainId]) !== null && _a !== void 0 ? _a : initConfig['default'];
}
exports.getInitData = getInitData;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdF9jb25maWcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZW52aXJvbm1lbnQvaW5pdC9pbml0X2NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxNQUFNLFVBQVUsR0FBRztJQUNqQixHQUFHLEVBQUU7UUFDSCxTQUFTLEVBQUU7WUFDVCxZQUFZLEVBQUUsa0VBQWtFO1lBQ2hGLFlBQVksRUFBRSxrRUFBa0U7WUFDaEYsYUFBYSxFQUFFLGtFQUFrRTtTQUNsRjtRQUNELFlBQVksRUFBRSxNQUFNO1FBQ3BCLFlBQVksRUFBRSx5QkFBeUI7UUFDdkMsV0FBVyxFQUFFLENBQUM7UUFDZCxVQUFVLEVBQUUsSUFBSTtLQUNqQjtJQUNELE9BQU8sRUFBRTtRQUNQLFNBQVMsRUFBRTtZQUNULFlBQVksRUFBRSxrRUFBa0U7WUFDaEYsWUFBWSxFQUFFLGtFQUFrRTtZQUNoRixhQUFhLEVBQUUsa0VBQWtFO1NBQ2xGO1FBQ0QsWUFBWSxFQUFFLENBQUM7UUFDZixZQUFZLEVBQUUseUJBQXlCO1FBQ3ZDLFlBQVksRUFBRTtZQUNaLFFBQVEsRUFBRSxpRkFBaUY7WUFDM0YsT0FBTyxFQUFFLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDO1NBQzFEO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsU0FBZ0IsV0FBVyxDQUFDLE9BQWU7O0lBQ3pDLE9BQU8sTUFBQSxVQUFVLENBQUMsT0FBTyxDQUFDLG1DQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUN0RCxDQUFDO0FBRkQsa0NBRUMifQ==