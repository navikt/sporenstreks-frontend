import dayjs from 'dayjs';

export const validatePerioder = (
  fom: string,
  tom: string
): string | undefined => {
  if (!dayjs(fom).isValid() || !dayjs(tom).isValid()) {
    return 'Perioden må ha 2 gyldige datoer';
  }
  return undefined;
};
