import React, { useEffect, useState } from 'react';
import Flatpickr from 'react-flatpickr';
import Vis from './Vis';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import { Input } from 'nav-frontend-skjema';
import dayjs from 'dayjs';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import './Flatpickr.less';
import NumberFormat from "react-number-format";

interface PeriodeProps {
  id: string;
  index: number;
  min?: Date;
  max?: Date;
  slettPeriode: (e: any, idx: number) => void;
}

const PeriodeKomp = (props: PeriodeProps) => {
  const [ amountInput, setAmountInput ] = useState<string>('');
  const id = props.id + '_' + props.index;
  const htmlfor = props.id + '_t_' + props.index;

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
          className="skjemaelement__input input--m"
          placeholder="dd.mm.åååå til dd.mm.åååå"
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

      <div className="skjemaelement">
        <label htmlFor="belop" className="skjemaelement__label">
          <Normaltekst tag="span">Hvor mye søkes refundert</Normaltekst>
        </label>
        <NumberFormat
          name="belop"
          id="belop"
          label=""
          value={amountInput}
          customInput={Input}
          thousandSeparator={' '}
          decimalSeparator={','}
          className="input--s"
          onChange={e => setAmountInput(e.target.value)}
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
