import ModalWrapper from 'nav-frontend-modal';
import { Undertittel } from 'nav-frontend-typografi';
import { Knapp } from 'nav-frontend-knapper';
import React from 'react';
import { useAppStore } from '../../data/store/AppStore';

interface BekreftInnsendingProps {
  visible: boolean,
  closeHandler: any,
  submitHandler: any
}

export const BekreftInnsending = (props: BekreftInnsendingProps) => {
  const { arbeidsgiverId } = useAppStore();
  const { firma } = useAppStore();
  return (
    <ModalWrapper
      isOpen={props.visible}
      onRequestClose={() => props.closeHandler}
      closeButton={true}
      contentLabel="Send skjema"
    >
      <Undertittel className="sykepenger__modal-tittel">Du søker om refusjon på vegne av:</Undertittel>
      <p className="sykepenger__modal-tekst">{firma}</p>
      <p className="sykepenger__modal-tekst">Organisasjonsnummer: {arbeidsgiverId}</p>
      <Knapp className="sykepenger__modal-btn" onClick={() => props.submitHandler()}>Send søknad om refusjon</Knapp>
      <div className="sykepenger__modal-avbrytt lenke" onClick={() => props.closeHandler()}>
        Avbryt
      </div>
    </ModalWrapper>
  );
}
