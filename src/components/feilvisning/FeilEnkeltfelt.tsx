import React from 'react';
import { Normaltekst } from 'nav-frontend-typografi';
import { useAppStore } from '../../data/store/AppStore';

interface FeilEnkeltfeltProps {
  feltnavn: string;
}

const FeilEnkeltfelt = ({ feltnavn }: FeilEnkeltfeltProps) => {
  const { errors } = useAppStore();

  return (
    <div className="skjemaelement__feilmelding" role="alert" aria-live="assertive">
      {errors.find(error => {
        return (
          <Normaltekst tag="span">
            {error.fieldName === feltnavn}
          </Normaltekst>
        )
      })}
    </div>
  );
};

export default FeilEnkeltfelt;
