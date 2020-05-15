import { Feilmelding } from "nav-frontend-typografi";
import React from "react";
import './Advarsler.less';

interface advarslerProps {
  erklæringAkseptert: boolean
  harFeil: boolean,
  visFeil: boolean
}

const Advarsler = ({erklæringAkseptert, harFeil, visFeil} : advarslerProps) => {
  if (!visFeil) {
    return null;
  }

  return (
    <div className="advarsler">
      {harFeil &&
      <Feilmelding>Du må rette feilene før du kan sende inn skjema</Feilmelding>
      }
      {!erklæringAkseptert &&
      <Feilmelding>Du må krysse av avkrysningsboksen over send-knappen før du sender inn skjema</Feilmelding>
      }
    </div>
  )
}

export default Advarsler
