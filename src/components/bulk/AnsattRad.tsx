import React, { FormEvent } from 'react';
import { BulkDager } from './BulkDager';
import { BulkRefusjon } from './BulkRefusjon';
import { BulkFnr } from './BulkFnr';
import BulkVisning from './BulkVisning';
import BulkPeriode from './BulkPeriode';
import { AnsattID, byggAnsatt } from './Ansatt';
import { SkjemaStatus } from '../../data/types/sporenstreksTypes';
import { ByggValideringsFeil } from './ByggValideringsFeil';
import Slettknapp from './Slettknapp';
import { Column, Row } from 'nav-frontend-grid';
import RadNr from './RadNr';
import { useBulk } from '../../context/BulkContext';

export const AnsattRad = ({ id }: AnsattID) => {
  const { ansatte, setAnsatte, setFeil } = useBulk();
  const handleClick = (evt: FormEvent) => {
    const arr = ansatte.filter(a => a.id !== id);
    setAnsatte([...arr]);
    setFeil(ByggValideringsFeil([...arr]));
    evt.preventDefault();
  };
  const a = ansatte.find(a => a.id === id) || byggAnsatt()
  if (a.status === SkjemaStatus.GODKJENT) {
    return (
      <Row key={a.id} className="AnsattRad">
        <Column md="1" xs="12"><RadNr nr={ansatte.indexOf(a) + 1}/></Column>
        <Column md="2" xs="12">
          <BulkVisning label="Fødselsnummer:">
            {a?.fnr}
          </BulkVisning>
        </Column>
        <Column md="4" xs="12">
          <BulkVisning label="Hvilken periode var den ansatte borte?">
            {a.fom} til {a.tom}
          </BulkVisning>
        </Column>
        <Column md="2" xs="12">
          <BulkVisning label="Antall dager:">
            {a.antallDagerMedRefusjon}
          </BulkVisning>
        </Column>
        <Column md="2" xs="12">
          <BulkVisning label="Beløp">
            {a.beloep}
          </BulkVisning>
        </Column>
        <Column md="1" xs="12"> </Column>
      </Row>
    )
  }
  return (
    <Row key={a?.id} className="AnsattRad">
      <Column md="1" xs="12"><RadNr nr={ansatte.indexOf(a) + 1}/></Column>
      <Column md="2" xs="12"><BulkFnr id={a?.id}/></Column>
      <Column md="4" xs="12"><BulkPeriode id={a?.id} /></Column>
      <Column md="2" xs="12"><BulkDager id={a?.id} /></Column>
      <Column md="2" xs="12"><BulkRefusjon id={a?.id} /></Column>
      <Column md="1" xs="12">
        {
          ansatte.length > 1 &&
          <Slettknapp onClick={handleClick} />
        }
      </Column>
    </Row>
  )
}
