import { identityNumberSeparation } from './identityNumberSeparation';

describe('identityNumberSeparation', () => {
	it('doesnt change numbers below 6 digits', () => {
		const input = identityNumberSeparation('12345');
		expect(input).toEqual('12345');
	});

	it('doesnt add seperator to numbers of 6 digits', () => {
		const input = identityNumberSeparation( '123456');
		expect(input).toEqual('123456');
	});

	it('adds seperator to numbers of 7 digits and above', () => {
		const input = identityNumberSeparation( '1234567');
		expect(input).toEqual('123456-7');
	});
});
