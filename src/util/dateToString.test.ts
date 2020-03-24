import { dateToString } from "./dateToString";

describe('dateToString', () => {
	it('converts Date to string', () => {
		const input = dateToString(new Date(2020, 11, 5));
		//expect(input).toEqual('05.12.20');
	});
});
