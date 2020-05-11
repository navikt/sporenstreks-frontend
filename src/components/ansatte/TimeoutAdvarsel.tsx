import React, { useState } from "react";
import ModalWrapper from 'nav-frontend-modal';
import {AlertStripeAdvarsel} from 'nav-frontend-alertstriper';
import { Innholdstittel, Undertittel } from "nav-frontend-typografi";
import './TimeoutAdvarsel.less';
import Lenke from "nav-frontend-lenker";
import TokenUtloper from './TokenUtloper';

const TimeoutAdvarsel = () => {
  const [ isOpen, setOpen ] = useState(true);
  if (!isOpen){
       return (<></>)
  }
  return (
    <ModalWrapper
      isOpen={true}
      onRequestClose={() => setOpen(false)}
      closeButton={false}
      className={"timeout-advarsel"}
      contentLabel=""
    >
      <AlertStripeAdvarsel className="timeout-advarsel__innhold">
        <Innholdstittel>Du blir automatisk logget ut etter én time</Innholdstittel>
        <ul>
          <li><strong>Denne innloggingen utløper kl: <TokenUtloper/></strong></li>
          <li>Tjenesten mellomlagrer dessverre ikke det du skriver.</li>
          <li>Gjør deg ferdig med det du holder på med innen timen er gått.</li>
          <li>Del eventuelt opp det du skal gjøre i mindre bolker, og logg inn på nytt for å bli ferdig med alle.</li>
        </ul>
        <Lenke className={""} href="#" onClick={() => setOpen(false)}>Lukk</Lenke>
      </AlertStripeAdvarsel>
    </ModalWrapper>
  )
}

export default TimeoutAdvarsel
