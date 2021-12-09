import { Feiloppsummering } from 'nav-frontend-skjema';
import React from 'react';
import { useBulk } from '../../context/BulkContext';

export const ValideringOppsummering = () => {
  const { feil } = useBulk();
  if (feil.length === 0) {
    return <></>;
  }
  // eslint-disable-next-line
  console.log(feil);

  return <Feiloppsummering tittel='Det er feil i skjemaet' feil={feil} />;
};
