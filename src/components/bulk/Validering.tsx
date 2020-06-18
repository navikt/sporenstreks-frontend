import { Ansatt } from '../../data/types/sporenstreksTypes';
import { validateFnr } from '../fnr/validateFnr';
import { validatePerioder } from './validatePerioder';
import { validateNotNullAndPositive } from '../dager/validateNotNullAndPositive';
import { validateMaksBeloep } from '../refusjon/validateMaksBeloep';

export const Validering = (ansatte: Ansatt[]) => {
  ansatte.forEach(a => {
    a.fnrError = validateFnr(ansatte, a);
    a.periodeError = validatePerioder(a.fom, a.tom);
    a.dagerError = validateNotNullAndPositive(a.antallDagerMedRefusjon);
    a.beloepError = validateMaksBeloep(a.beloep);
  });

  return ansatte;
};

export const IsValid = (ansatte: Ansatt[]) => {
  let isValid = true;
  ansatte.forEach(a => {
    if (a.fnrError || a.periodeError || a.dagerError || a.beloepError) {
      isValid = false;
    }
  });
  return isValid;
};
