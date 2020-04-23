export const validateMaksBeloep = (value?: number): string | undefined => {
  if (value === undefined) {
    return 'Må fylles ut';
  } else if (value > 1000000) {
    return 'Kan ikke overskride 1 MNOK';
  } else if (value < 0) {
    return 'Må være et positivt tall';
  }
  return undefined;
};
