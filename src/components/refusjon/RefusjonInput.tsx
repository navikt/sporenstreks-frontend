import { Input } from 'nav-frontend-skjema';
import React, { useState, ReactNode } from 'react';

interface RefusjonInputProps {
  feilmelding?: string,
  beloep?: number,
  handleChange: any,
  label: ReactNode
}

export const formatNumber = (inputNum?: number): string => {
  if (!inputNum) {
    return '';
  }
  const formatter = new Intl.NumberFormat('nb-NO', { minimumFractionDigits: 2 });
  return formatter.format(inputNum);
}

export const getSpecialCharsOnSides = (x: string, cursorPosition: number) => {
  const specialCharsLeft = x.substring(0, cursorPosition).replace(/[0-9]/g, '').length;
  const specialCharsRight = x.substring(cursorPosition).replace(/[0-9]/g, '').length;
  return [specialCharsLeft, specialCharsRight]
}

export const prepareStringToInt = (strNumber: string): string => {
  if (!strNumber) {
    return '';
  }

  const val = strNumber.replace(/,/g, '.');
  return val.replace(/\s/g, '');
}

export const RefusjonInput = ({ beloep, feilmelding, handleChange, label }: RefusjonInputProps) => {
  let formatertBelop = '';
  if(beloep) {
    formatertBelop= formatNumber(beloep);
  }
  const [localValue, setLocalValue] = useState(formatertBelop);
  let currentVal = 0;



  const handleChangeLocal = (event) => {
    let caret: number = event && event.target ? Number(event.target.selectionStart) : 0;
    const element = event.target
    window.requestAnimationFrame(() => {
      element.selectionStart = caret
      element.selectionEnd = caret
    })

    // -- Stop cursor jumping when formatting number in React
    const specialCharsBefore = getSpecialCharsOnSides(event.target.value, caret);
    let val = prepareStringToInt(event.target.value);

    let x = Number(val);

    if (isNaN(x)) {
      val = prepareStringToInt(localValue);
      x = Number(val);
    }

    let specialCharsAfter;
    if (currentVal !== x) {
      const strCurrentVal = formatNumber(x);
      setLocalValue(strCurrentVal);
      specialCharsAfter = getSpecialCharsOnSides(strCurrentVal, caret);
    } else {
      setLocalValue(val);
      specialCharsAfter = getSpecialCharsOnSides(val, caret);
    }

    if (specialCharsBefore[0] < specialCharsAfter[0]) {
      caret += specialCharsAfter[0] - specialCharsBefore[0];
    } else if (specialCharsBefore[0] > specialCharsAfter[0]) {
      caret -= specialCharsBefore[0] - specialCharsAfter[0];
    } else if (specialCharsBefore[1] > specialCharsAfter[1]) {
      caret -= specialCharsBefore[1] - specialCharsAfter[1];
    }

    handleChange(x);
  }

  return (
    <div>
      <Input
        feil={feilmelding}
        value={localValue}
        bredde={'S'}
        label={label}
        placeholder="Beløp"
        inputMode={'decimal'}
        onChange={handleChangeLocal} />
    </div>
  )
}
