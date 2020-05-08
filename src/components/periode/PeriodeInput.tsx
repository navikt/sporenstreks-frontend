import React, { useState } from 'react';
import { Label, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { HjelpetekstPeriode } from './HjelpetekstPeriode';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import { PeriodeFormatter } from './PeriodeFormatter';
import { Minimum, Maximum, Feilmelding } from './PeriodeValidator';
import { PeriodeConverter } from './PeriodeConverter';
import './PeriodeInput.less';

interface PeriodeInputProps {
  id?: string,
  label?: string,
  feilmelding?: string,
  fom?: Date,
  tom?: Date,
  handleChange: any
}

export const PeriodeInputClassName = (feilmelding?: string) => {
  return 'periodeinput ' + (feilmelding ? 'periodeinput--invalid' : 'periodeinput--valid')
}

export const PeriodeInput = (props : PeriodeInputProps) => {
  const [feilmeldingState, setFeilmeldingState] = useState(props.feilmelding);
  const handleClose = (selectedDates) => {
    const fom = selectedDates[0];
    const tom = selectedDates[1];
    let fomChanged = PeriodeConverter(fom)
    let tomChanged = PeriodeConverter(tom)
    setFeilmeldingState(Feilmelding(false, fom, tom));
    props.handleChange(fomChanged, tomChanged);
  }
  return (
    <div className={PeriodeInputClassName(props.feilmelding)}>
      <Label htmlFor={'periode'}>
        <div style={{ display: 'flex' }}>
          {props.label || 'Periode'}
          <HjelpetekstPeriode/>
        </div>
      </Label>
      <Flatpickr
        id={props.id}
        placeholder='dd.mm.yyyy til dd.mm.yyyy'
        value={PeriodeFormatter(props.fom, props.tom)}
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
          onValidate: () => {},
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
