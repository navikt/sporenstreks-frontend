import { fetchPersonError, fetchPersonStarted, fetchPersonSuccess } from "../actions/helseSpionActions";
import { ErrorType, Ytelsesperiode } from "../types/helseSpionTypes";
import { stringToDate } from "../../util/stringToDate";
import { Dispatch } from "redux";

export function fetchPerson(identityNumber?: string, arbeidsgiverId?: string): (dispatch: Dispatch) => Promise<void> {
  return async dispatch => {
    dispatch(fetchPersonStarted());
    await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/ytelsesperioder/oppslag', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        'identitetsnummer': identityNumber,
        'arbeidsgiverId': arbeidsgiverId,
      }),
    }).then(response => {
      if (response.status === 401) {
        window.location.href = process.env.REACT_APP_LOGIN_SERVICE_URL ?? '';
      } else if (response.status === 200) {
        // todo: type safety on data response
        return response.json().then(data =>
          dispatch(fetchPersonSuccess(convertResponseDataToYtelsesperioder(data)))
        );
      } else if (response.status === 400) {
        return response.json().then(data =>
          dispatch(fetchPersonError(data.violations[0].validationType.toUpperCase(), data.violations[0].message)));
      } else {
        return dispatch(fetchPersonError(ErrorType.UNKNOWN));
      }
    });
  }
}

// todo: type safety
const convertResponseDataToYtelsesperioder = (data): Ytelsesperiode[] => data.map(ytelsesperiode => ({
  ...ytelsesperiode,
  periode: {
    fom: stringToDate(ytelsesperiode.periode.fom),
    tom: stringToDate(ytelsesperiode.periode.tom),
  },
  ferieperioder: ytelsesperiode.ferieperioder.map(ferieperioder => ({
    ...ferieperioder,
    ferieperioder: {
      fom: stringToDate(ferieperioder.fom),
      tom: stringToDate(ferieperioder.tom),
    }
  }))
}));

