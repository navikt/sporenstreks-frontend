import React, { useState } from "react";
import { Knapp } from "nav-frontend-knapper";
import ModalWrapper from "nav-frontend-modal";
import { Undertittel } from "nav-frontend-typografi";
import { useAppStore } from "../../data/store/AppStore";
import { IsValid, Validering } from "../validering/Validering";
import { ByggValideringsFeil } from "./ByggValideringsFeil";

interface bekreftKnappProps {
  onSubmit: any
  erklæringAkseptert: boolean
}

export const BekreftKnapp = ({ onSubmit, erklæringAkseptert }: bekreftKnappProps) => {
  const { ansatte, setAnsatte, setFeil } = useAppStore();
  const { firma } = useAppStore();
  const { arbeidsgiverId } = useAppStore();
  const { loadingStatus } = useAppStore();
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (evt) => {
    evt.preventDefault()
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
    <>
      <Knapp disabled={!erklæringAkseptert} type="hoved" onClick={handleOpen}>Send søknad om refusjon</Knapp>
      <ModalWrapper
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        closeButton={true}
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
    </>
  )
};
