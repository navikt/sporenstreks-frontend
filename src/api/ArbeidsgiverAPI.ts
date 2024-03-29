import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import env from '../components/felles/environment';
import mapArbeidsgiver from './mapArbeidsgiver';

export interface ArbeidsgivereInterface {
  status: number;
  organisasjoner: Organisasjon[];
}

export enum Status {
  NotStarted = 0,
  Started = 1,
  Successfully = 200,
  Unknown = -2,
  Timeout = -1,
  Error = 500,
  Unauthorized = 401
}

const GetArbeidsgivere = (): Promise<ArbeidsgivereInterface> => {
  return Promise.race([
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 10000)
    )
      .then(() => {
        return {
          status: Status.Timeout,
          organisasjoner: []
        };
      })
      .catch(() => {
        return {
          status: Status.Timeout,
          organisasjoner: []
        };
      }),
    fetch(env.baseUrl + '/api/v1/arbeidsgivere', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      method: 'GET'
    })
      .then((response) => {
        if (response.status === Status.Successfully) {
          return response.json().then((data) => {
            return {
              status: Status.Successfully,
              organisasjoner: mapArbeidsgiver(data)
            };
          });
        }
        return {
          status: response.status,
          organisasjoner: []
        };
      })
      .catch(() => {
        return {
          status: Status.Error,
          organisasjoner: []
        };
      })
  ]);
};

export default { GetArbeidsgivere: GetArbeidsgivere };
