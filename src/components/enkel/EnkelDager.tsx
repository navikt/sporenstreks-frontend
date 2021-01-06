import React from 'react';
import { useFormContext } from 'react-hook-form';
import DagerInput from '../dager/DagerInput';

interface EnkelDagerProps {
  index: number;
}

const EnkelDager = (props: EnkelDagerProps) => {
  const { errors, setError, clearError, getValues } = useFormContext();
  const componentId = 'dager_' + props.index;
  const onChange = (dager?: number) => {
    if (!dager) {
      setError(componentId, 'Antall dager må fylles ut');
      return false;
    } else {
      clearError([componentId, 'backend']);
      return true;
    }
  };
  return (
    <DagerInput
      id={componentId}
      feilmelding={errors[componentId] && errors[componentId].type}
      antallDagerMedRefusjon={getValues(componentId)}
      handleChange={onChange}
    />
  );
};

export default EnkelDager;
