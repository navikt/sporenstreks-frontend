import React, { useState } from "react";
import { Input } from "nav-frontend-skjema";
import { useAppStore } from "../../data/store/AppStore";
import { AnsattID } from "../../data/types/sporenstreksTypes";
import { filterStringToNumbersOnly } from "../../util/filterStringToNumbersOnly";
import { HjelpetekstRefusjon } from "./HjelpetekstRefusjon";
import { validateMaksBeloep } from '../validering/validateMaksBeloep';

export const Refusjon = (props: AnsattID) => {
  const { ansatte, setAnsatte } = useAppStore();
  const a = ansatte.find(a => a.id === props.id);
  const [value, updateValue] = useState('');
  var currentVal = 0;

  const getSpecialCharsOnSides = (x: string, cursorPosition: number) => {
    const specialCharsLeft = x.substring(0, cursorPosition).replace(/[0-9]/g, '').length;
    const specialCharsRight = x.substring(cursorPosition).replace(/[0-9]/g, '').length;
    return [specialCharsLeft, specialCharsRight]
  }

  const cleanNumber = (strNumber: string): string => {
    const val = strNumber.replace(/,/g, ".");
    return val.replace(/\s/g, "");
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {

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
      val = cleanNumber(value);
      x = Number(val);
    }

    let specialCharsAfter;
    if (currentVal != x) {
      var formatter = new Intl.NumberFormat("nb-NO", { minimumFractionDigits: 2 });
      const strCurrentVal = formatter.format(x);
      updateValue(strCurrentVal);
      specialCharsAfter = getSpecialCharsOnSides(strCurrentVal, caret);
    } else {
      updateValue(val);
      specialCharsAfter = getSpecialCharsOnSides(val, caret);
    }

    if (specialCharsBefore[0] < specialCharsAfter[0]) {
      caret += specialCharsAfter[0] - specialCharsBefore[0];
    } else if (specialCharsBefore[0] > specialCharsAfter[0]) {
      caret -= specialCharsBefore[0] - specialCharsAfter[0];
    } else if (specialCharsBefore[1] > specialCharsAfter[1]) {
      caret -= specialCharsBefore[1] - specialCharsAfter[1];
    }

    if (a) {
      const s = filterStringToNumbersOnly(val, 20);
      a.beloep = s.length === 0 ? undefined : parseInt(val);
      a.beloepError = validateMaksBeloep(a.beloep);
    }
    setAnsatte([...ansatte]);
  };

  return (
    <div>
      <Input
        feil={a?.beloepError}
        value={value}
        bredde={"S"}
        label={
          <div style={{ display: 'flex' }}>
            Beløp:
            <HjelpetekstRefusjon />
          </div>}
        placeholder="Beløp"
        inputMode={"decimal"}
        onChange={handleChange} />
    </div>)
};

export default Refusjon;
