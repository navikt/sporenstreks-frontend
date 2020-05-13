import React from 'react';
import {AlertStripeInfo} from 'nav-frontend-alertstriper';
import {Innholdstittel, Normaltekst} from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import {Link, useHistory} from 'react-router-dom';
import './Kvittering.scss';
import Lenke from "nav-frontend-lenker";
import Vis from "../components/Vis";
import Bedriftsmeny from "@navikt/bedriftsmeny";
import {Organisasjon} from "@navikt/bedriftsmeny/lib/Organisasjon";
import {Keys} from "../locales/keys";
import {useAppStore} from "../data/store/AppStore";
import {History} from "history";
import {useTranslation} from "react-i18next";

const KvitteringBulk = () => {
  const { arbeidsgivere, setArbeidsgiverId } = useAppStore();
  const { setFirma } = useAppStore();
  const history: History = useHistory();
  const { t } = useTranslation();
    return (
        <div className="kvittering">
          <Vis hvis={arbeidsgivere.length > 0}>
            <Bedriftsmeny
              history={history}
              onOrganisasjonChange={(org: Organisasjon) => {
                setArbeidsgiverId(org.OrganizationNumber);
                setFirma(org.Name);
              }}
              sidetittel={t(Keys.MY_PAGE)}
              organisasjoner={arbeidsgivere}
            />
          </Vis>
            <div className="limit">
                <Panel>
                    <div>
                        <Innholdstittel>Søknaden er mottatt</Innholdstittel>
                    </div>
                  <div>
                  </div>
                    <div style={{margin: "1rem 0rem"}}>
                      <Normaltekst>
                        Trenger du å kontakte oss, er det tilstrekkelig å oppgi fødselsnummeret til den ansatte.
                      </Normaltekst>
                    </div>
                    <div style={{marginBottom: "3rem"}}>
                        <Normaltekst>
                            <Lenke
                                href="https://www.nav.no/no/bedrift/tjenester-og-skjemaer/aa-registeret-og-a-meldingen/relatert-informasjon/bankkontonummer-refusjoner-fra-nav-til-arbeidsgiver">
                                Har du registrert kontonummer hos NAV?</Lenke>
                          <span> Hvis ikke må du gjøre det snarest.</span>
                        </Normaltekst>
                    </div>
                    <AlertStripeInfo>
                        Ønsker dere hyppigere utbetalinger enn vanlig? &nbsp;
                        <a href=" https://www.altinn.no/Pages/ServiceEngine/Start/StartService.aspx?ServiceEditionCode=1&ServiceCode=5546"
                           className="lenke ">
                            I Altinn kan dere endre utbetalingsintervallet.</a>
                    </AlertStripeInfo>
                    <div><a id="logout"
                            href="https://loginservice.nav.no/slo" className="lenke informasjonsboks__lenke">Logg ut</a>
                    </div>
                    <Link to="/bulk" className="lenke informasjonsboks__lenke">
                        Send inn flere
                    </Link>
                    <div><a href="https://arbeidsgiver.nav.no/min-side-arbeidsgiver/"
                            className="lenke informasjonsboks__lenke">
                        Tilbake til Min side - arbeidsgiver
                    </a></div>
                </Panel>
            </div>
        </div>
    );
};

export default KvitteringBulk
