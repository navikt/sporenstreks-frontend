import React from 'react';
import { AlertStripeInfo } from 'nav-frontend-alertstriper';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import Lenke from "nav-frontend-lenker";
import { Container, Row } from "nav-frontend-grid";

interface MottattSoknadProps {
  nySoknadLink: string,
}

export const MottattSoknad = ({ nySoknadLink } : MottattSoknadProps) => (
  <Container>
    <Row>
      <Panel>
        <Innholdstittel>Søknaden er mottatt.</Innholdstittel>
      </Panel>
      <Panel>
        <Normaltekst>
          Trenger du å kontakte oss, er det tilstrekkelig å oppgi fødselsnummeret til den ansatte.
        </Normaltekst>
      </Panel>
      <Panel>
        <Normaltekst>
          <Lenke
            href="https://www.nav.no/no/bedrift/tjenester-og-skjemaer/aa-registeret-og-a-meldingen/relatert-informasjon/bankkontonummer-refusjoner-fra-nav-til-arbeidsgiver">
            Har du registrert kontonummer hos NAV?</Lenke>
          <span> Hvis ikke må du gjøre det snarest.</span>
        </Normaltekst>
      </Panel>
      <Panel>
        <AlertStripeInfo>
          Ønsker dere hyppigere utbetalinger enn vanlig? &nbsp;
          <Lenke
            href=" https://www.altinn.no/Pages/ServiceEngine/Start/StartService.aspx?ServiceEditionCode=1&ServiceCode=5546"
            className="lenke ">I Altinn kan dere endre utbetalingsintervallet.</Lenke>
        </AlertStripeInfo>
      </Panel>
      <Panel>
        <Normaltekst>
          <Lenke id="logout"
                 href="https://loginservice.nav.no/slo">Logg ut</Lenke>
        </Normaltekst>
        <Normaltekst>
          <Lenke href={nySoknadLink}>
            Opprett en ny søknad
          </Lenke>
        </Normaltekst>
        <Normaltekst>
          <Lenke href="https://arbeidsgiver.nav.no/min-side-arbeidsgiver/"
                 className="lenke informasjonsboks__lenke">
            Tilbake til Min side - arbeidsgiver
          </Lenke>
        </Normaltekst>
      </Panel>
    </Row>
  </Container>
)
