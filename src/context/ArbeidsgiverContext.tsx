import React, { createContext, useContext, useState } from 'react';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import ArbeidsgiverAPI from '../api/ArbeidsgiverAPI';
import Spinner from 'nav-frontend-spinner';
import IngenData from '../pages/IngenData';
import env from '../util/environment';

export const buildArbeidsgiverContext = (firma: string, arbeidsgiverId: string, arbeidsgivere: Organisasjon[]) => ({
  arbeidsgivere,
  setArbeidsgivere: function(arbeidsgivere: Organisasjon[]){},
  firma,
  setFirma: function(firma: string){},
  arbeidsgiverId,
  setArbeidsgiverId: function(arbeidsgiverId: string){}
})

const ArbeidsgiverContext = createContext(buildArbeidsgiverContext('', '', []));

interface ArbeidsgiverContextProviderProps {
  children: any
}

export const useArbeidsgiver = () => useContext(ArbeidsgiverContext);

export const ArbeidsgiverProvider = (props: ArbeidsgiverContextProviderProps) => {
  const [ status, setStatus ]  = useState<number>(0);
  const [ arbeidsgivere, setArbeidsgivere ] = useState<Organisasjon[]>([]);
  const [ firma, setFirma ] = useState<string>('');
  const [ arbeidsgiverId, setArbeidsgiverId ] = useState<string>('');
  if (status === 0){
    let arr = ArbeidsgiverAPI.GetArbeidsgivere().then(
      res => {
        if (res.status === 401) {
          window.location.href = env.loginServiceUrl;
        }
        setArbeidsgivere(res.organisasjoner)
        setStatus(1);
      }
    )
  }
  if (status === 0) {
    return (<Spinner type={'XXL'} className="sporenstreks-spinner" />);
  }
  if (status === 1 && arbeidsgivere.length === 0) {
    return (<IngenData />);
  }
  return (
    <ArbeidsgiverContext.Provider value={{ arbeidsgivere, setArbeidsgivere, firma, setFirma, arbeidsgiverId, setArbeidsgiverId }}>
      { props.children }
    </ArbeidsgiverContext.Provider>
  )
}
