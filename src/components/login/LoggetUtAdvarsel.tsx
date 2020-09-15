import React, { useState } from 'react';
import ModalWrapper from 'nav-frontend-modal';
import { AlertStripeFeil } from 'nav-frontend-alertstriper';
import { Innholdstittel } from 'nav-frontend-typografi';
import env from '../felles/environment';
import InternLenke from '../felles/InternLenke';
import { useAppStore } from '../../context/AppStoreContext';

const LoggetUtAdvarsel = () => {
  const [ isOpen, setOpen ] = useState(true);
  const { tokenExpired, setTokenExpired } = useAppStore();

  const loginServiceUrlAfterRedirect = `${env.loginServiceUrl}?refresh=true`;

  const handleCloseModal = () => {
    setOpen(false);
    setTokenExpired(false);
  }

  if (!isOpen || !tokenExpired){
    return null;
  }


  return (
    <ModalWrapper
      isOpen={true}
      onRequestClose={() => handleCloseModal()}
      closeButton={false}
      className={'logget-ut-advarsel'}
      contentLabel=""
      shouldCloseOnOverlayClick={false}
    >
      <AlertStripeFeil className="logget-ut-advarsel__innhold">
        <Innholdstittel>Du er blitt logget ut, følg instruksjonene for ikke å miste data</Innholdstittel>
        <ul>
          <li>Ikke lukk dette vinduet</li>
          <li>
            <a href={loginServiceUrlAfterRedirect} rel="noopener noreferrer" target="_blank">
              Åpne ID-Porten (innlogging) i nytt vindu ved å klikke på denne lenken.
            </a>
          </li>
          <li>Logg inn på nytt i ID-porten.</li>
          <li>Returner til dette vinduet.</li>
          <li>Lukk denne meldingen og klikk igjen på knappen “Send søknad om refusjon”</li>
        </ul>
        <InternLenke onClick={() => handleCloseModal()}>Jeg har logget inn på nytt - lukk dette vinduet</InternLenke>
      </AlertStripeFeil>
    </ModalWrapper>
  )
}

export default LoggetUtAdvarsel
