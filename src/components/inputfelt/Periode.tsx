import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Controller, useFormContext } from 'react-hook-form';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import Flatpickr from 'react-flatpickr';
import Vis from '../Vis';
import dayjs from 'dayjs';

interface PeriodeProps {
  index: number;
  min?: Date;
  max?: Date;
}

const Periode = (props: PeriodeProps) => {
  const { errors, setError, clearError } = useFormContext();
  const perId = 'periode_' + props.index;

  let min = props.min ?? dayjs('1970-01-01').toDate();
  let max = props.max ?? dayjs(new Date()).add(1, 'year').toDate();

  const validatePeriode = (selectedDates): boolean => {
    const errbox = document.querySelector('.' + perId)!;
    const msg = selectedDates.length < 2 ? 'Perioden må ha to gyldige datoer' : '';
    if (msg !== '') {
      errbox.classList.remove('tom');
      setError(perId, msg);
      return false;
    } else {
      errbox.classList.add('tom');
      clearError([perId, 'backend']);
      return true;
    }
  };

  return (
    <div className="inputelement">
      <label htmlFor={perId} className="fom skjemaelement__label">
        <Normaltekst tag="span">
          Fra og med første, til og med siste fraværsdag
        </Normaltekst>
      </label>
      <Controller
        as={Flatpickr}
        rules={{
          pattern: { value: /\d/, message: 'Feil datoformat' }
        }}
        id={perId}
        name={perId}
        className='skjemaelement__input input--m'
        placeholder='dd.mm.yyyy til dd.mm.yyyy'
        options={{
          minDate: min,
          maxDate: max,
          mode: 'range',
          enableTime: false,
          dateFormat: 'Y-m-d',
          altInput: true,
          altFormat: 'Y-m-d',
          locale: Norwegian,
          allowInput: true,
          clickOpens: true,
          onClose: (selectedDates) => validatePeriode(selectedDates)
        }}
      />

      <Normaltekst tag='div' role='alert' aria-live='assertive'
        className={'skjemaelement__feilmelding tom periode_' + props.index}
      >
        <Vis hvis={errors[perId]}>
          <span>{errors[perId] && errors[perId].type}</span>
        </Vis>
      </Normaltekst>
    </div>
  );
};

export default Periode;
