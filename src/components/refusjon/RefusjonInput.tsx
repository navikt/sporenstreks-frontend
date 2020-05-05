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

export const RefusjonInput = ({beloep, feilmelding, handleChange} : RefusjonInputProps) => {
  const handleChangeLocal = (evt) => {
    const s = filterStringToNumbersOnly(evt.target.value ? evt.target.value : "", 20);
    handleChange(s.length === 0 ? undefined : parseInt(evt.target.value))
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
