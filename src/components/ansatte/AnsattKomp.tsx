import React from 'react';
import Vis from '../Vis';
import { Normaltekst } from 'nav-frontend-typografi';
import Periode from '../inputfelt/Periode';
import Antall from '../inputfelt/Antall';
import Beloep from '../inputfelt/Beloep';
import FodselNr from '../inputfelt/FodselNr';
import { Ansatt } from '../../data/types/sporenstreksTypes';

interface AnsatteKompProps {
  index: number;
  ansatt: Ansatt;
  min?: Date;
  max?: Date;
}

const AnsattKomp = (props: AnsatteKompProps) => {
  const slettAnsatt = (e, index) => {
    e.preventDefault();
  };

  return (
    <div className="ansatt" role="group">

      <FodselNr ansatt={props.ansatt} index={props.index} />
      <Periode ansatt={props.ansatt} index={props.index} min={props.min} max={props.max} />
      <Antall ansatt={props.ansatt} index={props.index} />
      <Beloep ansatt={props.ansatt} index={props.index} />

      <Vis hvis={props.index > 0}>
        <button role='link' id={'btn_' + props.index} className='ansattknapp lenke slett'
          onClick={(e) => slettAnsatt(e, props.index)}
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
