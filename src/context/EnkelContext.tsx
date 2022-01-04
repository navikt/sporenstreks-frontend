import React, { createContext, useContext, useState } from 'react';

export const fnrErrorState = {
  hasError: '',
  noError: 'tom'
};

interface EnkelContextVerdier {
  referanseNummer: string;
  setReferanseNummer;
  identityNumberInput: string;
  setIdentityNumberInput;
  erklæringAkseptert: boolean;
  setErklæringAkseptert;
  sendSkjemaOpen: boolean;
  setSendSkjemaOpen;
  formData: {};
  setFormData;
  fnrClassName: string;
  setFnrClassName;
}

export const buildEnkelContext = () =>
  ({
    referanseNummer: '',
    setReferanseNummer: (nr: string) => nr,
    identityNumberInput: '',
    setIdentityNumberInput: (nr: string) => nr,
    erklæringAkseptert: false,
    setErklæringAkseptert: (akseptert: boolean) => akseptert,
    sendSkjemaOpen: false,
    setSendSkjemaOpen: (skjemaOpen: boolean) => skjemaOpen,
    formData: {},
    setFormData: (formData) => formData,
    fnrClassName: fnrErrorState.noError,
    setFnrClassName: (fnrClassName: string) => fnrClassName
  } as EnkelContextVerdier);

const EnkelContext = createContext(buildEnkelContext());

interface EnkelContextProviderProps {
  children: any;
  identityNumberInput?: string;
}

export const useEnkelSkjema = () => useContext(EnkelContext);

const EnkelProvider = (props: EnkelContextProviderProps) => {
  const [referanseNummer, setReferanseNummer] = useState<string>('');
  const [identityNumberInput, setIdentityNumberInput] = useState<string>(
    props.identityNumberInput || ''
  );
  const [erklæringAkseptert, setErklæringAkseptert] = useState<boolean>(false);
  const [sendSkjemaOpen, setSendSkjemaOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<any>({});
  const [fnrClassName, setFnrClassName] = useState<string>(
    fnrErrorState.noError
  );
  return (
    <EnkelContext.Provider
      value={{
        referanseNummer,
        setReferanseNummer,
        identityNumberInput,
        setIdentityNumberInput,
        erklæringAkseptert,
        setErklæringAkseptert,
        sendSkjemaOpen,
        setSendSkjemaOpen,
        formData,
        setFormData,
        fnrClassName,
        setFnrClassName
      }}
    >
      {props.children}
    </EnkelContext.Provider>
  );
};

export default EnkelProvider;
