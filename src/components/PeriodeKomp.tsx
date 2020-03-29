import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import Vis from './Vis';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import NumberFormat from 'react-number-format';
import dayjs from 'dayjs';
import { useAppStore } from '../data/store/AppStore';
import { Keys } from '../locales/keys';
import { useTranslation } from 'react-i18next';
import './Flatpickr.less';

interface PeriodeProps {
  index: number;
  min?: Date;
  max?: Date;
  slettPeriode: (e: any, idx: number) => void;
}

const PeriodeKomp = (props: PeriodeProps) => {
  const { errors, setErrors, perioder } = useAppStore();
  const [ antallFeil, setAntallFeil ] = useState<string>('');
  const [ beloepFeil, setBeloepFeil ] = useState<string>('');
  const [ periodeFeil, setPeriodeFeil ] = useState<string>('');
  const [ amountInput, setAmountInput ] = useState<string>('');
  const { t } = useTranslation();

  let min = props.min ?? dayjs('1970-01-01').toDate();
  let max = props.max ?? dayjs(new Date()).add(1, 'year').toDate();

  const validatePeriode = (value: string) => {
    value = value.replace(/-/g, '');
    const res: any = value;
    const msg = res.status === 'invalid' ? 'Feil periode' : '';
    setPeriodeFeil(msg);
  };

  const validateAntall = (value: string) => {
    value = value.replace(/-/g, '');
    const res: any = value;
    const msg = res.status === 'invalid' ? 'Feil antall' : '';
    setAntallFeil(msg);
    setErrors(errors);
  };

  const validateBeloep = (value: string) => {
    value = value
      .replace(/\s/g, '')
      .replace(',', '.');
    const numval = Number(value);

    const errbox = document.querySelector('.beloep_' + props.index)!;

    let msg = '';
    if (value === '') {
      msg = 'Beløp må fylles ut.';
    } else if (numval <= 0) {
      msg = t(Keys.TOOLOWAMOUNT);
    } else if (perioder && numval > perioder![props.index].antallDagerMedRefusjon * 260) {
      msg = t(Keys.TOOHIGHAMOUNT);
    }

    if (msg !== '') {
      errbox.classList.remove('tom');
    } else {
      errbox.classList.add('tom');
    }
    setBeloepFeil(msg);
  };

  return (
    <div className="periode" role="group">
      <div className="skjemaelement">
        <label htmlFor={'periode_' + props.index} className="fom skjemaelement__label">
          <Normaltekst tag="span">
            Fra og med første, til og med siste fraværsdag
          </Normaltekst>
        </label>
        <Flatpickr
          id={'periode_' + props.index}
          name={'periode_' + props.index}
          className="skjemaelement__input input--m"
          placeholder="dd.mm.åååå til dd.mm.åååå"
          onBlur={e => validatePeriode(e.target.value)}
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
            clickOpens: true
          }}
        />
        <div role="alert" aria-live="assertive"
          className="skjemaelement__feilmelding"
        >
          <Normaltekst tag="span">
            {periodeFeil}
          </Normaltekst>
        </div>
      </div>

      <div className="skjemaelement">
        <label htmlFor={'antall_' + props.index} className="dager skjemaelement__label">
          <Normaltekst tag="span">
            Hvor mange dager ønskes refundert?
          </Normaltekst>
        </label>
        <Input
          name={'antall_' + props.index}
          type="number"
          step={1}
          label=""
          bredde="S"
          onBlur={e => validateAntall(e.target.value)}
        />
        <div className="skjemaelement__feilmelding" role="alert" aria-live="assertive">
          <Normaltekst tag="span">
            {antallFeil}
          </Normaltekst>
        </div>
      </div>

      <div className="skjemaelement">
        <label htmlFor={'beloep_' + props.index} className="skjemaelement__label">
          <Normaltekst tag="span">Hvor mye søkes refundert</Normaltekst>
        </label>
        <NumberFormat
          name={'beloep_' + props.index}
          id={'beloep_' + props.index}
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
        <div role="alert" aria-live="assertive"
          className={'skjemaelement__feilmelding tom beloep_' + props.index}
        >
          <Normaltekst tag="span">
            {beloepFeil}
          </Normaltekst>
        </div>
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
