import { ValideringsFeil } from './ValideringsFeil';
import { Ansatt } from './Ansatt';
import { SkjemaStatus } from '../../data/types/sporenstreksTypes';

export const ByggValideringsFeil = (ansatte: Ansatt[]): ValideringsFeil[] => {
  const feil: ValideringsFeil[] = [];

  ansatte.forEach((a, index) => {
    if (
      a.fnrError ||
      a.fomError ||
      a.tomError ||
      a.dagerError ||
      a.beloepError ||
      a.periodeError
    ) {
      feil.push({
        skjemaelementId: 'fnr_' + a.id,
        feilmelding: 'Det er en feil i rad nr ' + (index + 1)
      });
    }

    if (a.status === SkjemaStatus.ERRORBACKEND) {
      feil.push({
        skjemaelementId: 'fnr_' + a.id,
        feilmelding: 'Det har oppstått en feil ved innsending av skjema'
      });
    }
  });

  return feil;
};

export default ByggValideringsFeil;
