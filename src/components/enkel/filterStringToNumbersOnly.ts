export const filterStringToNumbersOnly = (
  input: string,
  maxChars: number
): string => input.replace(/\D/g, '').substring(0, maxChars);
