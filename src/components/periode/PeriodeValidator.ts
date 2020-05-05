import dayjs from "dayjs";

export const Minimum = () => {
  return new Date(2020,2,16 );
}

export const Maximum = (now?: Date) => {
  return dayjs(now ? now : new Date()).add(1, 'year').toDate();
}

export const isValidFom = (fom?: Date) => {
  if (!fom) {
    return false;
  }
  return fom.getTime() > Minimum().getTime();
}

export const isValidTom = (tom?: Date) => {
  if (!tom) {
    return false;
  }
  return tom.getTime() < Maximum().getTime();
}

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
}
