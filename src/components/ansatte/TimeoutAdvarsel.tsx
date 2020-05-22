import React, {useState} from "react";
import ModalWrapper from 'nav-frontend-modal';
import {AlertStripeAdvarsel} from 'nav-frontend-alertstriper';
import {Innholdstittel} from "nav-frontend-typografi";
import Lenke from "nav-frontend-lenker";
import TokenUtloper from "./TokenUtloper";
import { useAppStore } from "../../data/store/AppStore";

const TimeoutAdvarsel = () => {
  const [isOpen, setOpen] = useState(true);
  const { timeoutAdvarselHarBlittVist, setTimeoutAdvarselHarBlittVist } = useAppStore();

  if (!isOpen || timeoutAdvarselHarBlittVist) {
    return null;
  }

  const handleOKClick  = (evt: React.FormEvent) => {
    evt.preventDefault();
    setOpen(false);
    setTimeoutAdvarselHarBlittVist(true);
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
        <Lenke className={""} href="#" onClick={(e) => handleOKClick(e)}>Lukk</Lenke>
      </AlertStripeAdvarsel>
    </ModalWrapper>
  )
}

export default TimeoutAdvarsel
