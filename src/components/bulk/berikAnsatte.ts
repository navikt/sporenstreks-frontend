import {
  BackendStatus,
  SkjemaStatus,
  BackendResponseState
} from '../../data/types/sporenstreksTypes';
import { Ansatt } from './Ansatt';

const errConcat = (target: string | undefined, added: string): string => {
  const dottedText = added.endsWith('.') ? added : added + '.';
  return (target || '').concat(' ' + dottedText).trim();
};

function berikAnsatte(Ansatte: Ansatt[], data: BackendStatus[]): Ansatt[] {
  const kopiAnsatte: Ansatt[] = [...Ansatte];

  data.forEach((recievedLine: BackendStatus, idx) => {
    if (recievedLine.status === BackendResponseState.OK) {
      kopiAnsatte[idx].status = SkjemaStatus.GODKJENT;
      kopiAnsatte[idx].referenceNumber = recievedLine.referenceNumber;
    }

    if (recievedLine.status === BackendResponseState.GENERIC_ERROR) {
      kopiAnsatte[idx].status = SkjemaStatus.GENERIC_ERROR_BACKEND;
    }

    if (recievedLine.status === BackendResponseState.VALIDATION_ERRORS) {
      kopiAnsatte[idx].status = SkjemaStatus.VALIDERINGSFEIL;
      recievedLine.validationErrors?.forEach((validationError) => {
        const errorField = validationError.propertyPath;

        switch (errorField) {
          case 'identitetsnummer':
            kopiAnsatte[idx].fnrError = errConcat(
              kopiAnsatte[idx].fnrError,
              validationError.message
            );
            break;
          case 'virksomhetsnummer':
            // ToDo: Hva gjør vi med denne?
            break;

          case 'perioder':
            kopiAnsatte[idx].fomError = errConcat(
              kopiAnsatte[idx].fomError,
              validationError.message
            );
            break;

          case 'perioder[0].tom':
            kopiAnsatte[idx].periodeError = errConcat(
              kopiAnsatte[idx].periodeError,
              validationError.message
            );
            break;

          // default:
          //   break;
        }
      });
    }
  });
  return kopiAnsatte;
}

export default berikAnsatte;
