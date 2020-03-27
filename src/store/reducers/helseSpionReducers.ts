import { SporenstreksActionTypes, HelseSpionState, SporenstreksTypes } from '../types/sporenstreksTypes';
import { Action } from 'redux';

export const initialHelseSpionState: HelseSpionState = {
  arbeidsgivere: [],
  ytelsesperioder: [],
  refusjonSubmitting: false,
  refusjonErrors: undefined,
  arbeidsgivereLoading: false,
  arbeidsgivereErrorType: undefined,
  arbeidsgivereErrorMessage: undefined,
};

export function helseSpionReducer (
  state = initialHelseSpionState,
  incomingAction: Action
): HelseSpionState {
  const action = incomingAction as SporenstreksActionTypes;
  switch (action.type) {

    case SporenstreksTypes.FETCH_ARBEIDSGIVERE_STARTED:
      return {
        ...state,
        arbeidsgivereLoading: true,
        arbeidsgivereErrorType: undefined,
        arbeidsgivereErrorMessage: undefined,
      };

    case SporenstreksTypes.FETCH_ARBEIDSGIVERE_SUCCESS:
      return {
        ...state,
        arbeidsgivere: action.arbeidsgivere,
        arbeidsgivereLoading: false,
      };

    case SporenstreksTypes.FETCH_ARBEIDSGIVERE_ERROR:
      return {
        ...state,
        arbeidsgivereLoading: false,
        arbeidsgivereErrorType: action.errorType,
        arbeidsgivereErrorMessage: action.errorMessage,
      };

    case SporenstreksTypes.SUBMIT_REFUSJON_STARTED:
      return {
        ...state,
        refusjonSubmitting: true,
        refusjonErrors: undefined,
      };

    case SporenstreksTypes.SUBMIT_REFUSJON_SUCCESS:
      return {
        ...state,
        refusjonSubmitting: false,
      };

    case SporenstreksTypes.SUBMIT_REFUSJON_ERROR:
      return {
        ...state,
        refusjonSubmitting: false,
        refusjonErrors: action.errors,
      };

    default:
      return state
  }
}
