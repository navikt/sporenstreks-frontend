import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Controller, useFormContext } from 'react-hook-form';
import NumberFormat from "react-number-format";
import Vis from '../../Vis';

interface AntallProps {
  index: number;
}

const Antall = (props: AntallProps) => {
  const { errors, setError, clearError } = useFormContext();
  const antId = 'antall_' + props.index;

  const validateAntall = (value: string): boolean => {
    const errbox = document.querySelector('.' + antId)!;
    const numval = Number(value);
    const msg = numval <= 0 ? 'Antall må være minst 1' : '';
    if (msg !== '') {
      errbox.classList.remove('tom');
      setError(antId, msg);
      return false;
    } else {
      errbox.classList.add('tom');
      clearError([ antId, 'backend' ]);
      return true;
    }
  };

  return (
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
  );
};

export default Antall;
