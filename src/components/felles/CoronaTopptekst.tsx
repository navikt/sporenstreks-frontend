import React from 'react';
import { Undertittel, Ingress } from 'nav-frontend-typografi';
import { Column, Row } from 'nav-frontend-grid';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';


export const CoronaTopptekst = () => {
  return (
    <Row>
      <Column>
        <Panel>
          <Ingress>
            Når sykefraværet handler om korona, dekker NAV sykepenger fra dag 4 i de 16 dagene arbeidsgiveren vanligvis
            skal betale.
            Den ansatte må være smittet, mistenkt smittet eller i pålagt karantene. Refusjon kan gis for dager fra og
            med 16. mars.&nbsp;
            <Lenke
               href="https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/nyheter/refusjon-av-sykepenger-ved-koronavirus--hva-er-status">
              Se mer informasjon om refusjonsordningen.
            </Lenke>
          </Ingress>
        </Panel>
        <Panel>
          <Undertittel>
            Det kan ikke søkes om refusjon for fravær på grunn av stengte skoler eller barnehager
          </Undertittel>
        </Panel>
      </Column>
    </Row>
  )
}
