import React, { useState } from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from 'react-number-format';
import Vis from '../../Vis';
import { Keys } from '../../../locales/keys';
import { useTranslation } from 'react-i18next';

interface BeloepProps {
  index: number;
}

const beloepErrorState = {
  hasError: '',
  noError: 'tom'
}

const Beloep = (props: BeloepProps) => {
  const { errors, setError, clearError } = useFormContext();
  const [ amountInput, setAmountInput ] = useState<string>('');
  const [ beloepClassName, setBelopClassName ] = useState<string>(beloepErrorState.noError);
  const belId = 'beloep_' + props.index;
  const { t } = useTranslation();

  const validateBeloep = (value: string): boolean => {
    value = value
      .replace(/\s/g, '')
      .replace(',', '.');
    const numval = Number(value);
    let msg = '';

    if(value.length === 0) {
      msg = t(Keys.MISSINGAMOUNT);
    }

    if (numval < 0) {
      msg = t(Keys.TOOLOWAMOUNT);
    }
    if (msg !== '') {
      setBelopClassName(beloepErrorState.hasError);
      setError(belId, msg);
      return false;
    } else {
      setBelopClassName(beloepErrorState.noError);
      clearError([belId, 'backend']);
      return true;
    }
  };

  return (
    <div className="skjemaelement">
      <label htmlFor={belId} className="skjemaelement__label">
        <Normaltekst tag="span">Brutto beløp som søkes refundert</Normaltekst>
      </label>
      <Controller
        id={belId}
        name={belId}
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
        className={`skjemaelement__feilmelding ${beloepClassName} beloep_${props.index}`}
        >
        <Vis hvis={errors[belId]}>
          <span>{errors[belId] && errors[belId].type}</span>
        </Vis>
      </Normaltekst>
    </div>
  );
};

export default Beloep;
