import React from 'react';
import Vis from '../Vis';
import { Normaltekst } from 'nav-frontend-typografi';
import Periode from './periode/Periode';
import Antall from './antall/Antall';
import Beloep from './beloep/Beloep';
import './Flatpickr.less';
import { Column, Row } from 'nav-frontend-grid';

interface PeriodeKompProps {
  index: number;
  min?: Date;
  max?: Date;
  slettPeriode: (e: any, idx: number) => void;
}

const PeriodeKomp = (props: PeriodeKompProps) => {

  return (
    <Row>
      <Column md="3" sm="12">
        <Periode id={props.index} index={props.index} min={props.min} max={props.max} />
      </Column>
      <Column md="3" sm="12">
        <Antall index={props.index} />
      </Column>
      <Column md="3" sm="12">
        <Beloep index={props.index} />
      </Column>
      <Column md="3" sm="12">
        <Vis hvis={props.index > 0}>
          <button role='link' id={'btn_' + props.index} className='periodeknapp lenke slett'
                  onClick={(e) => props.slettPeriode(e, props.index)}
          >
            <Normaltekst tag="span">
              Slett periode
            </Normaltekst>
          </button>
        </Vis>
      </Column>
    </Row>
  )
};

export default PeriodeKomp;
