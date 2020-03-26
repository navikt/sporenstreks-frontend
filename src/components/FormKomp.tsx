import React from 'react';
import { FormContext, useForm } from 'react-hook-form';

interface FormProps {
  children: React.ReactNode;
}

const FormKomp = ({children}: FormProps) => {
  const methods = useForm();

  const onSubmit = () => {
  };

    return (
    <FormContext {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="sporsmal__form">
        {children}
      </form>
    </FormContext>
  );
};

export default FormKomp;
