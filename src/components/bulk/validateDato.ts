import dayjs from 'dayjs';

export const validateDato = (dateToValidate: Date): string | undefined => {
  if (!dateToValidate || !dayjs(dateToValidate).isValid()) {
    return 'Det må være en gyldig dato';
  }
  return undefined;
};

export default validateDato;
