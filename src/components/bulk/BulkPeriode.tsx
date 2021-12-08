import React, { useState } from 'react';
import dayjs from 'dayjs';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import './BulkPeriode.less';
import { Label, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { HjelpetekstPeriode } from '../periode/HjelpetekstPeriode';
import { Ansatt, AnsattID } from './Ansatt';
import { useBulk } from '../../context/BulkContext';
import { disabledDates, maxDate, minDate } from '../periode/PeriodeValidator';
import { Column, Row } from 'nav-frontend-grid';
import { validateDato } from './validateDato';

const BulkPeriode = (props: AnsattID) => {
  const perId1 = 'periode_' + props.id + '_fom';
  const perId2 = 'periode_' + props.id + '_tom';
  const { ansatte, setAnsatte } = useBulk();
  const ansatt: Ansatt = ansatte.find(
    (aktuellAnsatt) => aktuellAnsatt.id === props.id
  );
  let errorClass = '';

  const handleCloseFom = (selectedDate: Date) => {
    if (ansatt) {
      ansatt.fom = dayjs(selectedDate).format('YYYY-MM-DD');
      ansatt.periodeError = validateDato(selectedDate);
    }
    setAnsatte([...ansatte]);
  };

  const handleCloseTom = (selectedDate: Date) => {
    if (ansatt) {
      ansatt.tom = dayjs(selectedDate).format('YYYY-MM-DD');
      ansatt.periodeError = validateDato(selectedDate);
    }
    setAnsatte([...ansatte]);
  };

  if (ansatt?.periodeError) {
    errorClass = 'dato-har-feil';
  }

  const formatDate = (value?: Date): string => {
    return value ? dayjs(value).format('DD.MM.YYYY') : '';
  };

  return (
    <div className={`skjemaelement ${errorClass}`}>
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
            className={'skjemaelement__input periode'}
            options={{
              minDate: minDate(),
              maxDate: maxDate(),
              enableTime: false,
              dateFormat: 'd.m.Y',
              altInput: true,
              altFormat: 'd.m.Y',
              locale: Norwegian,
              allowInput: true,
              clickOpens: true,
              formatDate: formatDate,
              onClose: handleCloseFom,
              disable: disabledDates
            }}
          />
          <SkjemaelementFeilmelding>
            {ansatt?.periodeError}
          </SkjemaelementFeilmelding>
        </Column>
        <Column md='2' xs='12' className='enkeltperiode-til-tekst'>
          til
        </Column>
        <Column md='5' xs='12'>
          <Flatpickr
            id={perId2}
            name={perId2}
            placeholder='dd.mm.yyyy'
            className={'skjemaelement__input periode'}
            options={{
              minDate: minDate(),
              maxDate: maxDate(),
              enableTime: false,
              dateFormat: 'd.m.Y',
              altInput: true,
              altFormat: 'd.m.Y',
              locale: Norwegian,
              allowInput: true,
              clickOpens: true,
              formatDate: formatDate,
              onClose: handleCloseTom,
              disable: disabledDates
            }}
          />
          <SkjemaelementFeilmelding>
            {ansatt?.periodeError}
          </SkjemaelementFeilmelding>
        </Column>
      </Row>
    </div>
  );
};

export default BulkPeriode;
