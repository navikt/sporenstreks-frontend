import React from 'react';
import Vis from '../Vis';
import Periode from './periode/Periode';
import Antall from './antall/Antall';
import Beloep from './beloep/Beloep';
import { Column, Row } from 'nav-frontend-grid';
import Slettknapp from '../ansatte/Slettknapp';

interface PeriodeKompProps {
  index: number;
  min?: Date;
  max?: Date;
  slettPeriode: (e: any, idx: number) => void;
  numOfRows: number;
}

const PeriodeKomp = (props: PeriodeKompProps) => {

  return (
      <Row className="periode">
        <Column md="5" xs="12">
          <Periode index={props.index} min={props.min} max={props.max} />
        </Column>
        <Column md="3" xs="12">
          <Antall index={props.index} />
        </Column>
        <Column md="3" xs="12">
          <Beloep index={props.index} />
        </Column>
        <Column md="1" xs="12">
          <Vis hvis={props.numOfRows > 1}>
            <Slettknapp onClick={(e) => props.slettPeriode(e, props.index)}/>
          </Vis>
        </Column>
      </Row>
  )
};

export default PeriodeKomp;
