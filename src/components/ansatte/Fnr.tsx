import React from "react";
import { FnrInput } from "nav-frontend-skjema";
import { useAppStore } from "../../data/store/AppStore";
import { identityNumberSeparation } from '../../util/identityNumberSeparation';
import { filterIdentityNumberInput } from '../../util/filterIndentityNumberInput';

export const Fnr = (id: number) => {
  const { ansatte, setAnsatte } = useAppStore();
  const a = ansatte.find(a => a.id === id)
  const handleChange = (evt) => {
    if (a){
      a.fnr = filterIdentityNumberInput(evt.target.value);
    } else {
      console.warn("Fant ikke rad")
    }
    setAnsatte([...ansatte]);
  };

  return (<div>
    <FnrInput
      id={"fnr_"+id}
      bredde="M"
      value={a?.fnr}
      placeholder="11 siffer"
      onChange={handleChange}
      onValidate={() => console.log("valid")}
      feil={a?.fnrError}
    />
  </div>)
};
