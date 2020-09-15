import React, { createContext, useContext, useState } from 'react';

export const fnrErrorState = {
  hasError: '',
  noError: 'tom'
}

interface EnkelContext {
  referanseNummer: string,
  setReferanseNummer,
  identityNumberInput: string,
  setIdentityNumberInput,
  erklæringAkseptert: boolean,
  setErklæringAkseptert,
  sendSkjemaOpen: boolean,
  setSendSkjemaOpen,
  formData: {},
  setFormData,
  fnrClassName: string,
  setFnrClassName
}

export const buildEnkelContext = () => ({
  referanseNummer: '',
  setReferanseNummer: function(nr) {},
  identityNumberInput: '',
  setIdentityNumberInput: function(nr){},
  erklæringAkseptert: false,
  setErklæringAkseptert: function(akseptert){},
  sendSkjemaOpen: false,
  setSendSkjemaOpen: function(skjemaOpen){},
  formData: {},
  setFormData: function(formData){},
  fnrClassName: fnrErrorState.noError,
  setFnrClassName: function(fnrClassName){}
}) as EnkelContext

const EnkelContext = createContext(buildEnkelContext());

interface EnkelContextProviderProps {
  children: any,
  identityNumberInput?: string
}

export const useEnkelSkjema = () => useContext(EnkelContext);

const EnkelProvider = (props: EnkelContextProviderProps) => {
  const [ referanseNummer, setReferanseNummer ] = useState<string>('');
  const [ identityNumberInput, setIdentityNumberInput ] = useState<string>(props.identityNumberInput || '');
  const [ erklæringAkseptert, setErklæringAkseptert ] = useState<boolean>(false);
  const [ sendSkjemaOpen, setSendSkjemaOpen ] = useState<boolean>(false);
  const [ formData, setFormData ] = useState<any>({});
  const [ fnrClassName, setFnrClassName ] = useState<string>(fnrErrorState.noError);
  return (
    <EnkelContext.Provider value={{
      referanseNummer, setReferanseNummer,
      identityNumberInput, setIdentityNumberInput,
      erklæringAkseptert, setErklæringAkseptert,
      sendSkjemaOpen, setSendSkjemaOpen,
      formData, setFormData,
      fnrClassName, setFnrClassName
    }}>
      { props.children }
    </EnkelContext.Provider>
  )
}

export default EnkelProvider;
