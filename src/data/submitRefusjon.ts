import { RefusjonsKrav } from './types/sporenstreksTypes';
import env from '../components/felles/environment';

export const submitRefusjon = async(refusjonsKrav: RefusjonsKrav) => {
  await fetch(env.baseUrl + '/api/v1/refusjonskrav', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(refusjonsKrav),
  }).then(response => {
    console.log('response', response); // eslint-disable-line
    if (response.status === 401) {
      window.location.href = env.loginServiceUrl;
    } else if (response.status === 200) {
      return response.json();
    } else if (response.status === 422) {
      return response.json().then(data =>
        data.violations.map(violation => ({
          errorType: violation.validationType,
          errorMessage: violation.message,
        })));
    } else {
      return '?';
    }
  });
};
