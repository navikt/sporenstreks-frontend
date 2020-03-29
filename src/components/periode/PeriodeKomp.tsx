import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import Vis from '../Vis';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import { Normaltekst } from 'nav-frontend-typografi';
import NumberFormat from 'react-number-format';
import dayjs from 'dayjs';
import { Keys } from '../../locales/keys';
import { useTranslation } from 'react-i18next';
import './Flatpickr.less';
import { Controller, useFormContext } from 'react-hook-form';

interface PeriodeProps {
  index: number;
  min?: Date;
  max?: Date;
  slettPeriode: (e: any, idx: number) => void;
}

const PeriodeKomp = (props: PeriodeProps) => {
  const { errors, setError } = useFormContext();
  const [ amountInput, setAmountInput ] = useState<string>('');
  const { t } = useTranslation();

  const perId = 'periode_' + props.index;
  const antId = 'antall_' + props.index;
  const belId = 'beloep_' + props.index;

  let min = props.min ?? dayjs('1970-01-01').toDate();
  let max = props.max ?? dayjs(new Date()).add(1, 'year').toDate();

  const validatePeriode = (selectedDates): boolean => {
    const errbox = document.querySelector('.' + perId)!;
    const msg = selectedDates.length < 2 ? 'Perioden må ha to gyldige datoer' : '';
    setError(perId, msg);
    if (msg !== '') {
      errbox.classList.remove('tom');
      return false;
    } else {
      errbox.classList.add('tom');
      return true;
    }
  };

  const validateAntall = (value: string): boolean => {
    const errbox = document.querySelector('.' + antId)!;
    const numval = Number(value);
    const msg = numval <= 0 ? 'Antall må være minst 1' : '';
    setError(antId, msg);
    if (msg !== '') {
      errbox.classList.remove('tom');
      return false;
    } else {
      errbox.classList.add('tom');
      return true;
    }
  };

  const validateBeloep = (value: string): boolean => {
    value = value
      .replace(/\s/g, '')
      .replace(',', '.');
    const numval = Number(value);

    const errbox = document.querySelector('.' + belId)!;

    let msg = '';
    if (value === '') {
      msg = 'Beløp må fylles ut.';
    } else if (numval <= 0) {
      msg = t(Keys.TOOLOWAMOUNT);
    }
    setError(belId, msg);
    if (msg !== '') {
      errbox.classList.remove('tom');
      return false;
    } else {
      errbox.classList.add('tom');
      return true;
    }
  };

  return (
    <div className="periode" role="group">
      <div className="skjemaelement">
        <label htmlFor={perId} className="fom skjemaelement__label">
          <Normaltekst tag="span">
            Fra og med første, til og med siste fraværsdag
          </Normaltekst>
        </label>
        <Controller
          as={Flatpickr}
          rules={{
            pattern: { value: /\d/, message: 'Feil datoformat' }
          }}
          id={perId}
          name={perId}
          className='skjemaelement__input input--m'
          placeholder='dd.mm.yyyy til dd.mm.yyyy'
          options={{
            minDate: min,
            maxDate: max,
            mode: 'range',
            enableTime: false,
            dateFormat: 'F j, Y',
            altInput: true,
            altFormat: 'd.m.Y',
            locale: Norwegian,
            allowInput: true,
            clickOpens: true,
            onClose: (selectedDates) => validatePeriode(selectedDates)
          }}
        />

        <Normaltekst tag='div' role='alert' aria-live='assertive'
          className={'skjemaelement__feilmelding tom periode_' + props.index}
        >
          <Vis hvis={errors[perId]}>
            <span>{errors[perId] && errors[perId].type}</span>
          </Vis>
        </Normaltekst>
      </div>

      <div className="skjemaelement">
        <label htmlFor={antId} className="dager skjemaelement__label">
          <Normaltekst tag="span">
            Hvor mange dager ønskes refundert?
          </Normaltekst>
        </label>
        <Controller
          id={antId}
          name={antId}
          as={
            <NumberFormat
              label=""
              thousandSeparator={' '}
              decimalScale={0}
              fixedDecimalScale={true}
              autoComplete={'off'}
              className={'skjemaelement__input input--s'}
              onBlur={e => validateAntall(e.target.value)}
            />
          }
        />

        <Normaltekst tag='div' role='alert' aria-live='assertive'
          className={'skjemaelement__feilmelding tom antall_' + props.index}
        >
          <Vis hvis={errors[antId]}>
            <span>{errors[antId] && errors[antId].type}</span>
          </Vis>
        </Normaltekst>
      </div>

      <div className="skjemaelement">
        <label htmlFor={belId} className="skjemaelement__label">
          <Normaltekst tag="span">Hvor mye søkes refundert</Normaltekst>
        </label>
        <Controller
          name={belId}
          id={belId}
          as={
            <NumberFormat
              label=""
              value={amountInput}
              thousandSeparator={' '}
              decimalSeparator={','}
              decimalScale={2}
              fixedDecimalScale={true}
              autoComplete={'off'}
              className={'skjemaelement__input input--m'}
              onBlur={e => validateBeloep(e.target.value)}
              onChange={e => setAmountInput(e.target.value)}
            />
          }
        />

        <Normaltekst tag='div' role='alert' aria-live='assertive'
          className={'skjemaelement__feilmelding tom beloep_' + props.index}
        >
          <Vis hvis={errors[belId]}>
            <span>{errors[belId] && errors[belId].type}</span>
          </Vis>
        </Normaltekst>
      </div>

      <Vis hvis={props.index > 0}>
        <button role='link' id={'btn_' + props.index} className='periodeknapp lenke slett'
          onClick={(e) => props.slettPeriode(e, props.index)}
        >
          <Normaltekst tag="span">
            Slett periode
          </Normaltekst>
        </button>
      </Vis>
    </div>
  )
};

export default PeriodeKomp;
