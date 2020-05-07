import {filterStringToNumbersOnly} from "../../util/filterStringToNumbersOnly";
import {Input} from "nav-frontend-skjema";
import {HjelpetekstRefusjon} from "../ansatte/HjelpetekstRefusjon";
import Eksempel from "../Eksempel";
import React from "react";

interface RefusjonInputProps {
  feilmelding?: string,
  beloep?: number,
  handleChange: any
}

export const Convert = (value?: string) => {
  if (!value){
    return;
  }
  if (value.trim().length == 0){
    return;
  }
  return filterStringToNumbersOnly(value, 20);
}

export const RefusjonInput = ({beloep, feilmelding, handleChange} : RefusjonInputProps) => {
  const handleChangeLocal = (evt) => {
    handleChange(Convert(evt.target.value));
  }
  return (
    <div>
      <Input feil={feilmelding}
             value={beloep ? beloep : ''}
             bredde={"S"}
             label={
               <div style={{display: 'flex'}}>
                 Beløp
                 <HjelpetekstRefusjon/>
                 <Eksempel/>
               </div>}
             placeholder="Beløp"
             inputMode={"numeric"}
             onChange={handleChangeLocal}/>
    </div>)
}
