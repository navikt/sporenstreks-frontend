import React, { createContext, useContext, useState } from 'react';
import { ValideringsFeil } from '../components/ansatte/ValideringsFeil';
import { Ansatt, byggAnsatt, Periode } from '../data/types/sporenstreksTypes';

export const buildBulkSkjemaContext = (ansatte: Ansatt[] = [byggAnsatt()], feil: ValideringsFeil[] = [], loadingStatus: number = -1,
                                       tokenExpired: boolean = false, identityNumberInput: string = '' ) => ({
  ansatte,
  setAnsatte: function(ansatte: Ansatt[]){},
  feil,
  setFeil: function(feil: ValideringsFeil[]){},
  loadingStatus,
  setLoadingStatus: function(status: number){},
  tokenExpired,
  setTokenExpired: function(isExpired: boolean){},
  identityNumberInput,
  setIdentityNumberInput: function(identityNumberInput: string){},
})

const BulkSkjemaContext = createContext(buildBulkSkjemaContext());

interface BulkSkjemaContextProviderProps {
  children: any
}

export const useBulkSkjema = () => useContext(BulkSkjemaContext);

export const EnkelSkjemaProvider = (props: BulkSkjemaContextProviderProps) => {
  const [ ansatte, setAnsatte ] = useState<Ansatt[]>(buildBulkSkjemaContext().ansatte)
  const [ feil, setFeil ] = useState<ValideringsFeil[]>([])
  const [ loadingStatus, setLoadingStatus ] = useState<number>(-1);
  const [ tokenExpired, setTokenExpired ] = useState(false);
  const [ identityNumberInput, setIdentityNumberInput ] = useState('');
  return (
    <BulkSkjemaContext.Provider value={{ ansatte, setAnsatte, feil, setFeil, loadingStatus, setLoadingStatus,
      tokenExpired, setTokenExpired, identityNumberInput, setIdentityNumberInput }}>
      { props.children }
    </BulkSkjemaContext.Provider>
  )
}
