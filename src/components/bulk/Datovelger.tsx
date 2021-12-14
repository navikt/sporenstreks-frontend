import React from 'react';
import { disabledDates, maxDate, minDate } from '../periode/PeriodeValidator';
import dayjs from 'dayjs';

import { Datepicker } from 'nav-datovelger';

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

  return (
    <Datepicker
      locale={'nb'}
      inputId={perId2}
      value={defaultValue}
      onChange={handleClose}
      inputProps={{
        name: perId2,
        // 'aria-invalid': date !== '' && isISODateString(date) === false,
        placeholder: 'dd.mm.yyyy'
      }}
      calendarSettings={{ showWeekNumbers: true }}
      showYearSelector={true}
      limitations={{
        weekendsNotSelectable: false,
        invalidDateRanges: disabledDates,
        minDate: dayjs(minDate()).format('YYYY-MM-DD'),
        maxDate: dayjs(maxDate()).format('YYYY-MM-DD')
      }}
    />
  );
}
