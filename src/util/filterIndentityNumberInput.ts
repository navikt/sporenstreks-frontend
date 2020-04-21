import { filterStringToNumbersOnly } from './filterStringToNumbersOnly';

export const filterIdentityNumberInput = (input: string): string => {
	return filterStringToNumbersOnly(input, 11);
};
