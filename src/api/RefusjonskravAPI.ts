import { BackendValidation, Periode, RefusjonsKrav } from '../data/types/sporenstreksTypes';
import env from '../util/environment';
import { ValideringsFeil } from '../components/ansatte/ValideringsFeil';

const FETCH_TIMEOUT = 5000;

export const PostRefusjonskrav = (arbeidsgiverId: string, identityNumberInput: string, perioder: Periode[]) => {
  const refusjonsKravJson = JSON.stringify(mapRefusjonsKravRequest(arbeidsgiverId, identityNumberInput, perioder));
  let didTimout = false;
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(function() {
      didTimout = true;
      reject(new Error('Request timed out'));
    }, FETCH_TIMEOUT);
    fetch(env.baseUrl + '/api/v1/refusjonskrav', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      method: 'POST',
      body: refusjonsKravJson,
    }).then((response: Response) => {
      clearTimeout(timeout);
      response.json().then(data => {
        //if (!timeout) {
        switch (response.status) {
          case 401: return mapLoginResponse();
          case 200: return mapSuccessResponse(data);
          case 400: return mapBadRequestResponse(data);
          case 422: return mapBadRequestResponse(data);
        }
        //}
      });
      return mapErrorResponse();
    }).catch(err => {
      if (didTimout) {
        return mapTimeoutResponse();
      }
      reject(err);
    });
  }).catch(err => {
    return mapErrorResponse();
  });
}



interface RefusjonskravResponse {
  timeout: boolean,
  error: boolean,
  bad: boolean,
  login: boolean,
  referanseNummer?: string,
  violations: BackendValidation[]
}

export const buildRefusjonsKravResponse = (
  error: boolean,
  timeout: boolean,
  login: boolean,
  bad: boolean,
  violations: BackendValidation[] = [],
  referanseNummer?: string
) => {
  let response = {} as RefusjonskravResponse;
  response.error = error;
  response.timeout = timeout;
  response.login = login;
  response.referanseNummer = referanseNummer;
  response.bad = bad;
  response.violations = violations;
  return response;
}

export const mapViolation = (violation: BackendValidation) => {
  let v = {} as ValideringsFeil;
  v.feilmelding = violation.message;
  v.skjemaelementId = '';
  return v;
}

export const mapBadRequestResponse = (response) => {
  let validations = response.violations.forEach( v => mapViolation(v));
  return buildRefusjonsKravResponse(false, false, false, true, validations, '')
}

export const mapErrorResponse = () => buildRefusjonsKravResponse(true, false, false, false, [], '')
export const mapTimeoutResponse = () => buildRefusjonsKravResponse(false, true, false, false, [], '')
export const mapLoginResponse = () => buildRefusjonsKravResponse(false, false, true, false, [], '')
export const mapSuccessResponse = (response) => buildRefusjonsKravResponse(false, false, true, false, [], response.data.referansenummer)

export const mapRefusjonsKravRequest = (arbeidsgiverId: string, identityNumberInput: string, perioder: Periode[]) => {
  let p = {} as RefusjonsKrav;
  p.virksomhetsnummer = arbeidsgiverId;
  p.identitetsnummer = identityNumberInput;
  p.perioder = perioder;
  return p;
}
