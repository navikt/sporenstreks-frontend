import React, { createContext, useContext, useState } from 'react';

export const fnrErrorState = {
  hasError: '',
  noError: 'tom'
};

interface EnkelContext {
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
    setReferanseNummer: function (nr) {}, // eslint-disable-line @typescript-eslint/no-unused-vars
    identityNumberInput: '',
    setIdentityNumberInput: function (nr) {}, // eslint-disable-line @typescript-eslint/no-unused-vars
    erklæringAkseptert: false,
    setErklæringAkseptert: function (akseptert) {}, // eslint-disable-line @typescript-eslint/no-unused-vars
    sendSkjemaOpen: false,
    setSendSkjemaOpen: function (skjemaOpen) {}, // eslint-disable-line @typescript-eslint/no-unused-vars
    formData: {},
    setFormData: function (formData) {}, // eslint-disable-line @typescript-eslint/no-unused-vars
    fnrClassName: fnrErrorState.noError,
    setFnrClassName: function (fnrClassName) {} // eslint-disable-line @typescript-eslint/no-unused-vars
  } as EnkelContext);

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
