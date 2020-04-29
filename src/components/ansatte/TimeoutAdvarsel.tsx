import React, { useState } from "react";
import ModalWrapper from 'nav-frontend-modal';
import {AlertStripeAdvarsel} from 'nav-frontend-alertstriper';
import {Undertittel} from "nav-frontend-typografi";
import './TimeoutAdvarsel.less';
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
      className={"TimeoutAdvarsel"}
      contentLabel=""
    >
      <AlertStripeAdvarsel>
        <Undertittel>Du blir logget ut etter én time</Undertittel>
        <ul>
          <li>Én time etter at du logget inn hos NAV, blir du automatisk logget ut.</li>
          <li>Tjenesten mellomlagrer dessverre ikke det du skriver</li>
        </ul>
        <Lenke className={""} href="#" onClick={() => setOpen(false)}>Lukk</Lenke>
      </AlertStripeAdvarsel>
    </ModalWrapper>
  )
}

export default TimeoutAdvarsel
