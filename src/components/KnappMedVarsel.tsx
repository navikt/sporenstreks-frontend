import React from 'react';
import { Hovedknapp } from 'nav-frontend-knapper';

interface KnappMedVarselInterface {
  disabledClick: any,
  disabled: boolean,
  children?: React.ReactNode
}

const KnappMedVarsel = ({ disabledClick, disabled, children }: KnappMedVarselInterface) => {
  return (
    <>
      {(disabled) &&
        <button className={'disabled-button'} onClick={e => disabledClick(e)} onKeyDown={e => disabledClick(e)}>
          <Hovedknapp disabled={disabled} className="knapp filknapp">
            {children}
          </Hovedknapp>
        </button>}
      {(!disabled) &&
        <Hovedknapp disabled={disabled} className="knapp filknapp">
          {children}
        </Hovedknapp>
      }
    </>);
}

export default KnappMedVarsel;
