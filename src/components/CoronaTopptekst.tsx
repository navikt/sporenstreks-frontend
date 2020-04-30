import React from "react";
import {Normaltekst, Undertittel} from "nav-frontend-typografi";


export const CoronaTopptekst = () => {
  return (
    <div className="container">
      <Normaltekst>
        Når sykefraværet handler om korona, dekker NAV sykepenger fra dag 4 i de 16 dagene arbeidsgiveren vanligvis skal
        betale.
        Den ansatte må være smittet, mistenkt smittet eller i pålagt karantene. Refusjon kan gis for dager fra og med
        16. mars.
        <span> </span>
        <a className="lenke informasjonsboks__lenke"
           href="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/nyheter/refusjon-av-sykepenger-ved-koronavirus--hva-er-status">
          Se mer informasjon om refusjonsordningen.
        </a>
      </Normaltekst>
      <Undertittel className="sykepenger--header">
        Det kan ikke søkes om refusjon for fravær på grunn av stengte skoler eller barnehager
      </Undertittel>
    </div>
  )
}
