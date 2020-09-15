const validateRefusjon = (value?: number, antallDagerMedRefusjon?: number): string | undefined => {
  if (value === undefined) {
    return 'Beløp må fylles ut';
  } else if (value > 1000000) {
    return 'Beløpet er for høyt';
  } else if (value < 0) {
    return 'Beløpet er for lavt';
  } else if (antallDagerMedRefusjon === 0 && value !== 0) {
    return 'Beløpet må være 0 når antall dager med refusjon er 0'
  }
  return undefined;
};

export default validateRefusjon;
