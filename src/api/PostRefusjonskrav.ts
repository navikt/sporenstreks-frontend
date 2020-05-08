import { BackendValidation, Periode, RefusjonsKrav } from '../data/types/sporenstreksTypes';

export interface RefusjonskravResponse {
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

export const mapBadRequestResponse = (json) => {
  return buildRefusjonsKravResponse(false, false, false, true, json.violations, '')
}

export const mapErrorResponse = () => buildRefusjonsKravResponse(true, false, false, false, [], '')
export const mapTimeoutResponse = () => buildRefusjonsKravResponse(false, true, false, false, [], '')
export const mapLoginResponse = () => buildRefusjonsKravResponse(false, false, true, false, [], '')
export const mapSuccessResponse = (json) => buildRefusjonsKravResponse(false, false, true, false, [], json.referansenummer)

export const mapRefusjonsKravRequest = (arbeidsgiverId: string, identityNumberInput: string, perioder: Periode[]) => {
  let p = {} as RefusjonsKrav;
  p.virksomhetsnummer = arbeidsgiverId;
  p.identitetsnummer = identityNumberInput;
  p.perioder = perioder;
  return p;
}

