import { Feiloppsummering } from 'nav-frontend-skjema';
import React from 'react';
import { useBulk } from '../../context/BulkContext';
import ByggValideringsFeil from './ByggValideringsFeil';
import { ValideringsFeil } from './ValideringsFeil';

export const ValideringOppsummering = () => {
  const { ansatte } = useBulk();
  const feil: ValideringsFeil[] = ByggValideringsFeil(ansatte);

  if (feil.length === 0) {
    return <></>;
  }

  return <Feiloppsummering tittel='Det er feil i skjemaet' feil={feil} />;
};
