import React, { createContext, useContext, useState } from 'react';
import { Ansatt, byggAnsatt } from '../components/bulk/Ansatt';
import { ValideringsFeil } from '../components/bulk/ValideringsFeil';

interface BulkContextValues {
  ansatte: Ansatt[];
  setAnsatte: (ansatte: Ansatt[]) => void;
  feil: ValideringsFeil[];
  setFeil: (feil: ValideringsFeil[]) => void;
  loadingStatus: number;
  setLoadingStatus: (status: number) => void;
}

export const buildBulkContext = () =>
  ({
    ansatte: [],
    setAnsatte: (ansatte: Ansatt[]) => ansatte,
    feil: [],
    setFeil: (feil: ValideringsFeil[]) => feil,
    loadingStatus: -1,
    setLoadingStatus: (status: number) => status
  } as BulkContextValues);

const BulkContext = createContext(buildBulkContext());

interface BulkContextProviderProps {
  children: any;
  ansatte?: Ansatt[];
  feil?: ValideringsFeil[];
}

export const useBulk = () => useContext(BulkContext);

export const BulkProvider = (props: BulkContextProviderProps) => {
  const [ansatte, setAnsatte] = useState<Ansatt[]>(
    props.ansatte || [byggAnsatt()]
  );
  const [feil, setFeil] = useState<ValideringsFeil[]>(props.feil || []); // bulk
  const [loadingStatus, setLoadingStatus] = useState<number>(-1);
  return (
    <BulkContext.Provider
      value={{
        ansatte,
        setAnsatte,
        feil,
        setFeil,
        loadingStatus,
        setLoadingStatus
      }}
    >
      {props.children}
    </BulkContext.Provider>
  );
};

export default useBulk;
