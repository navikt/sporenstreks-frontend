import React from "react";
import { useAppStore } from "../../data/store/AppStore";
import { AnsattID } from "../../data/types/sporenstreksTypes";
import { filterStringToNumbersOnly } from "../../util/filterStringToNumbersOnly";
import { validateMaksBeloep } from '../validering/validateMaksBeloep';
import { RefusjonInput } from "../refusjon/RefusjonInput";


export const Refusjon = (props: AnsattID) => {
  const { ansatte, setAnsatte } = useAppStore();
  const a = ansatte.find(a => a.id === props.id);

  const handleChange = (val: string) => {
    if (a) {
      const s = filterStringToNumbersOnly(val, 20);
      a.beloep = s.length === 0 ? undefined : parseInt(val);
      a.beloepError = validateMaksBeloep(a.beloep);
    }
    setAnsatte([...ansatte]);
  };

  return (
    <div>
      <RefusjonInput
        feilmelding={a?.beloepError}
        beloep={a?.beloep}
        handleChange={handleChange} />
    </div>)
};

export default Refusjon;
