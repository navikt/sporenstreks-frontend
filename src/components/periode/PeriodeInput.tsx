import React, { useState } from 'react';
import { Label, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { HjelpetekstPeriode } from '../ansatte/HjelpetekstPeriode';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import { PeriodeFormatter } from './PeriodeFormatter';
import { Minimum, Maximum, Feilmelding } from './PeriodeValidator';
import { PeriodeConverter } from './PeriodeConverter';

interface PeriodeInputProps {
  feilmelding?: string,
  fom?: Date,
  tom?: Date,
  handleChange: any
}

export const PeriodeInputClassName = (feilmelding?: string) => {
  return 'periodeinput ' + (feilmelding ? 'periodeinput--invalid' : 'periodeinput--valid')
}

export const PeriodeInput = ({ fom, tom, feilmelding, handleChange }: PeriodeInputProps) => {
  const [feilmeldingState, setFeilmeldingState] = useState(feilmelding);
  const handleClose = (selectedDates) => {
    let fomChanged = PeriodeConverter(selectedDates[0])
    let tomChanged = PeriodeConverter(selectedDates[1])
    setFeilmeldingState(Feilmelding(false, selectedDates[0], selectedDates[1]));
    handleChange(fomChanged, tomChanged);
  }
  return (
    <div className={PeriodeInputClassName(feilmelding)}>
      <Label htmlFor={'periode'}>
        <div style={{ display: 'flex' }}>
          Periode
          <HjelpetekstPeriode/>
        </div>
      </Label>
      <Flatpickr
        id="periode"
        placeholder='dd.mm.yyyy til dd.mm.yyyy'
        value={PeriodeFormatter(fom, tom)}
        className={'periodeinput-input'}
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
          onClose: (selectedDates) => handleClose(selectedDates)
        }}
      />
      {feilmeldingState &&
        <SkjemaelementFeilmelding>{feilmeldingState}</SkjemaelementFeilmelding>
      }
    </div>
  )
}
