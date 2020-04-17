import React, {useState} from "react";
import {InputProps} from "nav-frontend-skjema/lib/input";
import {Input} from "nav-frontend-skjema";
import {Ansatt, UnleashToggles} from "../../data/types/sporenstreksTypes";
import {useAppStore} from "../../data/store/AppStore";

export const Dager = (id: number) => {
    const {ansatte, setAnsatte} = useAppStore();
    const a = ansatte.find(a => a.id === id)
    const handleChange = (evt) => {
        if (a){
            a.antallDagerMedRefusjon = parseInt(evt.target.value)
        } else {
            console.warn("Fant ikke rad")
        }
        setAnsatte(ansatte)
    }
    return (<div><Input feil={a?.dagerError} value={a?.antallDagerMedRefusjon} inputMode={"numeric"} onChange={handleChange}/></div>)
}
