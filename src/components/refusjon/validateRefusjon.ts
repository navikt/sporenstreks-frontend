const validateRefusjon = (value?: number): string | undefined => {
  if (value === undefined) {
    return 'Beløp må fylles ut';
  } else if (value > 1000000) {
    return 'Beløpet er for høyt';
  } else if (value < 0) {
    return 'Beløpet er for lavt';
  }
  return undefined;
};

export default validateRefusjon;
