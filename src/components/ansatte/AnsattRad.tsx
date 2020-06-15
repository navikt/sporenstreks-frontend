import React, { FormEvent } from 'react';
import { Dager } from './Dager';
import { Refusjon } from './Refusjon';
import { Fnr } from './Fnr';
import Periode from './Periode';
import { useAppStore } from '../../data/store/AppStore';
import { AnsattID, byggAnsatt, SkjemaStatus } from '../../data/types/sporenstreksTypes';
import { ByggValideringsFeil } from './ByggValideringsFeil';
import Slettknapp from './Slettknapp';
import { Column, Row } from 'nav-frontend-grid';
import RadNr from './RadNr';

export const AnsattRad = ({ id }: AnsattID) => {
  const { ansatte, setAnsatte, setFeil } = useAppStore();
  const handleClick = (evt: FormEvent) => {
    const arr = ansatte.filter(a => a.id !== id);
    setAnsatte([...arr]);
    setFeil(ByggValideringsFeil([...arr]));
    evt.preventDefault();
  };
  const a = ansatte.find(a => a.id === id) || byggAnsatt()
  if (a.status === SkjemaStatus.GODKJENT) {
    return (
      <Row key={a?.id} className="AnsattRad">
        <Column><RadNr nr={ansatte.indexOf(a) + 1}/></Column>
        <Column>{a?.fnr}</Column>
        <Column>{a.fom} til {a.tom}</Column>
        <Column>{a.antallDagerMedRefusjon}</Column>
        <Column>{a.beloep}</Column>
        <Column>{a.referenceNumber}</Column>
      </Row>
    )
  }
  return (
    <Row key={a?.id} className="AnsattRad">
      <Column md="1" xs="12"><RadNr nr={ansatte.indexOf(a) + 1}/></Column>
      <Column md="2" xs="12"><Fnr id={a?.id}/></Column>
      <Column md="4" xs="12"><Periode id={a?.id} /></Column>
      <Column md="2" xs="12"><Dager id={a?.id} /></Column>
      <Column md="2" xs="12"><Refusjon id={a?.id} /></Column>
      <Column md="1" xs="12">
        {
          ansatte.length > 1 &&
          <Slettknapp onClick={handleClick} />
        }
      </Column>
    </Row>
  )
}
