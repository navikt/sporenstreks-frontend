import React from 'react';
import Flatpickr from 'react-flatpickr';
import { disabledDates, maxDate, minDate } from '../periode/PeriodeValidator';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import dayjs from 'dayjs';

const formatDate = (value?: Date): string => {
  return value ? dayjs(value).format('DD.MM.YYYY') : '';
};

interface DatovelgerProps {
  id: string | number;
  handleClose: any;
  fomtom: string;
  defaultValue: string;
}

export default function Datovelger({
  id,
  handleClose,
  fomtom,
  defaultValue
}: DatovelgerProps) {
  const perId2 = 'periode_' + id + '_' + fomtom;

  const defaultDisplayValue = dayjs(defaultValue).format('DD.MM.YYYY');

  return (
    <Flatpickr
      id={perId2}
      name={perId2}
      placeholder='dd.mm.yyyy'
      className={'skjemaelement__input periode velger_' + fomtom}
      options={{
        minDate: minDate(),
        maxDate: maxDate(),
        value: defaultDisplayValue,
        defaultValue: defaultDisplayValue,
        enableTime: false,
        dateFormat: 'd.m.Y',
        altInput: true,
        altFormat: 'd.m.Y',
        locale: Norwegian,
        allowInput: true,
        clickOpens: true,
        formatDate: formatDate,
        onClose: handleClose,
        disable: disabledDates
      }}
    />
  );
}
