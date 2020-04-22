import React from "react";
import {Input} from "nav-frontend-skjema";
import {useAppStore} from "../../data/store/AppStore";
import { AnsattID } from "../../data/types/sporenstreksTypes";

export const Refusjon = (props: AnsattID) => {
  const {ansatte, setAnsatte} = useAppStore();
  const a = ansatte.find(a => a.id === props.id)
  const handleChange = (evt) => {
    if (a) {
      a.beloep = evt.target.value ? parseInt(evt.target.value) : undefined
    }
    setAnsatte([...ansatte]);
  }
  return (
    <div>
      <Input feil={a?.beloepError}
             value={a?.beloep}
             bredde={"S"}
             placeholder="Beløp"
             inputMode={"numeric"}
             onChange={handleChange}/>
    </div>)
}
