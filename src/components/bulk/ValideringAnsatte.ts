import { validateAnsatteFnr } from './validateAnsatteFnr';
import { validatePerioder } from './validatePerioder';
import validateDager from '../dager/validateDager';
import validateRefusjon from '../refusjon/validateRefusjon';
import { Ansatt } from './Ansatt';

export const valideringAnsatte = (ansatte: Ansatt[]) => {
  ansatte.forEach(a => {
    a.fnrError = validateAnsatteFnr(ansatte, a);
    a.periodeError = validatePerioder(a.fom, a.tom);
    a.dagerError = validateDager(a.antallDagerMedRefusjon);
    a.beloepError = validateRefusjon(a.beloep, a.antallDagerMedRefusjon);
  });

  return ansatte;
};

export const isAnsatteValid = (ansatte: Ansatt[]) : boolean => {
  let isValid = true;
  ansatte.forEach(a => {
    if (a.fnrError || a.periodeError || a.dagerError || a.beloepError) {
      isValid = false;
    }
  });
  return isValid;
};
