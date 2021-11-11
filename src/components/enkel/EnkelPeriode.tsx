import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { Label, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { HjelpetekstPeriode } from '../periode/HjelpetekstPeriode';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import { Maximum } from '../periode/PeriodeValidator';

export const formatDate = (value?: Date): string => {
  return value ? dayjs(value).format('DD.MM.YYYY') : '';
};

export const formatPeriod = (fom?: Date, tom?: Date): string => {
  return !(fom && tom) ? '' : formatDate(fom) + ' til ' + formatDate(tom);
};

export const validatePeriod = (fom?: Date, tom?: Date): string => {
  return !fom || !tom ? 'Perioden må ha to gyldige datoer' : '';
};

interface EnkelPeriodeProps {
  index: number;
  min?: Date;
  max?: Date;
}

const EnkelPeriode = (props: EnkelPeriodeProps) => {
  const {
    formState: { errors },
    setError,
    clearErrors
  } = useFormContext();
  const [fom, setFom] = useState<Date>();
  const [tom, setTom] = useState<Date>();
  const perId = 'periode_' + props.index;

  const handleClose = (selectedDates: Array<Date>) => {
    const errorMessage = validatePeriod(selectedDates[0], selectedDates[1]);
    if (errorMessage) {
      setError(perId, { message: errorMessage });
    } else {
      clearErrors([perId, 'backend']);
    }
    setFom(selectedDates[0]);
    setTom(selectedDates[1]);
  };

  const formatDatoer = () => {
    return formatPeriod(fom, tom);
  };
  return (
    <div className={'skjemaelement'}>
      <Label htmlFor={perId}>
        <div style={{ display: 'flex' }}>
          Hvilken periode var den ansatte borte?
          <HjelpetekstPeriode />
        </div>
      </Label>
      <Flatpickr
        id={perId}
        name={perId}
        placeholder='dd.mm.yyyy til dd.mm.yyyy'
        className={'skjemaelement__input '}
        options={{
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
      {errors[perId] && (
        <SkjemaelementFeilmelding>
          {errors[perId] && errors[perId].type}
        </SkjemaelementFeilmelding>
      )}
    </div>
  );
};

export default EnkelPeriode;
