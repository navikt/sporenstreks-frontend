import { Ansatt } from '../../data/types/sporenstreksTypes';
import validateFnrLengthAndValidity from './validateFnrLengthAndValidity';

export const validateFnr = (ansatte: Ansatt[], ansatt: Ansatt): string | undefined => {
  const validertEnkeltfelt = validateFnrLengthAndValidity(ansatt.fnr)
  if (validertEnkeltfelt)
   {
    return validertEnkeltfelt;
  } else if (ansatte.filter(a => a.fnr === ansatt.fnr).length > 1) {
    return 'Fødselsnummer er allerede brukt'
  }
  return undefined;
};
