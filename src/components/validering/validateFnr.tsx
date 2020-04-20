import fnrvalidator from '@navikt/fnrvalidator';

export const validateFnr = (fnr?: string): string | undefined => {
  if (!fnr) {
    return 'Fødselsnummer må fylles ut';
  } else if (fnr.length !== 11) {
    return 'Fødselsnummer må ha 11 siffer';
  } else if (fnrvalidator.fnr(fnr).status === 'invalid') {
    return 'Fødselsnummer er ugyldig'
  }
  return undefined;
};
