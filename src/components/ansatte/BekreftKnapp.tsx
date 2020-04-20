import React, {useState} from "react";
import {Knapp} from "nav-frontend-knapper";
import ModalWrapper from "nav-frontend-modal";
import {Normaltekst, Systemtittel} from "nav-frontend-typografi";
import {useAppStore} from "../../data/store/AppStore";
import {IsValid, Validering} from "../validering/Validering";
import {ByggValideringsFeil} from "./ByggValideringsFeil";

export const BekreftKnapp = (onSubmit: any) => {
    const { ansatte, setAnsatte, setFeil } = useAppStore();
    const { loadingStatus } = useAppStore();
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = (evt) => {
      evt.preventDefault()
      const validerteAnsatte = Validering(ansatte)
      setAnsatte([...validerteAnsatte]);
      if (IsValid(validerteAnsatte)){
        setOpen(true)
        setFeil([])
      } else {
        setFeil(ByggValideringsFeil(validerteAnsatte))
        setOpen(false);
      }
    }
    const handleClose = (evt) => {
        setOpen(false)
    }
    const handleSubmit = (evt) => {
        setOpen(false)
        onSubmit(evt)
    }
    return (
        <>
            <Knapp type="hoved" onClick={handleOpen}>Send søknad om refusjon</Knapp>
            <ModalWrapper
                isOpen={open}
                onRequestClose={() => handleClose}
                closeButton={false}
                contentLabel="Min modalrute"
            >
                <div style={{padding: '2rem 2.5rem'}}>
                    <div style={{padding: '2rem 2.5rem'}}>
                        <Systemtittel>Bekreft innsending</Systemtittel>
                        <Normaltekst>
                            Er du sikker på at du vil sende inn?
                        </Normaltekst>
                    </div>
                    <Knapp type="hoved" onClick={handleSubmit} spinner={loadingStatus === 0}>Ok</Knapp>
                    <span style={{margin: '2rem 2.5rem'}}></span>
                    <Knapp type="standard" onClick={handleClose}>Avbryt</Knapp>
                </div>
            </ModalWrapper>
        </>
    )
}
