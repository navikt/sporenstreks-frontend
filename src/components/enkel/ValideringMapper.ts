import { BackendValidation } from '../../data/types/sporenstreksTypes';
import { ValideringsFeil } from '../ansatte/ValideringsFeil';

export const mapViolation = (violation: BackendValidation) => {
  let v = {} as ValideringsFeil;
  v.feilmelding = violation.message;
  v.skjemaelementId = '';
  return v;
}

export const mapValideringOppsummering = (violations: BackendValidation[]) => {
  return violations.map(v => mapViolation(v))
}
