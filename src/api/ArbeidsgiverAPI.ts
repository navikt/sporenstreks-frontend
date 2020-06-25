import env from '../components/felles/environment';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';

export const mapArbeidsgiver = (data): Organisasjon[] => data.map(organisasjon => ({
  Name: organisasjon.name,
  Type: organisasjon.type,
  OrganizationNumber: organisasjon.organizationNumber,
  OrganizationForm: organisasjon.organizationForm,
  Status: organisasjon.status,
  ParentOrganizationNumber: organisasjon.parentOrganizationNumber
}));

export interface ArbeidsgivereInterface {
  status: number,
  organisasjoner: Organisasjon[]
}

const GetArbeidsgivere = (): Promise<ArbeidsgivereInterface> => {
  return Promise.race([

    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('Timeout')), 5000)
    ).then(response => {
      return {
        status: 0,
        organisasjoner: []
      };
    }).catch(() => {
      return {
        status: 0,
        organisasjoner: []
      };
    })
    ,
    fetch(env.baseUrl + '/api/v1/arbeidsgivere', {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'GET',
    }
    ).then(response => {
      if (response.status === 200) {
        return response.json().then(data => {
          return {
            status: response.status,
            organisasjoner: mapArbeidsgiver(data)
          };
        });
      }
      return {
        status: response.status,
        organisasjoner: []
      };
    }).catch(() => {
      return {
        status: 500,
        organisasjoner: []
      };
    }),

  ]);
}

export default { GetArbeidsgivere: GetArbeidsgivere }
