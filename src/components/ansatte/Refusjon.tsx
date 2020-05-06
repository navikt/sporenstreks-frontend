import React from "react";
import { Input } from "nav-frontend-skjema";
import { useAppStore } from "../../data/store/AppStore";
import { AnsattID } from "../../data/types/sporenstreksTypes";
import { filterStringToNumbersOnly } from "../../util/filterStringToNumbersOnly";
import { HjelpetekstRefusjon } from "./HjelpetekstRefusjon";
import { validateMaksBeloep } from '../validering/validateMaksBeloep';

export const Refusjon = (props: AnsattID) => {
  const {ansatte, setAnsatte} = useAppStore();
  const a = ansatte.find(a => a.id === props.id);
  const handleChange = (evt) => {
    if (a) {
      const s = filterStringToNumbersOnly(evt.target.value ? evt.target.value : "", 20);
      a.beloep = s.length === 0 ? undefined : parseInt(evt.target.value);
      a.beloepError = validateMaksBeloep(a.beloep);
    }
    setAnsatte([...ansatte]);
  };
  return (
    <div>
      <Input
        feil={a?.beloepError}
        value={a?.beloep ? a?.beloep : ''}
        bredde={"S"}
        label={
          <div style={{display: 'flex'}}>
            Beløp
            <HjelpetekstRefusjon/>
          </div>}
        placeholder="Beløp"
        inputMode={"numeric"}
        onChange={handleChange}/>
    </div>)
};
