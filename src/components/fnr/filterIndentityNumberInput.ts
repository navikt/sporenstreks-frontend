import { filterStringToNumbersOnly } from '../enkel/filterStringToNumbersOnly';

export const filterIdentityNumberInput = (input: string): string => {
  return filterStringToNumbersOnly(input, 11);
};
