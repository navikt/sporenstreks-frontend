import React, { createContext, useContext, useState } from 'react';
import { Ansatt, byggAnsatt } from '../components/bulk/Ansatt';
import { ValideringsFeil } from '../components/bulk/ValideringsFeil';

interface BulkContext {
  ansatte: Ansatt[],
  setAnsatte,
  feil: ValideringsFeil[],
  setFeil,
  loadingStatus: number,
  setLoadingStatus
}

export const buildBulkContext = () => ({
  ansatte: [],
  setAnsatte: function(ansatte: Ansatt[]){},
  feil: [],
  setFeil: function(feil: ValideringsFeil[]){},
  loadingStatus: -1,
  setLoadingStatus: function(status){}
}) as BulkContext

const BulkContext = createContext(buildBulkContext());

interface BulkContextProviderProps {
  children: any,
  ansatte?: Ansatt[],
  feil?: ValideringsFeil[]
}

export const useBulk = () => useContext(BulkContext);

export const BulkProvider = (props: BulkContextProviderProps) => {
  const [ ansatte, setAnsatte ] = useState<Ansatt[]>(props.ansatte || [byggAnsatt()]);
  const [ feil, setFeil ] = useState<ValideringsFeil[]>(props.feil || [] ); // bulk
  const [ loadingStatus, setLoadingStatus ] = useState<number>(-1);
  return (
    <BulkContext.Provider value={{ ansatte, setAnsatte, feil, setFeil, loadingStatus, setLoadingStatus }}>
      { props.children }
    </BulkContext.Provider>
  )
}

export default useBulk;
