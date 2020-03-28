import { RefusjonsKrav } from './types/sporenstreksTypes';

export function submitRefusjon(refusjonsKrav: RefusjonsKrav): (any) {
  fetch(process.env.REACT_APP_BASE_URL + '/api/v1/refusjonskrav', {
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
      return 200
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
}