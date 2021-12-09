import { Feiloppsummering } from 'nav-frontend-skjema';
import React from 'react';
import { useBulk } from '../../context/BulkContext';
import { ValideringsFeil } from './ValideringsFeil';
import { Ansatt } from './Ansatt';

export const ValideringOppsummering = () => {
  // const { feil, ansatte } = useBulk();
  const { ansatte, setFeil } = useBulk();
  let feil: ValideringsFeil[] = [];
  // eslint-disable-next-line
  console.log('ansatte', ansatte);

  ansatte.forEach((a, index) => {
    if (
      a.fnrError ||
      a.fomError ||
      a.tomError ||
      a.dagerError ||
      a.beloepError
    ) {
      feil.push({
        skjemaelementId: 'fnr_' + a.id,
        feilmelding: 'Det er en feil i rad nr ' + (index + 1)
      });
    }
  });

  // setFeil(feil);

  if (feil.length === 0) {
    return <></>;
  }

  return <Feiloppsummering tittel='Det er feil i skjemaet' feil={feil} />;
};
