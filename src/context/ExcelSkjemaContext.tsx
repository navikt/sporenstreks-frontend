import React, { createContext, useContext, useState } from 'react';
import { tabellFeil } from '../components/feilvisning/FeilTabell';

export const buildExcelSkjemaContext = (fileName: string = '', visAlleFeil: boolean = false, hasTriedSubmit: boolean = false,
                                        feil: tabellFeil[] = [], file?: File ) => ({
  fileName,
  setFileName: (filename: string) => {},
  file,
  setFile: (file: File) => {},
  visAlleFeil,
  setVisAlleFeil: (visAlleFeil:boolean) => {},
  hasTriedSubmit,
  setHasTriedSubmit: (hasTriedSubmit:boolean) => {},
  feil,
  setFeil: (feil: tabellFeil[]) => {}
})

const ExcelSkjemaContext = createContext(buildExcelSkjemaContext('', false, false, []));

interface ArbeidsgiverContextProviderProps {
  children: any
}

export const useExcelSkjema = () => useContext(ExcelSkjemaContext);

export const ExcelSkjemaProvider = (props: ArbeidsgiverContextProviderProps) => {
  const [fileName, setFileName] = useState('Last opp utfylt Excel-mal');
  const [file, setFile] = useState<File>();
  const [feil, setFeil] = useState<tabellFeil[]>([]);
  const [visAlleFeil, setVisAlleFeil] = useState(false)
  const [hasTriedSubmit, setHasTriedSubmit] = useState(false)

  return (
    <ExcelSkjemaContext.Provider value={{ fileName, setFileName, file, setFile, feil, setFeil,
      visAlleFeil, setVisAlleFeil, hasTriedSubmit, setHasTriedSubmit }}>
      { props.children }
    </ExcelSkjemaContext.Provider>
  )
}
