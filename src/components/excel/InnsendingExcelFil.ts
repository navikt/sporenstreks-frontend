import env from '../felles/environment';
import { tabellFeil } from './FeilTabell';

export default (file: File, setTokenExpired: any): Promise<tabellFeil[]> => {
  setTokenExpired(false)
  const formData = (file) => {
    let formData = new FormData();
    if (file) {
      // @ts-ignore
      formData.append(file.name, file)
    }
    return formData
  }

  return fetch(env.baseUrl + '/api/v1/bulk/upload', {
    method: 'POST',
    body: formData(file),
  }).then((response) => {
    switch (response.status) {
      case 401: {
        setTokenExpired(true)
        return [{ melding: 'Du har blitt logget ut. Vennligst prøv på nytt etter innlogging.', indeks: -1 }]
      }
      case 200: {
        return response.blob().then(data => {
            return []
          }
        )
      }
      case 422: {
        return response.json().then(data => {
          let f: tabellFeil[] =
            data.problemDetails.map(violation => ({
              indeks: violation.row,
              kolonne: violation.column,
              melding: violation.message
            }));

          if (f.length > 0) {
            return f
          } else {
            return [{ indeks: -1, melding: data.detail }]
          }
        });
      }
      default: {
        return [{ melding: 'Feil ved innsending av skjema.', indeks: -1 }]
      }
    }
  });
};
