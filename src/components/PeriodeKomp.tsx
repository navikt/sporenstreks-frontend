import React, { useEffect } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Controller, useFormContext } from 'react-hook-form';
import Flatpickr from 'react-flatpickr';
import Vis from './Vis';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import { Input } from 'nav-frontend-skjema';

interface PeriodeProps {
  id: string;
  index: number;
  min?: Date;
  max?: Date;
  slettPeriode: (e: any, idx: number) => void;
}

const PeriodeKomp = (props: PeriodeProps) => {
  const { setValue, errors } = useFormContext();
  const id = props.id + '_' + props.index;
  const htmlfor = props.id + '_t_' + props.index;
  const feilmelding = 'FEIL!!!';

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  return (
    <li className='periode'>
      <div className='periodelabel'>
        <label htmlFor={htmlfor} className='fom'>
          Fra og med første, til og med siste fraværsdag
        </label>
        <label htmlFor={'antall_' + id} className="dager">
          Hvor mange dager ønskes refundert?
        </label>
      </div>
      <Controller
        as={Flatpickr}
        rules={{
          pattern: { value: /\d/, message: feilmelding }
        }}
        id={id}
        name={id}
        className='skjemaelement__input input--xl'
        placeholder='dd.mm.yyyy til dd.mm.yyyy'
        options={{
          minDate: props.min,
          maxDate: props.max,
          mode: 'range',
          enableTime: false,
          dateFormat: 'F j, Y',
          altInput: true,
          altFormat: 'd.m.Y',
          locale: Norwegian,
          allowInput: true
        }}
      />

      <Input type="number" step={1} name={'antall_' + id} label="" bredde="S" />

      <Vis hvis={props.index > 0}>
        <button role='link' id={'btn_' + id} className='periodeknapp lenke slett'
          onClick={(e) => props.slettPeriode(e, props.index)}
        >
          Slett periode
        </button>
      </Vis>

      <Normaltekst tag='div' role='alert' aria-live='assertive' className='skjemaelement__feilmelding'>
        <Vis hvis={errors[id]}>
          <p>{feilmelding}</p>
        </Vis>
      </Normaltekst>
    </li>
  )
};

export default PeriodeKomp;
