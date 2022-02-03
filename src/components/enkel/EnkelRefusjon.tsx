import React from 'react';
import { useFormContext } from 'react-hook-form';
import { RefusjonInput } from '../refusjon/RefusjonInput';
import HjelpetekstRefusjon from '../refusjon/HjelpetekstRefusjon';
import validateRefusjon from '../refusjon/validateRefusjon';

interface EnkelRefusjonProps {
  index: number;
  onChange?: (belop: number) => void;
}

const EnkelRefusjon = (props: EnkelRefusjonProps) => {
  const {
    formState: { errors },
    setValue,
    getValues,
    setError,
    clearErrors
  } = useFormContext();
  const componentId = 'refusjon_' + props.index;

  const handleChange = (refusjon?: number) => {
    setValue(componentId, refusjon);
    const errorMessage = validateRefusjon(refusjon);
    if (errorMessage) {
      setError(componentId, { type: errorMessage, message: errorMessage });
    } else {
      clearErrors([componentId, 'backend']);
    }
    if (props.onChange) {
      props.onChange(refusjon);
    }
  };
  return (
    <RefusjonInput
      id={componentId}
      feilmelding={errors[componentId] && errors[componentId].type}
      beloep={getValues(componentId)}
      handleChange={handleChange}
      label={
        <div style={{ display: 'flex' }}>
          Beløp
          <HjelpetekstRefusjon />
        </div>
      }
    />
  );
};

export default EnkelRefusjon;
