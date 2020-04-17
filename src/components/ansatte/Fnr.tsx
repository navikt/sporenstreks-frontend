import React from "react";
import {InputProps} from "nav-frontend-skjema/lib/input";
import {FnrInput, Input} from "nav-frontend-skjema";
import {useAppStore} from "../../data/store/AppStore";

export const Fnr = (id: number) => {
    const {ansatte, setAnsatte} = useAppStore();
    const a = ansatte.find(a => a.id === id)
    const handleChange = (evt) => {
        if (a){
            a.fnr = parseInt(evt.target.value)
        } else {
            console.warn("Fant ikke rad")
        }
        setAnsatte(ansatte)
    }
    return (<div>
        <FnrInput
            bredde="M"
            value={a?.fnr}
            placeholder="11 siffer"
            onChange={handleChange}
            onValidate={() => console.log("valid")}
            feil={a?.fnrError}
        />
    </div>)
}
