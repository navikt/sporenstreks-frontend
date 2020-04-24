import { BackendStatus, Ansatt, SkjemaStatus } from "../../data/types/sporenstreksTypes";

const errConcat = (target: string | undefined, added: string): string => {
  const dottedText = added.endsWith('.') ? added : added + '.';
  return ((target || "").concat(" " + dottedText)).trim();
}

function berikAnsatte(Ansatte: Ansatt[], data: BackendStatus[]): Ansatt[] {
  const kopiAnsatte: Ansatt[] = [...Ansatte];

  data.forEach((recievedLine: BackendStatus, idx) => {
    if (recievedLine.status === "OK") {
      kopiAnsatte[idx].status = SkjemaStatus.GODKJENT;
      kopiAnsatte[idx].referenceNumber = recievedLine.referenceNumber;
    }

    if (recievedLine.status === "GENERIC_ERROR") {
      kopiAnsatte[idx].status = SkjemaStatus.ERRORBACKEND
    }

    if (recievedLine.status === "VALIDATION_ERRORS") {
      kopiAnsatte[idx].status = SkjemaStatus.VALIDERINGSFEIL
      recievedLine.validationErrors?.forEach((validationError) => {
        const errorField = validationError.propertyPath;
        const errorMessage = validationError.message.endsWith('.') ? validationError.message : validationError.message + '.';
        switch (errorField) {
          case 'identitetsnummer':
            kopiAnsatte[idx].fnrError = errConcat(kopiAnsatte[idx].fnrError, validationError.message);
            break;
          case 'virksomhetsnummer':
            // ToDo: Hva gjør vi med denne?
            break;

          case 'perioder':
            kopiAnsatte[idx].periodeError = errConcat(kopiAnsatte[idx].periodeError , validationError.message);
            break;

          case 'perioder[0].tom':
            kopiAnsatte[idx].periodeError = errConcat(kopiAnsatte[idx].periodeError , validationError.message);
            break;

          // default:
          //   break;
        }
      })
    }
  });
  return kopiAnsatte;
}

export default berikAnsatte;
