import React, { useEffect, useReducer } from 'react';
import Flatpickr from 'react-flatpickr';
import Vis from './Vis';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import { Input } from 'nav-frontend-skjema';
import dayjs from 'dayjs';
import { helseSpionReducer, initialHelseSpionState } from '../store/reducers/helseSpionReducers';
import { Normaltekst } from 'nav-frontend-typografi';
import './Flatpickr.less';

interface PeriodeProps {
  id: string;
  index: number;
  min?: Date;
  max?: Date;
  slettPeriode: (e: any, idx: number) => void;
}

const PeriodeKomp = (props: PeriodeProps) => {
  const id = props.id + '_' + props.index;
  const htmlfor = props.id + '_t_' + props.index;
  const [ state, dispatch ] = useReducer(helseSpionReducer, initialHelseSpionState);

  let min = props.min;
  let max = props.max;
  if (!min) min = dayjs('2020-03-03').toDate();
  if (!max) max = dayjs('2020-03-18').toDate();

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <div className="periode" role="group">
      <div className="skjemaelement">
        <label htmlFor={htmlfor} className="fom skjemaelement__label">
          <Normaltekst tag="span">
            Fra og med første, til og med siste fraværsdag
          </Normaltekst>
        </label>
        <Flatpickr
          id={id}
          name={id}
          className="skjemaelement__input input--xl"
          placeholder="dd.mm.yyyy til dd.mm.yyyy"
          options={{
            minDate: min,
            maxDate: max,
            mode: 'range',
            enableTime: false,
            dateFormat: 'F j, Y',
            altInput: true,
            altFormat: 'd.m.Y',
            locale: Norwegian,
            allowInput: true
          }}
        />
      </div>

      <div className="skjemaelement">
        <label htmlFor={'antall_' + id} className="dager skjemaelement__label">
          <Normaltekst tag="span">
            Hvor mange dager ønskes refundert?
          </Normaltekst>
        </label>
        <Input
          name={'antall_' + id}
          type="number"
          step={1}
          label=""
          bredde="S"
        />
      </div>

      <Vis hvis={props.index > 0}>
        <button role='link' id={'btn_' + id} className='periodeknapp lenke slett'
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
