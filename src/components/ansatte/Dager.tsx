import React from "react";
import { Select } from "nav-frontend-skjema";
import { useAppStore } from "../../data/store/AppStore";
import { AnsattID } from "../../data/types/sporenstreksTypes";
import { HjelpetekstDager } from "./HjelpetekstDager";

export const Dager = (props: AnsattID) => {
    const {ansatte, setAnsatte} = useAppStore();
    const a = ansatte.find(a => a.id === props.id)
    const handleChange = (evt) => {
        if (a) {
            a.antallDagerMedRefusjon = parseInt(evt.target.selectedIndex);
        }
        setAnsatte([...ansatte]);
    }
    return (
            <Select feil={a?.dagerError}
                    onChange={handleChange}
                    label={
                      <div style={{display: 'flex'}}>
                        Antall dager
                        <HjelpetekstDager/>
                      </div>}
                    selected={a?.antallDagerMedRefusjon}>
                <option value="0">-</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
            </Select>
    )
}

export default Dager;
