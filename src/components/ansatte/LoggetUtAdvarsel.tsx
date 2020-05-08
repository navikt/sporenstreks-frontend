import React, { useState } from "react";
import ModalWrapper from 'nav-frontend-modal';
import {AlertStripeFeil} from 'nav-frontend-alertstriper';
import { Innholdstittel } from "nav-frontend-typografi";
import './LoggetUtAdvarsel.less';
import Lenke from "nav-frontend-lenker";
import { useAppStore } from "../../data/store/AppStore";
import env from '../../util/environment';

const LoggetUtAdvarsel = () => {
  const [ isOpen, setOpen ] = useState(true);
  const { setLoadingStatus } = useAppStore();

  const handleCloseModal = () => {
    setOpen(false);
    setLoadingStatus(200);
  }

  if (!isOpen){
       return null;
  }
  return (
    <ModalWrapper
      isOpen={true}
      onRequestClose={() => setOpen(false)}
      closeButton={false}
      className={"logget-ut-advarsel"}
      contentLabel=""
    >
      <AlertStripeFeil className="logget-ut-advarsel__innhold">
        <Innholdstittel>Du er blitt logget ut, følg instruksjonene for ikke å miste data</Innholdstittel>
        <ul>
          <li>Ikke lukk dette vinduet</li>
          <li><a href={env.loginServiceUrl + '?refresh=true'} target="_blank">Åpne ID-Porten (innlogging) i nytt vindu ved å klikke på denne lenken.</a></li>
          <li>Logg inn på nytt i ID-porten.</li>
          <li>Returner til dette vinduet.</li>
          <li>Lukk denne meldingen og klikk igjen på knappen “Send søknad om refusjon”</li>
        </ul>
        <Lenke className={""} href="#" onClick={() => handleCloseModal()}>Jeg har logget inn på nytt - lukk dette vinduet</Lenke>
      </AlertStripeFeil>
    </ModalWrapper>
  )
}

export default LoggetUtAdvarsel
