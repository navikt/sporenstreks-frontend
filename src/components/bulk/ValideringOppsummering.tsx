import { Feiloppsummering } from 'nav-frontend-skjema';
import React from 'react';
import { useBulk } from '../../context/BulkContext';
import { ValideringsFeil } from './ValideringsFeil';

export const ValideringOppsummering = () => {
  const { ansatte } = useBulk();
  const feil: ValideringsFeil[] = [];

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

  if (feil.length === 0) {
    return <></>;
  }

  return <Feiloppsummering tittel='Det er feil i skjemaet' feil={feil} />;
};
