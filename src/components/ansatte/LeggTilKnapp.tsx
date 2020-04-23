import React from "react";
import {useAppStore} from "../../data/store/AppStore";
import {Flatknapp} from "nav-frontend-knapper";
import {byggAnsatt} from "../../data/types/sporenstreksTypes";
import {Normaltekst} from "nav-frontend-typografi";

export const LeggTilKnapp = () => {
    const {ansatte, setAnsatte} = useAppStore();
    const handleAddRad = (e: React.FormEvent) => {
        e.preventDefault();
        ansatte.push(byggAnsatt())
        setAnsatte([...ansatte]);
    }
    if (ansatte.length == 50) {
      return (<Normaltekst>Det er ikke tillatt å sende inn flere enn 50 stk om gangen.</Normaltekst>)
    }
    return (<Flatknapp onClick={handleAddRad}>Legg til enda en ansatt</Flatknapp>)
}
