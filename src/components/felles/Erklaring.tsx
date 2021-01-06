import React from 'react';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';

interface erklaringProps {
  value: boolean;
  handleSetErklæring: (passedValue: boolean) => void;
}

export const Erklaring = ({ value, handleSetErklæring }: erklaringProps) => {
  return (
    <BekreftCheckboksPanel
      label='Vi erklærer:'
      checked={value}
      onChange={() => handleSetErklæring(!value)}
      className='erklaring-wrapper'
    >
      <ul>
        <li>
          Det er ikke søkt om omsorgspenger i kombinasjon med 100 % sykefravær.
        </li>
        <li>
          Arbeidstakeren har ikke vært 100 % permittert i løpet av perioden som
          det søkes om refusjon for.
        </li>
        <li>
          Kravet er basert på arbeidstakerens opplysninger om at arbeidstakeren
          enten er smittet av koronaviruset, mistenkt smittet eller i lovpålagt
          karantene.
        </li>
      </ul>
      Vær oppmerksom på at NAV kan foreta kontroller.
    </BekreftCheckboksPanel>
  );
};
