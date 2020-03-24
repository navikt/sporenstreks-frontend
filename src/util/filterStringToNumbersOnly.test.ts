import { filterStringToNumbersOnly } from "./filterStringToNumbersOnly";

describe('filterStringToNumbersOnly', () => {
	it('filters non-numbers', () => {
		const input = filterStringToNumbersOnly('123foo456bar', 11);
		expect(input).toEqual('123456');
	});
	
	it('filters excess characters', () => {
		const input = filterStringToNumbersOnly('12345678901234', 11);
		expect(input).toEqual('12345678901');
	});
	
	it('filters non-numbers and excess characters', () => {
		const input = filterStringToNumbersOnly('123foo4567bar8901234', 11);
		expect(input).toEqual('12345678901');
	});
	
	it('filters white space', () => {
		const input = filterStringToNumbersOnly(' 1 2 3 ', 11);
		expect(input).toEqual('123');
	});
	
	it('filters special characters', () => {
		const input = filterStringToNumbersOnly('!"1#$%&/2()=?`^@3+<>', 11);
		expect(input).toEqual('123');
	});
});
