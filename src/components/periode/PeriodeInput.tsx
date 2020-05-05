import React from "react";
import {Label, SkjemaelementFeilmelding} from "nav-frontend-skjema";
import { HjelpetekstPeriode } from "../ansatte/HjelpetekstPeriode";
import {useAppStore} from "../../data/store/AppStore";
import dayjs from "dayjs";
import Flatpickr from 'react-flatpickr';
import {Norwegian} from 'flatpickr/dist/l10n/no.js';

interface PeriodeInputProps {
  feilmelding?: string,
  periode?: number,
  handleChange: any
}

export const PeriodeInput = ({periode, feilmelding, handleChange}: PeriodeInputProps) => {
  const {ansatte, setAnsatte} = useAppStore();
  const a = ansatte.find(a => a.id === 5)
  let errorClass = '';
  const handleClose = (selectedDates) => {
    if (a){
      a.fom = dayjs(selectedDates[0]).format("YYYY-MM-DD")
      a.tom = dayjs(selectedDates[1]).format("YYYY-MM-DD")
    }
    setAnsatte([...ansatte]);
  }
  let min = dayjs('1970-01-01').toDate();
  let max = dayjs(new Date()).add(1, 'year').toDate();

  if(a?.periodeError) {
    errorClass = 'dato-har-feil';
  }
  return (
    <div className={`skjemaelement ${errorClass}`}>
    <Label htmlFor={"periode"}>
      <div style={{display: 'flex'}}>
        Periode
        <HjelpetekstPeriode/>
      </div>
    </Label>
    <Flatpickr
      id="periode"
      placeholder='dd.mm.yyyy til dd.mm.yyyy'
      className={"skjemaelement__input periode"}
      options={{
        minDate: min,
        maxDate: max,
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
    <SkjemaelementFeilmelding>{feilmelding}</SkjemaelementFeilmelding>
  </div>
  )
}
