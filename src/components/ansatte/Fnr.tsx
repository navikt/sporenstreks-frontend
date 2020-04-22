import React from "react";
import { FnrInput } from "nav-frontend-skjema";
import { useAppStore } from "../../data/store/AppStore";
import { filterIdentityNumberInput } from '../../util/filterIndentityNumberInput';
import { AnsattID } from "../../data/types/sporenstreksTypes";

export const Fnr = ({ id }: AnsattID) => {
  const { ansatte, setAnsatte } = useAppStore();
  const a = ansatte.find(a => a.id === id)
  const handleChange = (evt) => {
    if (a) {
      a.fnr = filterIdentityNumberInput(evt.target.value);
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
