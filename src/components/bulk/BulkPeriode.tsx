import React from 'react';
import dayjs from 'dayjs';
import Flatpickr from 'react-flatpickr';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import './BulkPeriode.less';
import { Label, SkjemaelementFeilmelding } from 'nav-frontend-skjema';
import { HjelpetekstPeriode } from '../periode/HjelpetekstPeriode';
import { validatePerioder } from './validatePerioder';
import { AnsattID } from './Ansatt';
import { useBulk } from '../../context/BulkContext';

const BulkPeriode = (props: AnsattID) => {
  const { ansatte, setAnsatte } = useBulk();
  const a = ansatte.find((a) => a.id === props.id);
  let errorClass = '';
  const handleClose = (selectedDates) => {
    if (a) {
      a.fom = dayjs(selectedDates[0]).format('YYYY-MM-DD');
      a.tom = dayjs(selectedDates[1]).format('YYYY-MM-DD');
      a.periodeError = validatePerioder(a.fom, a.tom);
    }
    setAnsatte([...ansatte]);
  };
  let min = dayjs('1970-01-01').toDate();
  let max = dayjs(new Date()).add(1, 'year').toDate();

  if (a?.periodeError) {
    errorClass = 'dato-har-feil';
  }
  const formatDato = (str) => {
    if (!str) {
      return '';
    }
    return dayjs(str).format('DD.MM.YYYY');
  };
  const formatDatoer = () => {
    if (!(a?.fom && a?.tom)) {
      return '';
    }
    return formatDato(a?.fom) + ' til ' + formatDato(a?.tom);
  };
  return (
    <div className={`skjemaelement ${errorClass}`}>
      <Label htmlFor={'periode'}>
        <div style={{ display: 'flex' }}>
          Hvilken periode var den ansatte borte?
          <HjelpetekstPeriode />
        </div>
      </Label>
      <Flatpickr
        id='periode'
        placeholder='dd.mm.yyyy til dd.mm.yyyy'
        className={'skjemaelement__input periode'}
        value={[a?.fom, a?.tom]}
        options={{
          minDate: min,
          maxDate: max,
          mode: 'range',
          enableTime: false,
          defaultDate: [a?.fom, a?.tom],
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
      <SkjemaelementFeilmelding>{a?.periodeError}</SkjemaelementFeilmelding>
    </div>
  );
};

export default BulkPeriode;
