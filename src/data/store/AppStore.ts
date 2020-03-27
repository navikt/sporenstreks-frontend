import constate from 'constate';
import { useState } from 'react';
import { UnleashToggles } from '../../store/types/sporenstreksTypes';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';

export const [ AppStoreProvider, useAppStore ] = constate(() => {
  const [ unleash, setUnleash ] = useState<UnleashToggles>();
  const [ arbeidsgivere, setArbeidsgivere ] = useState<Organisasjon[]>([]);

  return {
    unleash, setUnleash,
    arbeidsgivere, setArbeidsgivere,
  };
});
