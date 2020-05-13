import React from 'react';
import Vis from '../Vis';
import { Normaltekst } from 'nav-frontend-typografi';
import Periode from './periode/Periode';
import Antall from './antall/Antall';
import Beloep from './beloep/Beloep';
import './Flatpickr.scss';

interface PeriodeKompProps {
  index: number;
  min?: Date;
  max?: Date;
  slettPeriode: (e: any, idx: number) => void;
}

const PeriodeKomp = (props: PeriodeKompProps) => {

  return (
    <div className="periode" role="group">

      <Periode index={props.index} min={props.min} max={props.max} />
      <Antall index={props.index} />
      <Beloep index={props.index} />

      <Vis hvis={props.index > 0}>
        <button role='link' id={'btn_' + props.index} className='periodeknapp lenke slett'
          onClick={(e) => props.slettPeriode(e, props.index)}
        >
          <Normaltekst tag="span">
            Slett periode
          </Normaltekst>
        </button>
      </Vis>
    </div>
  )
};

export default PeriodeKomp;
