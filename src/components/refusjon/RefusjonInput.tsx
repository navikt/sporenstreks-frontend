import { filterStringToNumbersOnly } from "../../util/filterStringToNumbersOnly";
import { Input } from "nav-frontend-skjema";
import { HjelpetekstRefusjon } from "../ansatte/HjelpetekstRefusjon";
import Eksempel from "../Eksempel";
import React, { useState, useEffect } from "react";
import EksempelBulk from "../ansatte/EksempelBulk";

interface RefusjonInputProps {
  feilmelding?: string,
  beloep?: number,
  handleChange: any
}

export const Convert = (value?: string) => {
  if (!value) {
    return '';
  }
  if (value.trim().length == 0) {
    return '';
  }
  return filterStringToNumbersOnly(value, 20);
}

export const formatNumber = (inputNum?: number): string => {
  if (!inputNum) {
    return '';
  }
  const formatter = new Intl.NumberFormat("nb-NO", { minimumFractionDigits: 2 });
  return formatter.format(inputNum);
}

export const RefusjonInput = ({ beloep, feilmelding, handleChange }: RefusjonInputProps) => {
  const [localValue, setLocalValue] = useState(beloep);
  let currentVal = 0;

  const getSpecialCharsOnSides = (x: string, cursorPosition: number) => {
    const specialCharsLeft = x.substring(0, cursorPosition).replace(/[0-9]/g, '').length;
    const specialCharsRight = x.substring(cursorPosition).replace(/[0-9]/g, '').length;
    return [specialCharsLeft, specialCharsRight]
  }

  const cleanNumber = (strNumber: string): string => {
    const val = strNumber.replace(/,/g, ".");
    return val.replace(/\s/g, "");
  }

  const handleChangeLocal = (event) => {
    let caret: number = event && event.target ? Number(event.target.selectionStart) : 0;
    const element = event.target
    window.requestAnimationFrame(() => {
      element.selectionStart = caret
      element.selectionEnd = caret
    })

    // -- Stop cursor jumping when formatting number in React
    const specialCharsBefore = getSpecialCharsOnSides(event.target.value, caret);
    let val = cleanNumber(event.target.value);

    let x = Number(val);

    if (isNaN(x)) {
      val = cleanNumber(localValue);
      x = Number(val);
    }

    let specialCharsAfter;
    if (currentVal != x) {
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

    handleChange(Convert(localValue));
  }

  return (
    <div>
      <Input
        feil={feilmelding}
        value={localValue}
        bredde={"S"}
        label={
          <div style={{ display: 'flex' }}>
            Beløp
            <EksempelBulk />
          </div>}
        placeholder="Beløp"
        inputMode={"decimal"}
        onChange={handleChangeLocal} />
    </div>
  )
}
