import dayjs from 'dayjs';

export const Maximum = (now?: Date): Date => {
  return dayjs(now ? now : new Date()).toDate();
};

export const Minimum = (now?: Date): Date => {
  return dayjs(now ? now : new Date()).toDate();
};

// Datoformat: 'd.m.Y'
// Inkluderer start og sluttdatoen
export const disabledDates = [
  {
    from: '01.10.2021',
    to: '20.11.2021'
  }
];

export const isValidFom = (fom?: Date): boolean => (fom ? true : false);

export const isValidTom = (tom?: Date): boolean => {
  if (!tom) {
    return false;
  }
  return tom.getTime() < Maximum().getTime();
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
