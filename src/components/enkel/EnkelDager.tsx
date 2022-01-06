import React from 'react';
import { useFormContext } from 'react-hook-form';
import DagerInput from '../dager/DagerInput';

interface EnkelDagerProps {
  index: number;
  startdato: Date;
}

const EnkelDager = (props: EnkelDagerProps) => {
  const {
    formState: { errors },
    setError,
    clearErrors,
    getValues
  } = useFormContext();
  const componentId = 'dager_' + props.index;
  const onChange = (dager?: number) => {
    if (dager < 0) {
      setError(componentId, {
        type: 'Antall dager må fylles ut',
        message: 'Antall dager må fylles ut'
      });
      return false;
    } else {
      clearErrors([componentId, 'backend']);
      return true;
    }
  };
  return (
    <DagerInput
      id={componentId}
      feilmelding={errors[componentId] && errors[componentId].type}
      antallDagerMedRefusjon={getValues(componentId)}
      handleChange={onChange}
      startdato={props.startdato}
    />
  );
};

export default EnkelDager;
