"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPermitDataNonStandard = exports.createPermitData = void 0;
const types = {
    Permit: [
        {
            name: 'owner',
            type: 'address',
        },
        {
            name: 'spender',
            type: 'address',
        },
        {
            name: 'value',
            type: 'uint256',
        },
        {
            name: 'nonce',
            type: 'uint256',
        },
        {
            name: 'deadline',
            type: 'uint256',
        },
    ],
};
const noneStandardTypes = {
    Permit: [
        {
            name: 'holder',
            type: 'address',
        },
        {
            name: 'spender',
            type: 'address',
        },
        {
            name: 'nonce',
            type: 'uint256',
        },
        {
            name: 'expiry',
            type: 'uint256',
        },
        {
            name: 'allowed',
            type: 'bool',
        },
    ],
};
function createPermitData(name, owner, spender, value, nonce, deadline, verifyingContract, chainId, version = '1') {
    const domain = {
        name,
        version,
        chainId,
        verifyingContract: verifyingContract.toString(),
    };
    const message = {
        owner: owner.toString(),
        spender: spender.toString(),
        value,
        nonce,
        deadline,
    };
    return { types, domain, message };
}
exports.createPermitData = createPermitData;
function createPermitDataNonStandard(name, owner, spender, nonce, deadline, verifyingContract, chainId, version = '1') {
    const domain = {
        name,
        version,
        chainId,
        verifyingContract: verifyingContract.toString(),
    };
    const message = {
        holder: owner,
        spender,
        nonce,
        expiry: deadline,
        allowed: true,
    };
    return { types: noneStandardTypes, domain, message };
}
exports.createPermitDataNonStandard = createPermitDataNonStandard;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlX3Blcm1pdF9kYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL2NyZWF0ZV9wZXJtaXRfZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFHQSxNQUFNLEtBQUssR0FBRztJQUNaLE1BQU0sRUFBRTtRQUNOO1lBQ0UsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFVBQVU7WUFDaEIsSUFBSSxFQUFFLFNBQVM7U0FDaEI7S0FDRjtDQUNGLENBQUM7QUFFRixNQUFNLGlCQUFpQixHQUFHO0lBQ3hCLE1BQU0sRUFBRTtRQUNOO1lBQ0UsSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFFBQVE7WUFDZCxJQUFJLEVBQUUsU0FBUztTQUNoQjtRQUNEO1lBQ0UsSUFBSSxFQUFFLFNBQVM7WUFDZixJQUFJLEVBQUUsTUFBTTtTQUNiO0tBQ0Y7Q0FDRixDQUFDO0FBRUYsU0FBZ0IsZ0JBQWdCLENBQzlCLElBQVksRUFDWixLQUFpQixFQUNqQixPQUFtQixFQUNuQixLQUFhLEVBQ2IsS0FBYSxFQUNiLFFBQWdCLEVBQ2hCLGlCQUE2QixFQUM3QixPQUFlLEVBQ2YsT0FBTyxHQUFHLEdBQUc7SUFFYixNQUFNLE1BQU0sR0FBRztRQUNiLElBQUk7UUFDSixPQUFPO1FBQ1AsT0FBTztRQUNQLGlCQUFpQixFQUFFLGlCQUFpQixDQUFDLFFBQVEsRUFBRTtLQUNoRCxDQUFDO0lBQ0YsTUFBTSxPQUFPLEdBQUc7UUFDZCxLQUFLLEVBQUUsS0FBSyxDQUFDLFFBQVEsRUFBRTtRQUN2QixPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVEsRUFBRTtRQUMzQixLQUFLO1FBQ0wsS0FBSztRQUNMLFFBQVE7S0FDVCxDQUFDO0lBQ0YsT0FBTyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLENBQUM7QUFDcEMsQ0FBQztBQXpCRCw0Q0F5QkM7QUFFRCxTQUFnQiwyQkFBMkIsQ0FDekMsSUFBWSxFQUNaLEtBQWlCLEVBQ2pCLE9BQW1CLEVBQ25CLEtBQWEsRUFDYixRQUFnQixFQUNoQixpQkFBNkIsRUFDN0IsT0FBZSxFQUNmLE9BQU8sR0FBRyxHQUFHO0lBRWIsTUFBTSxNQUFNLEdBQUc7UUFDYixJQUFJO1FBQ0osT0FBTztRQUNQLE9BQU87UUFDUCxpQkFBaUIsRUFBRSxpQkFBaUIsQ0FBQyxRQUFRLEVBQUU7S0FDaEQsQ0FBQztJQUNGLE1BQU0sT0FBTyxHQUFHO1FBQ2QsTUFBTSxFQUFFLEtBQUs7UUFDYixPQUFPO1FBQ1AsS0FBSztRQUNMLE1BQU0sRUFBRSxRQUFRO1FBQ2hCLE9BQU8sRUFBRSxJQUFJO0tBQ2QsQ0FBQztJQUNGLE9BQU8sRUFBRSxLQUFLLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxDQUFDO0FBQ3ZELENBQUM7QUF4QkQsa0VBd0JDIn0=