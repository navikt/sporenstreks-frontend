import React from 'react';
import { Innholdstittel, Normaltekst } from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import Lenke from 'nav-frontend-lenker';
import { Row } from 'nav-frontend-grid';
import InnloggetSide from '../../pages/InnloggetSide';
import InternLenke from './InternLenke';

interface MottattSoknadProps {
  nySoknadLink: string;
}

export const MottattSoknad = ({ nySoknadLink }: MottattSoknadProps) => (
  <InnloggetSide>
    <Row>
      <Panel>
        <Innholdstittel>Søknaden er mottatt.</Innholdstittel>
      </Panel>
      <Panel>
        <Normaltekst>
          En kvittering er sendt til meldingsboksen deres i{' '}
          <Lenke href='https://www.altinn.no'>Altinn</Lenke>.
        </Normaltekst>
      </Panel>
      <Panel>
        <Normaltekst>
          Trenger du å kontakte oss, er det tilstrekkelig å oppgi
          fødselsnummeret til den ansatte.
        </Normaltekst>
        <Normaltekst>
          <Lenke href='https://www.nav.no/no/bedrift/tjenester-og-skjemaer/aa-registeret-og-a-meldingen/relatert-informasjon/bankkontonummer-refusjoner-fra-nav-til-arbeidsgiver'>
            Har du registrert kontonummer hos NAV?
          </Lenke>{' '}
          Hvis ikke må du gjøre det snarest.
        </Normaltekst>
      </Panel>
      <Panel>
        <Normaltekst>
          <Lenke id='logout' href='https://loginservice.nav.no/slo'>
            Logg ut
          </Lenke>
        </Normaltekst>
        <Normaltekst>
          <InternLenke to={nySoknadLink}>Opprett en ny søknad</InternLenke>
        </Normaltekst>
        <Normaltekst>
          <Lenke
            href='https://arbeidsgiver.nav.no/min-side-arbeidsgiver/'
            className='informasjonsboks__lenke'
          >
            Tilbake til Min side - arbeidsgiver
          </Lenke>
        </Normaltekst>
      </Panel>
    </Row>
  </InnloggetSide>
);
