import fnrvalidator from '@navikt/fnrvalidator';
import { Ansatt } from '../../data/types/sporenstreksTypes';
import validateFnrSingle from './validateFnrSingle';

export const validateFnr = (ansatte: Ansatt[], ansatt: Ansatt): string | undefined => {
  const validertEnkeltfelt = validateFnrSingle(ansatt.fnr)
  if (validertEnkeltfelt)
   {
    return validertEnkeltfelt;
  } else if (ansatte.filter(a => a.fnr == ansatt.fnr).length > 1) {
    return 'Fødselsnummer er allerede brukt'
  }
  return undefined;
};
