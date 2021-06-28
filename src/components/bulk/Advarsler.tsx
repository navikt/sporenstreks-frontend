import { Feilmelding } from 'nav-frontend-typografi';
import React from 'react';

interface AdvarslerProps {
  erklæringAkseptert: boolean;
  harFeil: boolean;
  visFeil: boolean;
}

const Advarsler = ({
  erklæringAkseptert,
  harFeil,
  visFeil
}: AdvarslerProps) => {
  if (!visFeil) {
    return null;
  }

  return (
    <div className='advarsler'>
      {harFeil && (
        <Feilmelding>
          Du må rette feilene før du kan sende inn skjema
        </Feilmelding>
      )}
      {!erklæringAkseptert && (
        <Feilmelding>
          Du må krysse av avkrysningsboksen over send-knappen før du sender inn
          skjema
        </Feilmelding>
      )}
    </div>
  );
};

export default Advarsler;
