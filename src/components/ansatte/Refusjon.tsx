import React from "react";
import {Input} from "nav-frontend-skjema";
import {useAppStore} from "../../data/store/AppStore";

interface refusjonProps {
  id: number
}

export const Refusjon = (props) => {
  const {ansatte, setAnsatte} = useAppStore();
  const a = ansatte.find(a => a.id === props.id)
  const handleChange = (evt) => {
    if (a) {
      a.beloep = evt.target.value ? parseInt(evt.target.value) : undefined
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
