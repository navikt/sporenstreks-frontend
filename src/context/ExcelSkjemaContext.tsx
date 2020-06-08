import React, { createContext, useContext, useState } from 'react';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import ArbeidsgiverAPI from '../api/ArbeidsgiverAPI';
import Spinner from 'nav-frontend-spinner';
import IngenData from '../pages/IngenData';
import env from '../util/environment';

export const buildExcelSkjemaContext = () => ({

})

const ExcelSkjemaContext = createContext(buildExcelSkjemaContext());

interface ArbeidsgiverContextProviderProps {
  children: any
}

export const useExcelSkjema = () => useContext(ExcelSkjemaContext);

export const ExcelSkjemaProvider = (props: ArbeidsgiverContextProviderProps) => {
  return (
    <ExcelSkjemaContext.Provider value={{  }}>
      { props.children }
    </ExcelSkjemaContext.Provider>
  )
}
