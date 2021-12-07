import React, { useState } from 'react';
import Vis from '../felles/Vis';
import EnkelPeriode from './EnkelPeriode';
import EnkelDager from './EnkelDager';
import EnkelRefusjon from './EnkelRefusjon';
import { Column, Row } from 'nav-frontend-grid';
import Slettknapp from '../bulk/Slettknapp';

interface PeriodeKompProps {
  index: number;
  min?: Date;
  max?: Date;
  slettPeriode: (e: any, idx: number) => void;
  numOfRows: number;
}

const PeriodeKomp = (props: PeriodeKompProps) => {
  const [startDate, setStartDate] = useState<Date>(new Date());

  const onDateColosed = (selectedDate: Date) => {
    setStartDate(selectedDate);
  };

  return (
    <Row className='periode'>
      <Column md='5' xs='12'>
        <EnkelPeriode
          index={props.index}
          min={props.min}
          max={props.max}
          onClose={onDateColosed}
        />
      </Column>
      <Column md='3' xs='12'>
        <EnkelDager index={props.index} startdato={startDate} />
      </Column>
      <Column md='3' xs='12'>
        <EnkelRefusjon index={props.index} />
      </Column>
      <Column md='1' xs='12'>
        <Vis hvis={props.numOfRows > 1}>
          <Slettknapp onClick={(e) => props.slettPeriode(e, props.index)} />
        </Vis>
      </Column>
    </Row>
  );
};

export default PeriodeKomp;
