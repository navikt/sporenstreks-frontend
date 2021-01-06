import { SykepengerData } from './SykepengerData';
import env from '../felles/environment';
import filtrerAnsatteForInnsending from './filtrerAnsatteForInnsending';
import mergeAnsattlister from './mergeAnsattlister';
import berikAnsatte from './berikAnsatte';
import { Ansatt } from './Ansatt';

export default (
  arbeidsgiverId: string,
  validerteAnsatte: Ansatt[],
  setLoadingStatus: any,
  setTokenExpired: any
): Promise<any> => {
  const filtrerteAnsatte = validerteAnsatte.filter((element) => {
    return !element.referenceNumber;
  });
  const preparedAnsatte: SykepengerData[] = filtrerAnsatteForInnsending(
    filtrerteAnsatte,
    arbeidsgiverId
  );
  setLoadingStatus(0);
  setTokenExpired(false);
  return fetch(env.baseUrl + '/api/v1/refusjonskrav/list', {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin',
    method: 'POST',
    body: JSON.stringify(preparedAnsatte)
  }).then((response) => {
    setLoadingStatus(response.status);
    if (response.status === 401) {
      setTokenExpired(true);
      return validerteAnsatte;
    } else if (response.status === 200) {
      return response
        .json()
        .then((data) =>
          mergeAnsattlister(
            validerteAnsatte,
            berikAnsatte(filtrerteAnsatte, data)
          )
        );
    } else {
      // todo: error 400
      //methods.setError('backend', 'Feil ved innsending av skjema');
      return validerteAnsatte;
    }
  });
};
