import { Input } from 'nav-frontend-skjema';
import React, { ReactNode } from 'react';
import './RefusjonInput.scss';

interface RefusjonInputProps {
  id?: string,
  feilmelding?: string,
  beloep?: number,
  handleChange: any,
  label: ReactNode
}

export const RefusjonInput = ({ beloep, feilmelding, handleChange, label, id }: RefusjonInputProps) => {
  const handleChangeLocal = (event) => {
    handleChange(event.target.value ? parseInt(event.target.value) : undefined);
  }
  const handleKeyPress = (evt) => {
    if (evt.keyCode === 8) {
      handleChange();
      return true;
    }
    const allowed = (evt.key >= 0 && evt.key <= 9);
    if (!allowed){
      evt.preventDefault();
      return false;
    }
    if (evt.target.value.length === 7) {
      evt.preventDefault();
      return false;
    }
  }
  return (
    <div>
      <Input
        id={id}
        name={id}
        feil={feilmelding}
        value={beloep}
        autoComplete='off'
        bredde={'S'}
        label={label}
        placeholder="Kroner"
        type={'number'}
        inputMode={'numeric'}
        className={'RefusjonInput'}
        onKeyPress={handleKeyPress}
        onChange={handleChangeLocal} />
    </div>
  )
}
