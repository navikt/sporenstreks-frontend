import React from "react";
import { FnrInput } from "nav-frontend-skjema";
import { useAppStore } from "../../data/store/AppStore";
import { filterIdentityNumberInput } from '../../util/filterIndentityNumberInput';

interface fnrProps {
  id: number
}

export const Fnr = ({ id }: fnrProps) => {
  const { ansatte, setAnsatte } = useAppStore();
  const a = ansatte.find(a => a.id === id)
  const handleChange = (evt) => {
    if (a) {
      a.fnr = filterIdentityNumberInput(evt.target.value);
    } else {
      console.warn("Fant ikke rad")
    }
    setAnsatte([...ansatte]);
  };

  return <FnrInput
    id={"fnr_" + id}
    bredde="M"
    value={a?.fnr}
    placeholder="11 siffer"
    onChange={handleChange}
    onValidate={() => { }}
    feil={a?.fnrError}
  />
};
