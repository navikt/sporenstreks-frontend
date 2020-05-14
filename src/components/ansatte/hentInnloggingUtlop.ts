import env from "../../util/environment";

export interface HentInnloggingUtlopInterface {
  status: number,
  utcDTstring: string
}

const hentInnloggingUtlop = (): Promise<HentInnloggingUtlopInterface> => {
  return fetch(env.baseUrl + '/api/v1/login-expiry', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'GET',
  }).then(response => {
    if (response.status === 200) {
      return response.json().then(data => {
        return {
          status: response.status,
          utcDTstring: String(data)
        };
      });
    } else {
      return {
        status: response.status,
        utcDTstring: ''
      };
    }
  });
}

export default hentInnloggingUtlop;
