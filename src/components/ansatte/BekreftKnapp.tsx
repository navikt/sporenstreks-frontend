import React, {useState} from "react";
import {Knapp} from "nav-frontend-knapper";
import ModalWrapper from "nav-frontend-modal";
import {Normaltekst, Systemtittel} from "nav-frontend-typografi";
import {useAppStore} from "../../data/store/AppStore";

export const BekreftKnapp = () => {
    const [open, setOpen] = useState<boolean>(false);
    const {feil, setFeil} = useAppStore();
    const handleOpen = (evt) => {
        if (feil.length > 0){
            evt.preventDefault()
            setOpen(false)
        }
    }
    const handleClose = (evt) => {
        setOpen(false)
    }
    const handleSubmit = (evt) => {
        setOpen(false)
    }
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
