import { HelseSpionActionTypes, HelseSpionState, HelseSpionTypes } from "../types/helseSpionTypes";
import { Action } from "redux";

const initialHelseSpionState: HelseSpionState = {
  arbeidsgivere: [],
  ytelsesperioder: [],
  personLoading: false,
  personErrorType: undefined,
  personErrorMessage: undefined,
  arbeidsgivereLoading: false,
  arbeidsgivereErrorType: undefined,
  arbeidsgivereErrorMessage: undefined,
};

export function helseSpionReducer (
  state = initialHelseSpionState,
  incomingAction: Action
): HelseSpionState {
  const action = incomingAction as HelseSpionActionTypes;
  switch (action.type) {

    case HelseSpionTypes.FETCH_ARBEIDSGIVERE_STARTED:
      return {
        ...state,
        arbeidsgivereLoading: true,
        arbeidsgivereErrorType: undefined,
        arbeidsgivereErrorMessage: undefined,
      };
  
    case HelseSpionTypes.FETCH_ARBEIDSGIVERE_SUCCESS:
      return {
        ...state,
        arbeidsgivere: action.arbeidsgivere,
        arbeidsgivereLoading: false,
      };
  
    case HelseSpionTypes.FETCH_ARBEIDSGIVERE_ERROR:
      return {
        ...state,
        arbeidsgivereLoading: false,
        arbeidsgivereErrorType: action.errorType,
        arbeidsgivereErrorMessage: action.errorMessage,
      };
  
    case HelseSpionTypes.FETCH_PERSON_STARTED:
      return {
        ...state,
        personLoading: true,
        personErrorType: undefined,
        personErrorMessage: undefined,
      };
  
    case HelseSpionTypes.FETCH_PERSON_SUCCESS:
      return {
        ...state,
        ytelsesperioder: action.ytelsesperioder,
        personLoading: false,
      };
  
    case HelseSpionTypes.FETCH_PERSON_ERROR:
      return {
        ...state,
        personLoading: false,
        personErrorType: action.errorType,
        personErrorMessage: action.errorMessage,
      };
      
    default:
      return state
  }
}
