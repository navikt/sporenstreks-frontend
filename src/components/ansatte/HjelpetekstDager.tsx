import Hjelpetekst from "nav-frontend-hjelpetekst";
import React from "react";
import {PopoverOrientering} from "nav-frontend-popover";

export const HjelpetekstDager = () => {
  return (
    <Hjelpetekst type={PopoverOrientering.Under}>
      <li>Her teller du dagene det skulle vært utbetalt lønn fra og med dag 4 i arbeidsgiverperioden. Helger og
        helligdager kan tas med hvis de er en del av den faste arbeidstiden.
      </li>
      <li>Var noen av fraværsdagene før 16. mars, kan du ikke ta dem med.</li>
    </Hjelpetekst>
  )
}
