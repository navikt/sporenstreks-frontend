import { ValideringsFeil } from './ValideringsFeil';
import { Ansatt } from './Ansatt';

export const ByggValideringsFeil = (ansatte: Ansatt[]) => {
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
  });
  return feil;
};

export default ByggValideringsFeil;
