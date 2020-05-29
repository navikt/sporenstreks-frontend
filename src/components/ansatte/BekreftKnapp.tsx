import React, { useState } from "react";
import { Knapp, Hovedknapp } from "nav-frontend-knapper";
import ModalWrapper from "nav-frontend-modal";
import { Undertittel } from "nav-frontend-typografi";
import { useAppStore } from "../../data/store/AppStore";
import { IsValid, Validering } from "../validering/Validering";
import { ByggValideringsFeil } from "./ByggValideringsFeil";
import './BekreftKnapp.less';

interface bekreftKnappProps {
  onSubmit: any
  erklæringAkseptert: boolean,
  onClick: any
}

export const BekreftKnapp = ({ onSubmit, erklæringAkseptert, onClick }: bekreftKnappProps) => {
  const { ansatte, setAnsatte, setFeil } = useAppStore();
  const { firma } = useAppStore();
  const { arbeidsgiverId } = useAppStore();
  const { loadingStatus } = useAppStore();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (evt) => {
    evt.preventDefault()
    onClick(evt);
    const validerteAnsatte = Validering(ansatte)
    setAnsatte([...validerteAnsatte]);
    if (IsValid(validerteAnsatte)) {
      setOpen(true)
      setFeil([])
    } else {
      setFeil(ByggValideringsFeil(validerteAnsatte))
      setOpen(false);
    }
  };

  const handleSubmit = (evt) => {
    setOpen(false)
    onSubmit(evt)
  };

  return (
    <form onSubmit={e => handleOpen(e)}
      onClick={e => onClick(e)}>
      <Hovedknapp disabled={!erklæringAkseptert} className="bekreft-knapp" type="hoved">Send søknad om refusjon</Hovedknapp>
      <ModalWrapper
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        contentLabel="Send skjema"
      >
        <Undertittel className="sykepenger__modal-tittel">Du søker om refusjon på vegne av:</Undertittel>
        <p className="sykepenger__modal-tekst">{firma}</p>
        <p className="sykepenger__modal-tekst">Organisasjonsnummer: {arbeidsgiverId}</p>
        <Knapp className="sykepenger__modal-btn" onClick={handleSubmit} spinner={loadingStatus === 0}>
          Send søknad om refusjon
        </Knapp>
        <div className="sykepenger__modal-avbrytt lenke" onClick={() => setOpen(false)}>
          Avbryt
        </div>
      </ModalWrapper>
    </form>
  )
};

export default BekreftKnapp;
