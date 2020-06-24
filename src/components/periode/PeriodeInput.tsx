import React, { useState } from 'react';
import { Label, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { HjelpetekstPeriode } from './HjelpetekstPeriode';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import { PeriodeFormatter } from './PeriodeFormatter';
import { Feilmelding, Maximum } from './PeriodeValidator';
import { PeriodeConverter } from './PeriodeConverter';
import uuid from 'uuid/v4';

interface PeriodeInputProps {
  feilmelding?: string,
  fom?: Date,
  tom?: Date,
  handleChange: any,
  id?: number | string
}

export const PeriodeInputClassName = (feilmelding?: string) => {
  return 'periodeinput ' + (feilmelding ? 'periodeinput--invalid' : 'periodeinput--valid')
}

export const PeriodeInput = ({ fom, tom, feilmelding, handleChange, id }: PeriodeInputProps) => {
  const [feilmeldingState, setFeilmeldingState] = useState(feilmelding);
  const handleClose = (selectedDates) => {
    let fomChanged = PeriodeConverter(selectedDates[0])
    let tomChanged = PeriodeConverter(selectedDates[1])
    setFeilmeldingState(Feilmelding(false, selectedDates[0], selectedDates[1]));
    handleChange(fomChanged, tomChanged);
  }

  const elementId = String(id) || 'periode'.concat(uuid());

  return (
    <div className={PeriodeInputClassName(feilmelding)}>
      <Label htmlFor={elementId}>
        <div style={{ display: 'flex' }}>
          Hvilken periode var den ansatte borte?
          <HjelpetekstPeriode/>
        </div>
      </Label>
      <Flatpickr
        id={elementId}
        name={elementId}
        placeholder='dd.mm.yyyy til dd.mm.yyyy'
        value={PeriodeFormatter(fom, tom)}
        className={'periodeinput-input  skjemaelement__input'}
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
          onClose: (selectedDates) => handleClose(selectedDates)
        }}
      />
      {feilmeldingState &&
        <SkjemaelementFeilmelding>{feilmeldingState}</SkjemaelementFeilmelding>
      }
    </div>
  )
}
