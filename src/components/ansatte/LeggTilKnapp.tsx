import React from "react";
import {useAppStore} from "../../data/store/AppStore";
import {Flatknapp} from "nav-frontend-knapper";
import {byggAnsatt} from "../../data/types/sporenstreksTypes";

export const LeggTilKnapp = () => {
    const {ansatte, setAnsatte} = useAppStore();
    const handleAddRad = () => {
        ansatte.push(byggAnsatt())
        setAnsatte(ansatte);
    }
    return (<Flatknapp onClick={handleAddRad}>Legg til enda en ansatt</Flatknapp>)
}
