import React from 'react';
import Vis from '../Vis';
import { Normaltekst } from 'nav-frontend-typografi';
import Periode from '../periode/Periode';
import Antall from '../antall/Antall';
import Beloep from '../beloep/Beloep';
import FodselNr from '../fodselnr/FodselNr';

interface AnsatteKompProps {
  index: number;
  min?: Date;
  max?: Date;
  slettAnsatt: (e: any, idx: number) => void;
}

const AnsattKomp = (props: AnsatteKompProps) => {

  return (
    <div className="ansatt" role="group">

      <FodselNr index={props.index} />
      <Periode index={props.index} min={props.min} max={props.max} />
      <Antall index={props.index} />
      <Beloep index={props.index} />

      <Vis hvis={props.index > 0}>
        <button role='link' id={'btn_' + props.index} className='ansattknapp lenke slett'
          onClick={(e) => props.slettAnsatt(e, props.index)}
        >
          <Normaltekst tag="span">
            Slett ansatt
          </Normaltekst>
        </button>
      </Vis>
    </div>
  )
};

export default AnsattKomp;
