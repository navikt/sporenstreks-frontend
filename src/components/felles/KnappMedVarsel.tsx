import React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import './KnappMedVarsel.scss';

interface KnappMedVarselInterface {
  disabledClick: any;
  disabled: boolean;
  children?: React.ReactNode;
}

const KnappMedVarsel = ({
  disabledClick,
  disabled,
  children
}: KnappMedVarselInterface) => {
  return (
    <>
      {disabled ? (
        <Hovedknapp
          className='knapp-med-varsel-disabled-button knapp--disabled'
          onClick={(e) => disabledClick(e)}
        >
          {children}
        </Hovedknapp>
      ) : (
        <Hovedknapp>{children}</Hovedknapp>
      )}
    </>
  );
};

export default KnappMedVarsel;
