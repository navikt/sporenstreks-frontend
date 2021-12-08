import dayjs from 'dayjs';

export const validateDato = (fom: Date): string | undefined => {
  if (!dayjs(fom).isValid()) {
    return 'Det må være en gyldig dato';
  }
  return undefined;
};
