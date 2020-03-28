import React, { useState } from 'react';
import Flatpickr from 'react-flatpickr';
import Vis from './Vis';
import { Norwegian } from 'flatpickr/dist/l10n/no.js';
import { Input } from 'nav-frontend-skjema';
import { Normaltekst } from 'nav-frontend-typografi';
import NumberFormat from 'react-number-format';
import dayjs from 'dayjs';
import FeilEnkeltfelt from './feilvisning/FeilEnkeltfelt';
import { ErrorObject, ErrorType } from '../data/types/sporenstreksTypes';
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
  const [ amountInput, setAmountInput ] = useState<string>('');
  const { t } = useTranslation();

  let min = props.min ?? dayjs('1970-01-01').toDate();
  let max = props.max ?? dayjs(new Date()).add(1, 'year').toDate();

  const findError = (felt: string): ErrorObject => {
    const err = errors.filter(feil => feil.fieldName === felt)[0];
    return err ?? { fieldName: felt, errorType: ErrorType.UNKNOWN, errorMessage: '' };
  };

  const validatePeriode = (value: string) => {
    value = value.replace(/-/g, '');
    const res: any = value;
    const feil: ErrorObject = findError('fnr');
    feil.errorMessage = res.status === 'invalid' ? 'Ugyldig fødsels- eller D-nummer' : '';
    errors.push(feil);
    setErrors(errors);
  };

  const validateAntall = (value: string) => {
    value = value.replace(/-/g, '');
    const res: any = value;
    const feil: ErrorObject = findError('fnr');
    feil.errorMessage = res.status === 'invalid' ? 'Ugyldig fødsels- eller D-nummer' : '';
    errors.push(feil);
    setErrors(errors);
  };

  const validateBeloep = (value: string) => {
    const field = 'beloep_' + props.index;
    value = value
      .replace(/\s/g, '')
      .replace(',', '.');
    const numval = Number(value);

    let feil: ErrorObject = findError(field);
    if (!feil) {
      feil = {
        fieldName: field,
        errorType: ErrorType.UNKNOWN,
        errorMessage: '',
      }
    }

    if (numval <= 0) {
      feil.errorType = ErrorType.TOOLOWAMOUNT;
      feil.errorMessage = t(Keys.TOOLOWAMOUNT);
    } else if (numval > perioder![props.index].antallDagerMedRefusjon * 260) {
      feil.errorType = ErrorType.TOOHIGHAMOUNT;
      feil.errorMessage = t(Keys.TOOHIGHAMOUNT)
    }
    errors.push(feil);
    setErrors(errors);
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
          options={{
            minDate: min,
            maxDate: max,
            mode: 'range',
            enableTime: false,
            dateFormat: 'F j, Y',
            altInput: true,
            altFormat: 'd.m.Y',
            locale: Norwegian,
            allowInput: true
          }}
        />
        <FeilEnkeltfelt feltnavn={'periode_' + props.index} />
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
        />
        <FeilEnkeltfelt feltnavn={'antall_' + props.index} />
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
        <FeilEnkeltfelt feltnavn={'beloep_' + props.index} />
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
