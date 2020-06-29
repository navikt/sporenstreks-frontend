export const identityNumberSeparation = (str: string): string =>
  str.length >= 7 ? str.substring(0, 6) + '-' + str.substring(6) : str;
