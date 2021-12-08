import React from 'react';
import { useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';
import { Label, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { HjelpetekstPeriode } from '../periode/HjelpetekstPeriode';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import { disabledDates, Maximum } from '../periode/PeriodeValidator';
import { Column, Row } from 'nav-frontend-grid';

export const formatDate = (value?: Date): string => {
  return value ? dayjs(value).format('DD.MM.YYYY') : '';
};

export const formatPeriod = (fom?: Date, tom?: Date): string => {
  return !(fom && tom) ? '' : formatDate(fom) + ' til ' + formatDate(tom);
};

export const validatePeriod = (dato?: Date): string => {
  return !dato ? 'Feltet må ha gyldig dato' : '';
};

interface EnkelPeriodeProps {
  index: number;
  min?: Date;
  max?: Date;
  onClose: (selectedDate: Date) => void;
}

const EnkelPeriode = (props: EnkelPeriodeProps) => {
  const {
    formState: { errors },
    setError,
    clearErrors
  } = useFormContext();
  const perId1 = 'periode_' + props.index + '_fom';
  const perId2 = 'periode_' + props.index + '_tom';

  const handleCloseFom = (selectedDate: Date) => {
    const errorMessage = validatePeriod(selectedDate);
    if (errorMessage) {
      setError(perId1, { type: errorMessage, message: errorMessage });
    } else {
      clearErrors([perId1, 'backend']);
    }
    props.onClose(selectedDate);
  };

  const handleCloseTom = (selectedDate: Date) => {
    const errorMessage = validatePeriod(selectedDate);
    if (errorMessage) {
      setError(perId2, { type: errorMessage, message: errorMessage });
    } else {
      clearErrors([perId2, 'backend']);
    }
  };

  return (
    <div className={'skjemaelement'}>
      <Row>
        <Label htmlFor={perId1}>
          <div style={{ display: 'flex' }}>
            Hvilken periode var den ansatte borte?
            <HjelpetekstPeriode />
          </div>
        </Label>
      </Row>
      <Row>
        <Column md='5' xs='12'>
          <Flatpickr
            id={perId1}
            name={perId1}
            placeholder='dd.mm.yyyy'
            className={'skjemaelement__input '}
            options={{
              maxDate: Maximum(),
              enableTime: false,
              dateFormat: 'd.m.Y',
              altInput: true,
              altFormat: 'd.m.Y',
              locale: Norwegian,
              allowInput: true,
              clickOpens: true,
              formatDate: formatDate,
              onClose: (selectedDate) => handleCloseFom(selectedDate),
              disable: disabledDates
            }}
          />
          {errors[perId1] && (
            <SkjemaelementFeilmelding>
              {errors[perId1] && errors[perId1].type}
            </SkjemaelementFeilmelding>
          )}
        </Column>
        <Column md='2' xs='12' className='enkeltperiode-til-tekst'>
          til
        </Column>
        <Column md='5' xs='12'>
          <Flatpickr
            id={perId2}
            name={perId2}
            placeholder='dd.mm.yyyy'
            className={'skjemaelement__input '}
            options={{
              maxDate: Maximum(),
              enableTime: false,
              dateFormat: 'd.m.Y',
              altInput: true,
              altFormat: 'd.m.Y',
              locale: Norwegian,
              allowInput: true,
              clickOpens: true,
              formatDate: formatDate,
              onClose: (selectedDate) => handleCloseTom(selectedDate),
              disable: disabledDates
            }}
          />
          {errors[perId1] && (
            <SkjemaelementFeilmelding>
              {errors[perId1] && errors[perId1].type}
            </SkjemaelementFeilmelding>
          )}
        </Column>
      </Row>
    </div>
  );
};

export default EnkelPeriode;
