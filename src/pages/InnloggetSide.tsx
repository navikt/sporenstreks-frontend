import {useAppStore} from '../data/store/AppStore';
import {AlertStripeAdvarsel} from 'nav-frontend-alertstriper';
import {Link, useHistory} from 'react-router-dom';
import React from 'react';
import Bedriftsmeny from '@navikt/bedriftsmeny';
import {Organisasjon} from '@navikt/bedriftsmeny/lib/organisasjon';
import {Keys} from '../locales/keys';
import {useTranslation} from 'react-i18next';
import {History} from 'history';
import TimeoutAdvarsel from '../components/ansatte/TimeoutAdvarsel';
import {Column, Container, Row} from 'nav-frontend-grid';
import Lenke from 'nav-frontend-lenker';

interface SideProps {
  children: React.ReactNode,
  className?: string
}

const InnloggetSide = (props: SideProps) => {
  const { arbeidsgivere, setArbeidsgiverId, setFirma } = useAppStore();
  const { t } = useTranslation();
  const history: History = useHistory();
  return (
    <div className={'innloggetside ' + props.className}>
        {arbeidsgivere.length === 0 &&
          <AlertStripeAdvarsel>
            <p>Du har ikke rettigheter til å søke om refusjon for noen bedrifter</p>
            <p>Tildeling av roller foregår i Altinn</p>
            <Link to="/min-side-arbeidsgiver/informasjon-om-tilgangsstyring">
              Les mer om roller og tilganger.
            </Link>
          </AlertStripeAdvarsel>
        }
        {arbeidsgivere.length > 0 &&
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
                    <Lenke href="/min-side-arbeidsgiver/">&lt;&lt; Min side arbeidsgiver</Lenke>
                  </div>
                </Column>
              </Row>
            </Container>

            <TimeoutAdvarsel/>

            <Container className={'innloggetside__innhold'}>
                { props.children }
            </Container>

          </>
        }
    </div>
  )
}

export default InnloggetSide
