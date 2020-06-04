import env from '../util/environment';
import dayjs from 'dayjs';

export interface LoginExpiryResponse {
  status: number,
  tidspunkt?: Date
}

export const ParseExpiryDate = (value) => dayjs(value, 'YYYY-MM-DDTHH:mm:ssZ[Z]', 'no').toDate()

const LoginExpiryAPI = (): Promise<LoginExpiryResponse> => {
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
          tidspunkt: ParseExpiryDate(data)
        };
      });
    }
    return {
      status: response.status
    };
  });
}

export default LoginExpiryAPI;
