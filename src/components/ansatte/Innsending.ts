import {Ansatt, BackendStatus, SkjemaStatus} from "../../data/types/sporenstreksTypes";
import {SykepengerData} from "./SykepengerData";
import env from "../../util/environment";
import formaterAnsatteForInnsending from './formaterAnsatteForInnsending';

export default (arbeidsgiverId: string, validerteAnsatte: Ansatt[], setLoadingStatus: any): Promise<any> => {
  const filtrerteAnsatte = validerteAnsatte.filter((element) => {
    return !!element.referenceNumber;
  });
  const preparedAnsatte: SykepengerData[] = formaterAnsatteForInnsending(filtrerteAnsatte, arbeidsgiverId)
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
      return response.json().then(data => {
        data.forEach((recievedLine: BackendStatus, idx) => {
          if (recievedLine.status === "OK") {
            validerteAnsatte[idx].status = SkjemaStatus.GODKJENT;
            validerteAnsatte[idx].referenceNumber = recievedLine.referenceNumber;
          }

          if (recievedLine.status === "GENERIC_ERROR") {
            validerteAnsatte[idx].status = SkjemaStatus.ERRORBACKEND
          }

          if (recievedLine.status === "VALIDATION_ERRORS") {
            validerteAnsatte[idx].status = SkjemaStatus.VALIDERINGSFEIL
            recievedLine.validationErrors?.forEach((validationError) => {
              const errorField = validationError.propertyPath;
              switch (errorField) {
                case 'identitetsnummer':
                  validerteAnsatte[idx].fnrError = validationError.message;
                  break;
                case 'virksomhetsnummer':
                  // ToDo: Hva gjør vi med denne?
                  break;

                case 'perioder':
                  validerteAnsatte[idx].periodeError = validationError.message;
                  break;

                case 'perioder[0].tom':
                  validerteAnsatte[idx].periodeError = validationError.message;
                  break;

                default:
                  break;
              }
            })
          }
        });
        return validerteAnsatte;
      })
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
