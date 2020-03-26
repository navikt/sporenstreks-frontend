import { HelseSpionActionTypes, HelseSpionTypes, Ytelsesperiode } from '../types/helseSpionTypes';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';

export const fetchPersonStarted = (): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_PERSON_STARTED,
  }
};

export const fetchPersonSuccess = (ytelsesperioder: Ytelsesperiode[]): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_PERSON_SUCCESS,
    ytelsesperioder: ytelsesperioder,
  }
};

export const fetchPersonError = (errorType: string, errorMessage?: string): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_PERSON_ERROR,
    errorType: errorType,
    errorMessage: errorMessage,
  }
};

export const fetchArbeidsgivereStarted = (): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_ARBEIDSGIVERE_STARTED,
  }
};

export const fetchArbeidsgivereSuccess = (arbeidsgivere: Organisasjon[]): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_ARBEIDSGIVERE_SUCCESS,
    arbeidsgivere: arbeidsgivere,
  }
};

export const fetchArbeidsgivereError = (errorType: string, errorMessage?: string): HelseSpionActionTypes => {
  return {
    type: HelseSpionTypes.FETCH_ARBEIDSGIVERE_ERROR,
    errorType: errorType,
    errorMessage: errorMessage,
  }
};

