import React from "react";
import { Checkbox } from 'nav-frontend-skjema';

interface erklaringProps {
  value: boolean
  handleSetErklæring: (passedValue: boolean) => void
}

export const Erklaring = ({value, handleSetErklæring}: erklaringProps) => {
  return (
    <Checkbox
      checked={value}
      onChange={() => handleSetErklæring(!value)}
      label="Vi erklærer at det ikke er søkt om omsorgspenger og at arbeidstakeren ikke er permittert.
      Kravet er basert på arbeidstakerens opplysninger om at arbeidstakeren enten er smittet av koronaviruset,
      mistenkt smittet eller i lovpålagt karantene. Vær oppmerksom på at NAV kan foreta kontroller."
    />
  )
};
