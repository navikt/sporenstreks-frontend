import { Periode } from '../data/types/sporenstreksTypes';
import env from '../util/environment';
import {
  mapBadRequestResponse, mapErrorResponse,
  mapLoginResponse,
  mapRefusjonsKravRequest,
  mapSuccessResponse, mapTimeoutResponse
} from './PostRefusjonskrav';

const FETCH_TIMEOUT = 5000;

// TODO - implement timeout

export const PostRefusjonskrav = (arbeidsgiverId: string, identityNumberInput: string, perioder: Periode[]) => {
  const refusjonsKravJson = JSON.stringify(mapRefusjonsKravRequest(arbeidsgiverId, identityNumberInput, perioder));
  let didTimout = false;
  let status = 0;
  return fetch(env.baseUrl + '/api/v1/refusjonskrav', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    method: 'POST',
    body: refusjonsKravJson,
  }).then((response: Response) => {
    status = response.status;
    return response.json();
  }).then((data) => {
    switch (status) {
      case 401: return mapLoginResponse();
      case 200: return mapSuccessResponse(data);
      case 400: return mapBadRequestResponse(data);
      case 422: return mapBadRequestResponse(data);
      default: return mapErrorResponse();
    }
  }).catch(() => {
    if (didTimout) {
      return mapTimeoutResponse();
    }
    return mapErrorResponse();
  });
}






