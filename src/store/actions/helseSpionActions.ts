import { ErrorObject, SporenstreksActionTypes, SporenstreksTypes } from '../types/sporenstreksTypes';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';

export const submitRefusjonStarted = (): SporenstreksActionTypes => {
  return {
    type: SporenstreksTypes.SUBMIT_REFUSJON_STARTED,
  }
};

export const submitRefusjonSuccess = (): SporenstreksActionTypes => {
  return {
    type: SporenstreksTypes.SUBMIT_REFUSJON_SUCCESS,
  }
};

export const submitRefusjonError = (errors: ErrorObject[]): SporenstreksActionTypes => {
  return {
    type: SporenstreksTypes.SUBMIT_REFUSJON_ERROR,
    errors: errors,
  }
};

export const fetchArbeidsgivereStarted = (): SporenstreksActionTypes => {
  return {
    type: SporenstreksTypes.FETCH_ARBEIDSGIVERE_STARTED,
  }
};

export const fetchArbeidsgivereSuccess = (arbeidsgivere: Organisasjon[]): SporenstreksActionTypes => {
  return {
    type: SporenstreksTypes.FETCH_ARBEIDSGIVERE_SUCCESS,
    arbeidsgivere: arbeidsgivere,
  }
};

export const fetchArbeidsgivereError = (errorType: string, errorMessage?: string): SporenstreksActionTypes => {
  return {
    type: SporenstreksTypes.FETCH_ARBEIDSGIVERE_ERROR,
    errorType: errorType,
    errorMessage: errorMessage,
  }
};

