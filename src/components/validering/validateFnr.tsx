import { Ansatt } from "../../data/types/sporenstreksTypes";
import fnrvalidator from '@navikt/fnrvalidator';

export const validateFnr = (fnr?: number): string | undefined => {
  if (!fnr) {
    return 'Fødselsnummer må fylles ut';
  } else if (fnr.toString().length !== 11) {
    return 'Fødselsnummer må ha 11 siffer';
  } else if (fnrvalidator.fnr(fnr.toString()).status === 'invalid') {
    return 'Fødselsnummer er ugyldig'
  }
  return undefined;
};
