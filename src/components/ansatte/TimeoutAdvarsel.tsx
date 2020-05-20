import React, {useState} from "react";
import ModalWrapper from 'nav-frontend-modal';
import {AlertStripeAdvarsel} from 'nav-frontend-alertstriper';
import {Innholdstittel} from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import TokenUtloper from "./TokenUtloper";

const TimeoutAdvarsel = () => {
  const [isOpen, setOpen] = useState(true);
  if (!isOpen) {
    return null;
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
        <Innholdstittel>Du blir logget ut etter 60 minutter</Innholdstittel>
        <ul>
          <li>Vi anbefaler at du gjør deg ferdig innen timen er gått.</li>
          <li>Blir du logget ut, får du mer informasjon om hva du skal gjøre, slik at du ikke mister det du har skrevet.</li>
          <li><strong>Denne innloggingen utløper kl: <TokenUtloper /></strong></li>
        </ul>
        <Lenke className={""} href="#" onClick={() => setOpen(false)}>Lukk</Lenke>
      </AlertStripeAdvarsel>
    </ModalWrapper>
  )
}

export default TimeoutAdvarsel
