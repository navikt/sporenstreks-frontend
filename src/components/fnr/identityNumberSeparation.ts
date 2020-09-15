export const identityNumberSeparation = (fnr: string): string =>
  fnr.length >= 7 ? fnr.substring(0, 6) + '-' + fnr.substring(6) : fnr;
