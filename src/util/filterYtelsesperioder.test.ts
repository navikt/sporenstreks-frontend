import { filterYtelsesperioder } from "./filterYtelsesperioder";
import { mockYtelsesperiode1, mockYtelsesperiode2, mockYtelsesperiode3, mockYtelsesperioder } from "./mockData";

describe('filterYtelsesperioder', () => {
	it('returns empty array when given empty array input', () => {
		const input = filterYtelsesperioder([]);
		expect(input).toEqual([]);
	});
	
	it('returns same input when no filter dates are given', () => {
		const input = filterYtelsesperioder(mockYtelsesperioder);
		expect(input).toEqual(mockYtelsesperioder);
	});
	
	it('filters based on from date', () => {
		const input = filterYtelsesperioder(
			mockYtelsesperioder,
			new Date(2011, 1, 1),
		);
		expect(input).toEqual([mockYtelsesperiode2, mockYtelsesperiode3]);
	});
	
	it('filters based on to date', () => {
		const input = filterYtelsesperioder(
			mockYtelsesperioder,
			undefined,
			new Date(2018, 1, 1),
		);
		expect(input).toEqual([mockYtelsesperiode1, mockYtelsesperiode2]);
	});
	
	it('filters based on both dates together', () => {
		const input = filterYtelsesperioder(
			mockYtelsesperioder,
			new Date(2011, 1, 1),
			new Date(2018, 1, 1),
		);
		expect(input).toEqual([mockYtelsesperiode2]);
	});
	
	it('doesnt filter dates based on equal date filters', () => {
		const input = filterYtelsesperioder(
			[mockYtelsesperiode2],
			mockYtelsesperiode2.periode.fom,
			mockYtelsesperiode2.periode.tom,
		);
		expect(input).toEqual([mockYtelsesperiode2]);
	});
});
