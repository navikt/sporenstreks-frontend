import fnrvalidator from '@navikt/fnrvalidator';
import { Ansatt } from '../../data/types/sporenstreksTypes';

export const validateFnr = (ansatte: Ansatt[], ansatt: Ansatt): string | undefined => {
  if (!ansatt.fnr) {
    return 'Fødselsnummer må fylles ut';
  } else if (ansatt.fnr.length !== 11) {
    return 'Fødselsnummer må ha 11 siffer';
  } else if (fnrvalidator.fnr(ansatt.fnr).status === 'invalid') {
    return 'Fødselsnummer er ugyldig'
  } else if (ansatte.filter(a => a.fnr == ansatt.fnr).length > 1) {
    return 'Fødselsnummer er brukt'
  }
  return undefined;
};
