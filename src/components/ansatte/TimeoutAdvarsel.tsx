import React, { useState } from "react";
import ModalWrapper from 'nav-frontend-modal';
import {AlertStripeAdvarsel} from 'nav-frontend-alertstriper';
import { Innholdstittel, Undertittel } from "nav-frontend-typografi";
import './TimeoutAdvarsel.scss';
import Lenke from "nav-frontend-lenker";

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
          <li>Én time etter at du logget inn hos NAV, blir du automatisk logget ut.</li>
          <li>Tjenesten mellomlagrer dessverre ikke det du skriver.</li>
          <li>Bli ferdig med skjema senest en time innen du logget inn.</li>
          <li>Er du i tvil - logg ut og inn igjen for å ha lengst mulig tid til utfylling.</li>
        </ul>
        <Lenke className={""} href="#" onClick={() => setOpen(false)}>Lukk</Lenke>
      </AlertStripeAdvarsel>
    </ModalWrapper>
  )
}

export default TimeoutAdvarsel
