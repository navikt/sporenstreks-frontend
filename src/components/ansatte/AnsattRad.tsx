import React, { FormEvent } from 'react';
import './Ansatte.less';
import { Dager } from "./Dager";
import { Refusjon } from "./Refusjon";
import { Fnr } from "./Fnr";
import { Periode } from "./Periode";
import { useAppStore } from "../../data/store/AppStore";
import { byggAnsatt, SkjemaStatus, AnsattID } from "../../data/types/sporenstreksTypes";
import Lukknapp from "nav-frontend-lukknapp";
import { ByggValideringsFeil } from "./ByggValideringsFeil";

export const AnsattRad = ({ id }: AnsattID) => {
  const { ansatte, setAnsatte, setFeil } = useAppStore();
  const handleClick = (evt: FormEvent) => {
    const arr = ansatte.filter(a => a.id !== id);
    setAnsatte([...arr]);
    setFeil(ByggValideringsFeil([...arr]));
    evt.preventDefault();
  }
  const a = ansatte.find(a => a.id === id) || byggAnsatt()
  if (a.status == SkjemaStatus.GODKJENT) {
    return (
      <tr key={a?.id}>
        <td>{ansatte.indexOf(a) + 1}</td>
        <td>{a?.fnr}</td>
        <td>{a.fom} til {a.tom}</td>
        <td>{a.antallDagerMedRefusjon}</td>
        <td>{a.beloep}</td>
        <td>{a.referenceNumber}</td>
      </tr>
    )
  }
  return (
    <tr key={a?.id}>
      <td>{ansatte.indexOf(a) + 1}</td>
      <td><Fnr id={a?.id} /></td>
      <td><Periode id={a?.id} /></td>
      <td><Dager id={a?.id} /></td>
      <td><Refusjon id={a?.id} /></td>
      <td>
        {
          ansatte.length > 1 &&
          <Lukknapp onClick={handleClick} />
        }
      </td>
    </tr>
  )
}
