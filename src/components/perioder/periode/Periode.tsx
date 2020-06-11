import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { Controller, useFormContext } from 'react-hook-form';
import Vis from '../../Vis';
import { PeriodeInput } from '../../periode/PeriodeInput';

interface PeriodeProps {
  index: number;
  min?: Date;
  max?: Date;
}

const Periode = (props: PeriodeProps) => {
  const { errors, setError, clearError } = useFormContext();
  const perId = 'periode_' + props.index;

  const validatePeriode = (fom: string, tom: string): boolean => {
    const errbox = document.querySelector('.' + perId)!;

    const msg = !(fom && tom) ? 'Perioden må ha to gyldige datoer' : '';
    if (msg !== '') {
      errbox.classList.remove('tom');
      setError(perId, msg);
      return false;
    } else {
      errbox.classList.add('tom');
      clearError([perId, 'backend']);
      return true;
    }
  };

  return (
      <>
        <Controller
          as={<PeriodeInput id={perId} handleChange={(fom, tom) => validatePeriode(fom, tom)} />}
          id={perId}
          name={perId}
        />

        <Normaltekst tag='div' role='alert' aria-live='assertive'
          className={'skjemaelement__feilmelding tom periode_' + props.index}
        >
          <Vis hvis={errors[perId]}>
            <span>{errors[perId] && errors[perId].type}</span>
          </Vis>
        </Normaltekst>
      </>
  );
};

export default Periode;
