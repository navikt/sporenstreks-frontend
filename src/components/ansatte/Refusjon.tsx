import React from "react";
import {Input} from "nav-frontend-skjema";
import {useAppStore} from "../../data/store/AppStore";

export const Refusjon = (id: number) => {
  const {ansatte, setAnsatte} = useAppStore();
  const a = ansatte.find(a => a.id === id)
  const handleChange = (evt) => {
    if (a) {
      a.beloep = parseInt(evt.target.value)
    } else {
      console.warn("Fant ikke rad")
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
