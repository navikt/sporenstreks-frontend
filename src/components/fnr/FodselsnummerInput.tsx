import React, { useEffect, useState } from 'react';
import { FnrInput } from 'nav-frontend-skjema';
import { filterIdentityNumberInput } from './filterIndentityNumberInput';
import validateFnrSingle from './validateFnrLengthAndValidity';
import { v4 as uuidv4 } from 'uuid';

interface FodselsnummerInputProps {
  feilmelding?: string,
  fnr?: string,
  handleChange: any,
  id?: number | string
}

export const FodselsnummerInput = ({ feilmelding, fnr, handleChange, id }: FodselsnummerInputProps) => {
  const [lokalFeil, setLokalFeil] = useState<string | undefined>();
  const handleFnrChange = (evt: React.MouseEvent) => {
    handleChange(filterIdentityNumberInput(evt.target.value));
  };

  const handleFnrBlur = (evt: React.MouseEvent) => {
    const fnr = filterIdentityNumberInput(evt.target.value);
    const feilmelding = validateFnrSingle(fnr);
    setLokalFeil(feilmelding)
  };

  useEffect(() => {
    setLokalFeil(feilmelding);
  }, [feilmelding])

  const componentId = 'fnr_'.concat(id ? String(id) : uuidv4());

  const feilmeldingstekst = feilmelding ? feilmelding : lokalFeil;

  return <FnrInput
    id={componentId}
    label={
      <div style={{ display: 'flex' }}>
        Fødselsnummer
      </div>}
    bredde="M"
    value={fnr}
    placeholder="11 siffer"
    onChange={handleFnrChange}
    onBlur={handleFnrBlur}
    onValidate={() => true}
    feil={feilmeldingstekst}
  />
}


export default FodselsnummerInput;
