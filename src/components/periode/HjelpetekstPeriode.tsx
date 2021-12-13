import Hjelpetekst from 'nav-frontend-hjelpetekst';
import React from 'react';
import { PopoverOrientering } from 'nav-frontend-popover';

export const HjelpetekstPeriode = () => {
  return (
    <Hjelpetekst type={PopoverOrientering.Under}>
      Fra og med første til og med siste fraværsdag i arbeidsgiverperioden.
    </Hjelpetekst>
  );
};
