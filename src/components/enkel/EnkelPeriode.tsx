import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Vis from '../felles/Vis';
import dayjs from 'dayjs';
import { Label, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { HjelpetekstPeriode } from '../periode/HjelpetekstPeriode';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import { Maximum, Minimum } from '../periode/PeriodeValidator';

interface EnkelPeriodeProps {
  index: number;
  min?: Date;
  max?: Date;
}

const EnkelPeriode = (props: EnkelPeriodeProps) => {
  const { errors, setError, clearError } = useFormContext();
  const [ fom, setFom  ] = useState<Date>();
  const [ tom, setTom  ] = useState<Date>();
  const perId = 'periode_' + props.index;

  let errorClass = '';
  const handleClose = (selectedDates) => {
    if (selectedDates[0] && selectedDates[1]){
      clearError([perId, 'backend']);
    } else {
      setError(perId, 'Perioden må ha to gyldige datoer');
    }
    setFom(selectedDates[0]);
    setTom(selectedDates[1]);
  };

  const formatDato = (str) => {
    if (!str){
      return '';
    }
    return dayjs(str).format('DD.MM.YYYY');
  }
  const formatDatoer = () => {
    if (!(fom && tom)){
      return '';
    }
    return formatDato(fom) + ' til ' + formatDato(tom);
  }
  return (<div className={`skjemaelement ${errorClass}`}>
    <Label htmlFor={'periode'}>
      <div style={{ display: 'flex' }}>
        Hvilken periode var den ansatte borte?
        <HjelpetekstPeriode/>
      </div>
    </Label>
    <Flatpickr
      id={perId}
      name={perId}
      placeholder='dd.mm.yyyy til dd.mm.yyyy'
      className={'skjemaelement__input '}
      options={{
        minDate: Minimum(),
        maxDate: Maximum(),
        mode: 'range',
        enableTime: false,
        dateFormat: 'd.m.Y',
        altInput: true,
        altFormat: 'd.m.Y',
        locale: Norwegian,
        allowInput: true,
        clickOpens: true,
        formatDate: formatDatoer,
        onClose: (selectedDates) => handleClose(selectedDates)
      }}
    />
    <Vis hvis={errors[perId]}>
      <SkjemaelementFeilmelding>{errors[perId] && errors[perId].type}</SkjemaelementFeilmelding>
    </Vis>
  </div>)
};

export default EnkelPeriode;
