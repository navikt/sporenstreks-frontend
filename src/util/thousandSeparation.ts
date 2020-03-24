export const thousandSeparation = (number?: number): string =>
	number
		? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
		: '';
