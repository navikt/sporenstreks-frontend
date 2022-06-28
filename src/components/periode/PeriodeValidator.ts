import dayjs from 'dayjs';
import minMax from 'dayjs/plugin/minMax';

dayjs.extend(minMax);

export const maxDate = (now?: Date): Date => {
  return dayjs(now ? now : new Date()).toDate();
};

export const minDate = () => new Date(2021, 11, 1);

export const Minimum = (now?: Date): string => {
  return dayjs(now ? now : new Date()).toISOString();
};

export const finalMaxDate = (now?: Date): Date => {
  const overridableDate = now ? dayjs(now) : dayjs();
  const endDate = dayjs.min(overridableDate, dayjs('2022-06-30'));
  return endDate.toDate();
};

// Datoformat: 'YYYY-MM-DD'
// Inkluderer start og sluttdatoen
export const disabledDates = [
  {
    from: '2021-10-01',
    to: '2021-11-20'
  }
];

export const isValidFom = (fom?: Date): boolean => (fom ? true : false);

export const isValidTom = (tom?: Date): boolean => {
  if (!tom) {
    return false;
  }
  return tom.getTime() < maxDate().getTime();
};

export const Feilmelding = (required: boolean, fom?: Date, tom?: Date) => {
  if (required && !fom && !tom) {
    return 'Må fylles ut';
  }
  if (fom && tom) {
    return;
  }
  if (fom && !tom) {
    return 'Velg tom dato';
  }
  if (!fom && tom) {
    return 'Velg fom dato';
  }
  return;
};
