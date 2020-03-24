import { stringToDate } from "./stringToDate";

describe('stringToDate', () => {
	it('converts string to Date', () => {
		const input = stringToDate('2020-10-05');
		expect(input).toEqual(new Date(2020, 9, 5));
	});
});
