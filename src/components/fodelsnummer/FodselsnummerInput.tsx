import React, { useEffect, useState, FormEvent } from "react";
import { FnrInput } from "nav-frontend-skjema";
import { filterIdentityNumberInput } from "../../util/filterIndentityNumberInput";
import validateFnrSingle from "../validering/validateFnrLengthAndValidity";
import uuid from 'uuid/v4';


interface FodselsnummerInputProps {
  feilmelding?: string,
  fnr?: string,
  handleChange: any,
  id?: number | string
}

export const FodselsnummerInput = ({ feilmelding, fnr, handleChange, id }: FodselsnummerInputProps) => {
  const [lokalFeil, setLokalFeil] = useState<string | undefined>();
  const handleFnrChange = (evt) => {
    handleChange(filterIdentityNumberInput(evt.target.value));
  };

  const handleFnrBlur = (evt) => {
    const fnr = filterIdentityNumberInput(evt.target.value);
    const feilmelding = validateFnrSingle(fnr);
    setLokalFeil(feilmelding)
  };

  useEffect(() => {
    setLokalFeil(feilmelding);
  }, [feilmelding])

  const componentId = id ? id : uuid();

  const feilmeldingstekst = feilmelding ? feilmelding : lokalFeil;

  return <FnrInput
    id={"fnr_" + componentId}
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
