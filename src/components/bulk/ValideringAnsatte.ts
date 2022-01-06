import { validateAnsatteFnr } from './validateAnsatteFnr';
import { validatePerioder } from './validatePerioder';
import validateDagerEnkeltinnsending from '../dager/validateDagerEnkeltinnsending';
import validateRefusjon from '../refusjon/validateRefusjon';
import { Ansatt } from './Ansatt';
import { validateDato } from './validateDato';
import dayjs from 'dayjs';

export const valideringAnsatte = (ansatte: Ansatt[]) => {
  ansatte.forEach((a) => {
    a.fnrError = validateAnsatteFnr(ansatte, a);
    a.periodeError = validatePerioder(a.fom, a.tom);
    a.fomError = validateDato(dayjs(a.fom, 'YYYY-MM-DD').toDate());
    a.tomError = validateDato(dayjs(a.tom, 'YYYY-MM-DD').toDate());
    a.dagerError = validateDagerEnkeltinnsending(a.antallDagerMedRefusjon);
    a.beloepError = validateRefusjon(a.beloep, a.antallDagerMedRefusjon);
  });

  return ansatte;
};

export const isAnsatteValid = (ansatte: Ansatt[]): boolean => {
  let isValid = true;
  ansatte.forEach((a) => {
    if (a.fnrError || a.periodeError || a.dagerError || a.beloepError) {
      isValid = false;
    }
  });
  return isValid;
};
