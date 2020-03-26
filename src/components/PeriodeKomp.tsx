import React, { useEffect, useReducer } from 'react';
import Flatpickr from 'react-flatpickr';
import Vis from './Vis';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import { Input } from 'nav-frontend-skjema';
import dayjs from 'dayjs';
import { helseSpionReducer, initialHelseSpionState } from '../store/reducers/helseSpionReducers';
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
  const feilmelding = 'FEIL!!!';
  const [ state, dispatch ] = useReducer(helseSpionReducer, initialHelseSpionState);

  console.log('state', state); // eslint-disable-line

  let min = props.min;
  let max = props.max;
  if (!min) min = dayjs('2020-03-03').toDate();
  if (!max) max = dayjs('2020-03-18').toDate();

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <li className='periode'>
      <div className="periodefelt">
        <div className='periodelabel'>
          <label htmlFor={htmlfor} className='fom'>
            Fra og med første, til og med siste fraværsdag
          </label>
        </div>
        <Flatpickr
          id={id}
          name={id}
          className='skjemaelement__input input--xl'
          placeholder='dd.mm.yyyy til dd.mm.yyyy'
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

      <div className="antallfelt">
        <label htmlFor={'antall_' + id} className="dager">
          Hvor mange dager ønskes refundert?
        </label>
        <Input
          type="number"
          step={1}
          name={'antall_' + id}
          label=""
          bredde="S"
        />
      </div>

      <Vis hvis={props.index > 0}>
        <button role='link' id={'btn_' + id} className='periodeknapp lenke slett'
          onClick={(e) => props.slettPeriode(e, props.index)}
        >
          Slett periode
        </button>
      </Vis>
    </li>
  )
};

export default PeriodeKomp;
