import React, {useState} from "react";
import {Knapp} from "nav-frontend-knapper";
import ModalWrapper from "nav-frontend-modal";
import {Normaltekst, Systemtittel} from "nav-frontend-typografi";
import {useAppStore} from "../../data/store/AppStore";
import {IsValid, Validering} from "../validering/Validering";
import {ByggValideringsFeil} from "./ByggValideringsFeil";

export const BekreftKnapp = (onSubmit: any) => {
    const {ansatte, setAnsatte, feil, setFeil } = useAppStore();
    const [open, setOpen] = useState<boolean>(false);
    const handleOpen = (evt) => {
      evt.preventDefault()
      const validerteAnsatte = Validering(ansatte)
      setFeil(ByggValideringsFeil(validerteAnsatte))
      setAnsatte([...validerteAnsatte]);
      setOpen(feil.length === 0);
    }
    const handleClose = (evt) => {
        setOpen(false)
    }
    const handleSubmit = (evt) => {
        setOpen(false)
        onSubmit(evt)
    }
    console.log("BekreftKnapp");
    return (
        <>
            <Knapp onClick={handleOpen}>Send søknad om refusjon</Knapp>
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
                    <Knapp type="hoved" onClick={handleSubmit}>Ok</Knapp>
                    <span style={{margin: '2rem 2.5rem'}}></span>
                    <Knapp type="standard" onClick={handleClose}>Avbryt</Knapp>
                </div>
            </ModalWrapper>
        </>
    )
}
