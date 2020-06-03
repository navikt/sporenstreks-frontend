import React, { useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { AlertStripeAdvarsel } from 'nav-frontend-alertstriper';
import { Innholdstittel } from 'nav-frontend-typografi';
import TokenUtloper from '../login/TokenUtloper';
import { useAppStore } from '../../data/store/AppStore';
import InternLenke from '../InternLenke';
import { useLoginExpiry } from '../../context/LoginExpiryContext';

const TimeoutAdvarsel = () => {
  const [isOpen, setOpen] = useState(true);
  const { timeoutAdvarselHarBlittVist, setTimeoutAdvarselHarBlittVist } = useLoginExpiry();

  if (!isOpen || timeoutAdvarselHarBlittVist) {
    return null;
  }

  const handleOKClick  = (evt?: React.FormEvent) => {
    evt?.preventDefault();
    setOpen(false);
    setTimeoutAdvarselHarBlittVist(true);
  }

  return (
    <ModalWrapper
      isOpen={true}
      onRequestClose={() => handleOKClick()}
      closeButton={false}
      className={'timeout-advarsel'}
      contentLabel=""
    >
      <AlertStripeAdvarsel className="timeout-advarsel__innhold">
        <Innholdstittel>Du blir logget ut etter 60 minutter</Innholdstittel>
        <ul>
          <li>Vi anbefaler at du gjør deg ferdig innen timen er gått.</li>
          <li>Blir du logget ut, får du mer informasjon om hva du skal gjøre, slik at du ikke mister det du har skrevet.</li>
          <li><strong>Denne innloggingen utløper kl: <TokenUtloper /></strong></li>
        </ul>
        <InternLenke onClick={(e) => handleOKClick(e)}>Lukk</InternLenke>
      </AlertStripeAdvarsel>
    </ModalWrapper>
  )
}

export default TimeoutAdvarsel
