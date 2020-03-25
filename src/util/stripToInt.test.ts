import { stripToInt } from './stripToInt';

describe('stripToInt', () => {
	it('strips string to int', () => {
		const input = stripToInt("foo123bar321");
		expect(input).toEqual(123321);
	});

	it('returns undefined if string doesnt contain a number', async () => {
		const input = stripToInt("foo bar");
		expect(input).toEqual(undefined);
	});
});
