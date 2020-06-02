import React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';
import './KnappMedVarsel.scss';

interface KnappMedVarselInterface {
  disabledClick: any,
  disabled: boolean,
  children?: React.ReactNode
}

const KnappMedVarsel = ({ disabledClick, disabled, children }: KnappMedVarselInterface) => {
  return (
    <>
      {(disabled) &&
        <button className={'knapp-med-varsel-disabled-button'} onClick={e => disabledClick(e)} onKeyDown={e => disabledClick(e)}>
          <Hovedknapp disabled={disabled} className="knapp knapp-med-varsel-action">
            {children}
          </Hovedknapp>
        </button>}
      {(!disabled) &&
        <Hovedknapp disabled={disabled} className="knapp knapp-med-varsel-action">
          {children}
        </Hovedknapp>
      }
    </>);
}

export default KnappMedVarsel;
