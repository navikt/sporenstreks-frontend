import React, { createContext, useContext, useState } from 'react';
import { Ansatt, Periode } from '../data/types/sporenstreksTypes';

export const buildEnkelSkjemaContext = (perioder: Periode[] = [], identityNumberInput: string = '') => ({
  perioder,
  setPerioder: function(perioder: Periode[]){},
  identityNumberInput,
  setIdentityNumberInput: function(identityNumber: string){}
})

const EnkelSkjemaContext = createContext(buildEnkelSkjemaContext());

interface EnkelSkjemaContextProviderProps {
  children: any
}

export const useEnkelSkjema = () => useContext(EnkelSkjemaContext);

export const EnkelSkjemaProvider = (props: EnkelSkjemaContextProviderProps) => {
  const [ perioder, setPerioder ] = useState<Periode[]>([]);
  const [ identityNumberInput, setIdentityNumberInput ] = useState('');
  return (
    <EnkelSkjemaContext.Provider value={{ perioder, setPerioder, identityNumberInput, setIdentityNumberInput }}>
      { props.children }
    </EnkelSkjemaContext.Provider>
  )
}
