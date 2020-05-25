import env from "../util/environment";
import {tabellFeil} from "./feilvisning/FeilTabell";

export default (formData: FormData): Promise<tabellFeil[]> => {

  return fetch(env.baseUrl + '/api/v1/bulk/upload', {
    method: 'POST',
    body: formData,
  }).then((response) => {
    switch (response.status) {
      case 401: {
        window.location.href = env.loginServiceUrl;
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
            return [{indeks: -1, melding: data.detail}]
          }
        });
      }
      default: {
        return [{melding: "Feil ved innsending av skjema.", indeks: -1}]
      }
    }
  })
};
