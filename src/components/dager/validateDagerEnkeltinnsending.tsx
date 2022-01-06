const validateDager = (value?: number): string | undefined => {
  if (value === undefined) {
    return 'Feltet må fylles ut';
  } else if (value <= 0) {
    return 'Dager må være høyere enn 0';
  } else if (value > 13) {
    return 'Dager må være 13 eller lavere';
  }
  return undefined;
};

export default validateDager;
