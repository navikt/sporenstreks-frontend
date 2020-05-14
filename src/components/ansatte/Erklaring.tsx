import React from "react";

interface erklaringProps {
  value: boolean
  handleSetErklæring: (passedValue: boolean) => void
}

export const Erklaring = ({ value, handleSetErklæring }: erklaringProps) => {
  return (
    <>
      <div>
        <div>
          <input
            type="checkbox"
            className="skjemaelement__input checkboks"
            id="068968250-22063-09960-4345-94072797192842"
            aria-invalid="false"
            name="erklaring-checkbox2"
            onChange={() => handleSetErklæring(!value)} />
          <label className="skjemaelement__label" htmlFor="068968250-22063-09960-4345-94072797192842"></label>
        </div>
        <div className="erklaring-label">
          <label htmlFor="068968250-22063-09960-4345-94072797192842">
            <span className="erklaring-labeloverskrift">Vi erklærer:</span>
          <ul>
              <li>Det er ikke søkt om omsorgspenger i kombinasjon med 100 % sykefravær.</li>
              <li>Arbeidstakeren har ikke vært 100 % permittert i løpet av perioden som det søkes om refusjon for.</li>
              <li>Kravet er basert på arbeidstakerens opplysninger om at arbeidstakeren enten er smittet av koronaviruset, mistenkt smittet eller i lovpålagt karantene.</li>
            </ul>
          Vær oppmerksom på at NAV kan foreta kontroller.
        </label>
        </div>
      </div>
    </>
  )
};
