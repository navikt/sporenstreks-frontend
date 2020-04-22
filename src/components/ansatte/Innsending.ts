import { Ansatt } from "../../data/types/sporenstreksTypes";
import { SykepengerData } from "./SykepengerData";
import env from "../../util/environment";
import filtrerAnsatteForInnsending from './filtrerAnsatteForInnsending';
import mergeAnsattlister from './mergeAnsattlister'
import berikAnsatte from "./berikAnsatte";

export default (arbeidsgiverId: string, validerteAnsatte: Ansatt[], setLoadingStatus: any): Promise<any> => {
  const filtrerteAnsatte = validerteAnsatte.filter((element) => {
    return !element.referenceNumber;
  });
  const preparedAnsatte: SykepengerData[] = filtrerAnsatteForInnsending(filtrerteAnsatte, arbeidsgiverId)
  setLoadingStatus(0)
  return fetch(env.baseUrl + '/api/v1/refusjonskrav/list', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(preparedAnsatte),
  }).then(response => {
    setLoadingStatus(response.status)
    if (response.status === 401) {
      window.location.href = env.loginServiceUrl;
    } else if (response.status === 200) {
      return response.json().then(data =>
        mergeAnsattlister(validerteAnsatte, berikAnsatte(filtrerteAnsatte, data))
      )
    } else if (response.status === 422) {
      // response.json().then(data => {
      //     data.violations.map(violation => {
      //         methods.setError('backend', violation.message);
      //         return methods;
      //     });
      //     data.violations.map(violation => ({
      //         errorType: violation.validationType,
      //         errorMessage: violation.message,
      //     }));
      // });
    } else { // todo: error 400
      //methods.setError('backend', 'Feil ved innsending av skjema');
    }
  });
}
