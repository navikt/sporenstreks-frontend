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
        <Undertittel>Vær oppmerksom på følende</Undertittel>
        <p>
          Du vil bli logget ut én time etter at du logget inn. Det du skriver, vil
          dessverre ikke bli lagret slik løsningen er nå.
        </p>
        <Lenke className={""} href="#" onClick={() => setOpen(false)}>Lukk</Lenke>
      </AlertStripeAdvarsel>
    </ModalWrapper>
  )
}

export default TimeoutAdvarsel
