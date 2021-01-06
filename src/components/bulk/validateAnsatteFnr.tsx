import validateFnrLengthAndValidity from '../fnr/validateFnrLengthAndValidity';
import { Ansatt } from './Ansatt';

export const validateAnsatteFnr = (
  ansatte: Ansatt[],
  ansatt: Ansatt
): string | undefined => {
  const validertEnkeltfelt = validateFnrLengthAndValidity(ansatt.fnr);
  if (validertEnkeltfelt) {
    return validertEnkeltfelt;
  } else if (ansatte.filter((a) => a.fnr === ansatt.fnr).length > 1) {
    return 'Fødselsnummer er allerede brukt';
  }
  return undefined;
};
