import {Normaltekst} from "nav-frontend-typografi";
import React from "react";

interface advarslerProps {
  erklæringAkseptert: boolean
  harFeil: boolean
}

const Advarsler = ({erklæringAkseptert, harFeil} : advarslerProps) => {
  return (
    <div className="Advarsler">
      {harFeil &&
      <Normaltekst>Du må rette feilene før du kan sende inn skjema</Normaltekst>
      }
      {!erklæringAkseptert &&
      <Normaltekst>Du må krysse av avkrysningsboksen over send-knappen før du sender inn skjema</Normaltekst>
      }
    </div>
  )
}

export default Advarsler
