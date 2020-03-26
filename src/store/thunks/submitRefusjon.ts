import { submitRefusjonError, submitRefusjonStarted, submitRefusjonSuccess } from '../actions/helseSpionActions';
import { ErrorType, RefusjonsKrav } from '../types/sporenstreksTypes';
import { Dispatch } from 'redux';

export function submitRefusjon(refusjonsKrav: RefusjonsKrav): (dispatch: Dispatch) => Promise<void> {
  return async dispatch => {
    dispatch(submitRefusjonStarted());
    await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/refusjonskrav', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(refusjonsKrav),
    }).then(response => {
      if (response.status === 401) {
        window.location.href = process.env.REACT_APP_LOGIN_SERVICE_URL ?? '';
      } else if (response.status === 200) {
        return dispatch(submitRefusjonSuccess())
      } else if (response.status === 422) {
        return response.json().then(data =>
          dispatch(submitRefusjonError(data.violations.map(violation => ({
            errorType: violation.validationType,
            errorMessage: violation.message,
          })))));
      } else {
        return dispatch(submitRefusjonError([{errorType: ErrorType.UNKNOWN, errorMessage: ''}]));
      }
    });
  }
}


