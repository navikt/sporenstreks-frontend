import constate from 'constate';
import { useState } from 'react';
import {Ansatt, byggAnsatt, Periode, tomAnsatt, tomPeriode, UnleashToggles} from '../types/sporenstreksTypes';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';

export const [ AppStoreProvider, useAppStore ] = constate(() => {
  const [ unleash, setUnleash ] = useState<UnleashToggles>();
  const [ arbeidsgivere, setArbeidsgivere ] = useState<Organisasjon[]>([]);
  const [ perioder, setPerioder ] = useState<Periode[]>([tomPeriode]);
  const [ ansatte, setAnsatte ] = useState<Ansatt[]>([
      byggAnsatt()
  ]);
  const [ referanseNummer, setReferanseNummer ] = useState<string>('');
  const [ identityNumberInput, setIdentityNumberInput ] = useState<string>('');

  return {
    unleash, setUnleash,
    arbeidsgivere, setArbeidsgivere,
    perioder, setPerioder,
    ansatte, setAnsatte,
    referanseNummer, setReferanseNummer,
    identityNumberInput, setIdentityNumberInput
  };
});
