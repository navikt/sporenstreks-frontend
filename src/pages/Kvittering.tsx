import React from 'react';
import {AlertStripeInfo} from 'nav-frontend-alertstriper';
import {Innholdstittel, Normaltekst} from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import {Link, useLocation} from 'react-router-dom';
import './Kvittering.less';
import Lenke from "nav-frontend-lenker";

const Kvittering = () => {
  const historyState = useLocation().state
    return (
        <div className="kvittering">
            <div className="limit">
                <Panel>
                    <div>
                        <Innholdstittel>Søknaden er mottatt.</Innholdstittel>
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
                        <a href=" https://www.altinn.no/Pages/ServiceEngine/Start/StartService.aspx?ServiceEditionCode=1&ServiceCode=5546" className="lenke ">I Altinn kan dere endre utbetalingsintervallet.</a>
                    </AlertStripeInfo>
                    <div><a id="logout"
                            href="https://loginservice.nav.no/slo" className="lenke informasjonsboks__lenke">Logg ut</a>
                    </div>
                    <Link to={ (historyState && historyState["from"]) ||"/"} className="lenke informasjonsboks__lenke">
                      {(historyState && historyState["message"]) ||"Opprett en ny søknad"}
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

export default Kvittering;
