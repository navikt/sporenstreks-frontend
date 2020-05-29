import { PeriodeConverter } from './PeriodeConverter';

export const PeriodeFormatter = (fom?: Date, tom?: Date) => {
  if (!fom && !tom) {
    return;
  }
  if (fom && !tom) {
    return PeriodeConverter(fom);
  }
  if (!fom && tom) {
    return PeriodeConverter(tom);
  }
  return PeriodeConverter(fom) + ' til ' + PeriodeConverter(tom);
}

