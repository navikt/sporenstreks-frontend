import dayjs from 'dayjs';

export const validateDatoRekkefolge = (
  fom: Date,
  tom: Date
): string | undefined => {
  if (dayjs(tom).isBefore(fom)) {
    return 'Fra dato må være før til dato';
  }
  return undefined;
};

export default validateDatoRekkefolge;
