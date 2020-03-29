import constate from 'constate';
import { useState } from 'react';
import { Periode, UnleashToggles } from '../types/sporenstreksTypes';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';

export const [ AppStoreProvider, useAppStore ] = constate(() => {
  const [ unleash, setUnleash ] = useState<UnleashToggles>();
  const [ arbeidsgivere, setArbeidsgivere ] = useState<Organisasjon[]>([]);
  const [ perioder, setPerioder ] = useState<Periode[]>();

  return {
    unleash, setUnleash,
    arbeidsgivere, setArbeidsgivere,
    perioder, setPerioder,
  };
});
