import React from 'react';
import './Ansatte.less';
import { Dager } from "./Dager";
import { Refusjon } from "./Refusjon";
import { Fnr } from "./Fnr";
import { Periode } from "./Periode";
import { useAppStore } from "../../data/store/AppStore";
import { byggAnsatt } from "../../data/types/sporenstreksTypes";
import Lukknapp from "nav-frontend-lukknapp";

export const AnsattRad = (id: number, fjernFeil: any) => {
  const { ansatte, setAnsatte } = useAppStore();
  const handleClick = (evt) => {
    const arr = ansatte.filter(a => a.id !== id);
    setAnsatte(arr);
    fjernFeil();
  }
  const a = ansatte.find(a => a.id === id) || byggAnsatt()
  return (
    <tr key={a?.id}>
      <td>{ansatte.indexOf(a) + 1}</td>
      <td>{Fnr(a?.id)}</td>
      <td>{Periode(a?.id)}</td>
      <td>{Dager(a?.id)}</td>
      <td>{Refusjon(a?.id)}</td>
      <td>
        {ansatte.length > 1 &&
          <Lukknapp onClick={handleClick} />
        }
      </td>
    </tr>
  )
}
