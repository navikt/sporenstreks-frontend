import React, { createContext, useContext, useState } from 'react';

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
