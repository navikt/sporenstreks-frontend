import React from 'react';
import {AlertStripeInfo} from 'nav-frontend-alertstriper';
import {Innholdstittel, Normaltekst} from 'nav-frontend-typografi';
import Panel from 'nav-frontend-paneler';
import {Link} from 'react-router-dom';
import './Kvittering.less';
import Lenke from "nav-frontend-lenker";
import {useAppStore} from "../data/store/AppStore";

const KvitteringBulk = () => {
  const { ansatte } = useAppStore();
    return (
        <div className="kvittering">
            <div className="limit">
                <Panel>
                    <div>
                        <Innholdstittel>Søknaden er mottatt.</Innholdstittel>
                    </div>
                  <div>
                    <Normaltekst>Referansenummer:
                      {ansatte.map(a => {
                      return (<li>{a.referenceNumber}</li>)
                    })}</Normaltekst>
                  </div>
                    <div>
                        <Normaltekst>
                            Du trenger referansenummeret hvis du kontakter oss om saken.
                            Ha i tilfelle også den ansattes fødselsnummer klart.
                            <br/><br/>
                            <Lenke
                                href="https://www.nav.no/no/bedrift/tjenester-og-skjemaer/aa-registeret-og-a-meldingen/relatert-informasjon/bankkontonummer-refusjoner-fra-nav-til-arbeidsgiver">
                                Har du ikke registrert kontonummer hos oss, må du gjøre det snarest.</Lenke>
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
