export const validatePerioder = (fom?: Date, tom?: Date): string | undefined => {
  if (!fom || !tom) {
    return 'Perioden må ha 2 gyldige datoer'
  }
  return undefined;
};
