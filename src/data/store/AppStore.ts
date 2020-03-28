import constate from 'constate';
import { useState } from 'react';
import { UnleashToggles } from '../types/sporenstreksTypes';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/Organisasjon';
import { FeltFeil } from '../../components/Sykepenger';

export const [ AppStoreProvider, useAppStore ] = constate(() => {
  const [ unleash, setUnleash ] = useState<UnleashToggles>();
  const [ arbeidsgivere, setArbeidsgivere ] = useState<Organisasjon[]>([]);
  const [ lokaleFeil, setLokaleFeil ] = useState<FeltFeil[]>([]);

  return {
    unleash, setUnleash,
    arbeidsgivere, setArbeidsgivere,
    lokaleFeil, setLokaleFeil
  };
});
