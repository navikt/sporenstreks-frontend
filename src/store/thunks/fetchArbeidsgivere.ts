import {
  fetchArbeidsgivereError,
  fetchArbeidsgivereStarted,
  fetchArbeidsgivereSuccess
} from "../actions/helseSpionActions";
import { Dispatch } from "redux";
import { Organisasjon } from "@navikt/bedriftsmeny/lib/Organisasjon";
import { ErrorType } from "../types/helseSpionTypes";

export function fetchArbeidsgivere(): (dispatch: Dispatch) => Promise<void> {
  return async dispatch => {
    dispatch(fetchArbeidsgivereStarted());
    await fetch(process.env.REACT_APP_BASE_URL + '/api/v1/arbeidsgivere')
      .then(response => {
        if (response.status === 401) {
          window.location.href = process.env.REACT_APP_LOGIN_SERVICE_URL ?? '';
        } else if (response.status === 200) {
          response.json().then(data =>
            dispatch(fetchArbeidsgivereSuccess(convertResponseDataToOrganisasjon(data)))
          );
        } else if (response.status === 400) {
          return response.json().then(data => dispatch(fetchArbeidsgivereError(
            data.violations[0].validationType.toUpperCase(),
            data.violations[0].message
          )));
        } else {
          return dispatch(fetchArbeidsgivereError(ErrorType.UNKNOWN));
        }
      })
  };
}

// todo: type safety
const convertResponseDataToOrganisasjon = (data): Organisasjon[] => data.map(organisasjon => ({
  Name: organisasjon.name,
  Type: organisasjon.type,
  OrganizationNumber: organisasjon.organizationNumber,
  OrganizationForm: organisasjon.organizationForm,
  Status: organisasjon.status,
  ParentOrganizationNumber: organisasjon.parentOrganizationNumber,
}));
