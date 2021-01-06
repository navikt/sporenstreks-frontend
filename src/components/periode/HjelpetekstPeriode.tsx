import Hjelpetekst from 'nav-frontend-hjelpetekst';
import React from 'react';
import { PopoverOrientering } from 'nav-frontend-popover';

export const HjelpetekstPeriode = () => {
  return (
    <Hjelpetekst type={PopoverOrientering.Under}>
      <ul>
        <li>
          Fra og med første til og med siste fraværsdag i arbeidsgiverperioden.
        </li>
        <li>
          Du må velge <strong>både</strong> første og siste dag. Ikke
          dobbeltklikk, da blir de to automatisk samme dato.
        </li>
        <li>
          Er fraværet bare på én dag, klikker du rolig på samme dag to ganger.
        </li>
      </ul>
    </Hjelpetekst>
  );
};
