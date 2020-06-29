import React from 'react';
import { useFormContext } from 'react-hook-form';
import { RefusjonInput } from '../refusjon/RefusjonInput';
import HjelpetekstRefusjon from '../refusjon/HjelpetekstRefusjon';
import validateRefusjon from '../refusjon/validateRefusjon';

interface EnkelRefusjonProps {
  index: number;
}

const EnkelRefusjon = (props: EnkelRefusjonProps) => {
  const { errors, setValue, getValues, setError, clearError } = useFormContext();
  const componentId = 'refusjon_' + props.index;
  const handleChange = (refusjon?: number) => {
    setValue( componentId, refusjon);
    const errorMessage = validateRefusjon(refusjon);
    if (errorMessage) {
      setError(componentId, errorMessage);
    } else {
      clearError([componentId, 'backend']);
    }
  };
  return (
    <RefusjonInput
      id={componentId}
      feilmelding={errors[componentId] && errors[componentId].type}
      beloep={getValues(componentId)}
      handleChange={handleChange}
      label={<div style={{ display: 'flex' }}>Beløp<HjelpetekstRefusjon /></div>}
    />
  )
};

export default EnkelRefusjon;
