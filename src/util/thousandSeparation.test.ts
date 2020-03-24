import { thousandSeparation } from "./thousandSeparation";

describe('thousandSeparation', () => {
	it('doesnt change low numbers', () => {
		const input = thousandSeparation(123);
		expect(input).toEqual('123');
	});
	
	it('splits higher numbers', () => {
		const input = thousandSeparation(12345);
		expect(input).toEqual('12.345');
	});
	
	it('can split very high numbers', () => {
		const input = thousandSeparation(1234567);
		expect(input).toEqual('1.234.567');
	});
});
