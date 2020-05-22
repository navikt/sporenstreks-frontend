import constate from 'constate';
import { useState } from 'react';
import { Ansatt, byggAnsatt, Periode, tomPeriode, UnleashToggles } from '../types/sporenstreksTypes';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { ValideringsFeil } from '../../components/ansatte/ValideringsFeil';

export const [ AppStoreProvider, useAppStore ] = constate(() => {
  const [ unleash, setUnleash ] = useState<UnleashToggles>();
  const [ firma, setFirma ] = useState<string>('');
  const [ arbeidsgivere, setArbeidsgivere ] = useState<Organisasjon[]>([]);
  const [ perioder, setPerioder ] = useState<Periode[]>([tomPeriode]);
  const [ ansatte, setAnsatte ] = useState<Ansatt[]>([
      byggAnsatt()
  ]);
  const [ referanseNummer, setReferanseNummer ] = useState<string>('');
  const [ identityNumberInput, setIdentityNumberInput ] = useState<string>('');
  const [ feil, setFeil ] = useState<ValideringsFeil[]>([]);
  const [ arbeidsgiverId, setArbeidsgiverId ] = useState<string>('');
  const [ loadingStatus, setLoadingStatus ] = useState<number>(-1);

  const [ tokenExpired, setTokenExpired ] = useState<boolean>(false);

  const [ timeoutAdvarselHarBlittVist, setTimeoutAdvarselHarBlittVist ] = useState<boolean>(false);

  return {
    unleash, setUnleash,
    firma, setFirma,
    arbeidsgivere, setArbeidsgivere,
    perioder, setPerioder,
    ansatte, setAnsatte,
    referanseNummer, setReferanseNummer,
    identityNumberInput, setIdentityNumberInput,
    feil, setFeil,
    arbeidsgiverId, setArbeidsgiverId,
    loadingStatus, setLoadingStatus,
    tokenExpired, setTokenExpired,
    timeoutAdvarselHarBlittVist, setTimeoutAdvarselHarBlittVist
  };
});
