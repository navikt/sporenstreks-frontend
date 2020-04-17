import React from 'react';
import './Ansatte.less';
import {Flatknapp} from "nav-frontend-knapper";
import {Dager} from "./Dager";
import {Refusjon} from "./Refusjon";
import {Fnr} from "./Fnr";
import {Periode} from "./Periode";
import {useAppStore} from "../../data/store/AppStore";
import {byggAnsatt} from "../../data/types/sporenstreksTypes";

export const AnsattRad = (id: number) => {
    const {ansatte, setAnsatte} = useAppStore();
    const handleClick = (evt) => {
        const arr = ansatte.filter( a => a.id !== id);
        setAnsatte(arr);
    }
    const a = ansatte.find(a => a.id === id) || byggAnsatt()

    return (
        <tr key={a?.id}>
            <td>{Fnr(a?.id)}</td>
            <td>{Periode(a?.id)}</td>
            <td>{Dager(a?.id)}</td>
            <td>{Refusjon(a?.id)}</td>
            <td><Flatknapp onClick={handleClick}>Slett</Flatknapp></td>
        </tr>
    )
}
