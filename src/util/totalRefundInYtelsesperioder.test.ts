import { mockYtelsesperiode1, mockYtelsesperiode2, mockYtelsesperiode3, mockYtelsesperioder } from './mockData';
import { totalRefundInYtelsesperioder } from './totalRefundInYtelsesperioder';

describe('totalRefundInYtelsesperioder', () => {
	it('calculates total refund in ytelsesperioder', () => {
		const input = totalRefundInYtelsesperioder(mockYtelsesperioder);
		expect(input).toEqual(
			mockYtelsesperiode1.refusjonsbeløp!
			+ mockYtelsesperiode2.refusjonsbeløp!
			+ mockYtelsesperiode3.refusjonsbeløp!
		);
	});
});
