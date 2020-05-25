import React from 'react';
import uuid from 'uuid/v4';

interface erklaringProps {
  value: boolean
  handleSetErklæring: (passedValue: boolean) => void
}

export const Erklaring = ({ value, handleSetErklæring }: erklaringProps) => {
  const componentid = 'erklaring_' + uuid();
  return (
    <>
      <div>
        <div>
          <input
            type="checkbox"
            className="skjemaelement__input checkboks"
            id={componentid}
            aria-invalid="false"
            onChange={() => handleSetErklæring(!value)} />
          <label className="skjemaelement__label" htmlFor={componentid}></label>
        </div>
        <div className="erklaring-label">
          <label htmlFor={componentid}>
            <span className="erklaring-labeloverskrift">Vi erklærer:</span>
          <ul>
              <li>Det er ikke søkt om omsorgspenger i kombinasjon med 100 % sykefravær.</li>
              <li>Arbeidstakeren har ikke vært 100 % permittert i løpet av perioden som det søkes om refusjon for.</li>
              <li>Kravet er basert på arbeidstakerens opplysninger om at arbeidstakeren enten er smittet av
                koronaviruset, mistenkt smittet eller i lovpålagt karantene.</li>
            </ul>
          Vær oppmerksom på at NAV kan foreta kontroller.
        </label>
        </div>
      </div>
    </>
  )
};
