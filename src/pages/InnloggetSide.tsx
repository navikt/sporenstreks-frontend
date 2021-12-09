import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Link, useHistory } from 'react-router-dom';
import React from 'react';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import { Organisasjon } from '@navikt/bedriftsmeny/lib/organisasjon';
import { Keys } from '../locales/keys';
import { useTranslation } from 'react-i18next';
import { History } from 'history';
import { Column, Container, Row } from 'nav-frontend-grid';
import './InnloggetSide.less';
import Lenke from 'nav-frontend-lenker';
import { useArbeidsgiver } from '../context/ArbeidsgiverContext';
import Panel from 'nav-frontend-paneler';

interface SideProps {
  children: React.ReactNode;
  className?: string;
}

const InnloggetSide = (props: SideProps) => {
  const { arbeidsgivere, setArbeidsgiverId, setFirma } = useArbeidsgiver();
  const { t } = useTranslation();
  const history: History = useHistory();
  return (
    <main className={'innloggetside ' + props.className} id='maincontent'>
      {arbeidsgivere.length === 0 && (
        <AlertStripeAdvarsel>
          <p>
            Du har ikke rettigheter til å søke om refusjon for noen bedrifter
          </p>
          <p>Tildeling av roller foregår i Altinn</p>
          <Link to='/min-side-arbeidsgiver/informasjon-om-tilgangsstyring'>
            Les mer om roller og tilganger.
          </Link>
        </AlertStripeAdvarsel>
      )}
      {arbeidsgivere.length > 0 && (
        <>
          <Bedriftsmeny
            history={history}
            onOrganisasjonChange={(org: Organisasjon) => {
              setArbeidsgiverId(org.OrganizationNumber);
              setFirma(org.Name);
            }}
            sidetittel={t(Keys.MY_PAGE)}
            organisasjoner={arbeidsgivere}
          />

          <Container>
            <Row>
              <Column>
                <div className={'innloggetside__minside_arbeidsgiver'}>
                  <Lenke href='/min-side-arbeidsgiver/'>
                    &lt;&lt; Min side arbeidsgiver
                  </Lenke>
                </div>
              </Column>
            </Row>
          </Container>
          <Container className={'innloggetside__innhold'}>
            <Panel>
              <AlertStripeAdvarsel className='avvikling-alert'>
                Denne ordningen gjelder sykefravær som starter etter 1. desember
                2021. Det er også mulig å søke for sykefravær som startet før 1.
                oktober i dette skjemaet.{' '}
                <Lenke
                  href='https://www.nav.no/no/bedrift/oppfolging/sykmeldt-arbeidstaker/nyheter/refusjon-av-sykepenger-ved-koronavirus--hva-er-status'
                  target='_blank'
                >
                  For sykefravær før 1. oktober gjelder følgende regler,
                </Lenke>{' '}
                og kan bare søkes frem til 31. desember.
              </AlertStripeAdvarsel>
            </Panel>
            {props.children}
          </Container>
        </>
      )}
    </main>
  );
};

export default InnloggetSide;
