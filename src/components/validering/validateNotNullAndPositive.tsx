export const validateNotNullAndPositive = (value?: number): string | undefined => {
  if (value === undefined) {
    return 'Feltet må fylles ut';
  } else if (value <= 0) {
    return 'Antall må være positivt';
  }
  return undefined;
};
