import React, { useState } from 'react';
import { Knapp } from 'nav-frontend-knapper';
import ModalWrapper from 'nav-frontend-modal';
import { Undertittel } from 'nav-frontend-typografi';
import { isAnsatteValid, valideringAnsatte } from './ValideringAnsatte';
import { ByggValideringsFeil } from './ByggValideringsFeil';
import './BekreftKnapp.less';
import InternLenke from '../felles/InternLenke';
import KnappMedVarsel from '../felles/KnappMedVarsel';
import { useArbeidsgiver } from '../../context/ArbeidsgiverContext';
import { useBulk } from '../../context/BulkContext';

interface bekreftKnappProps {
  onSubmit: any;
  erklæringAkseptert: boolean;
  onClick: any;
}

export const BekreftKnapp = ({
  onSubmit,
  erklæringAkseptert,
  onClick
}: bekreftKnappProps) => {
  const { ansatte, setAnsatte, setFeil } = useBulk();
  const { firma } = useArbeidsgiver();
  const { arbeidsgiverId } = useArbeidsgiver();
  const { loadingStatus } = useBulk();
  const [open, setOpen] = useState<boolean>(false);

  const handleOpen = (evt) => {
    evt.preventDefault();
    onClick(evt);
    const validerteAnsatte = valideringAnsatte(ansatte);
    setAnsatte([...validerteAnsatte]);
    if (isAnsatteValid(validerteAnsatte)) {
      setOpen(true);
      setFeil([]);
    } else {
      setFeil(ByggValideringsFeil(validerteAnsatte));
      setOpen(false);
    }
  };

  const handleSubmit = (evt) => {
    setOpen(false);
    onSubmit(evt);
  };

  return (
    <form onSubmit={(e) => handleOpen(e)}>
      <KnappMedVarsel disabled={!erklæringAkseptert} disabledClick={onClick}>
        Send søknad om refusjon
      </KnappMedVarsel>
      <ModalWrapper
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        contentLabel='Send skjema'
        closeButton={false}
      >
        <Undertittel className='sykepenger__modal-tittel'>
          Du søker om refusjon på vegne av:
        </Undertittel>
        <p className='sykepenger__modal-tekst'>{firma}</p>
        <p className='sykepenger__modal-tekst'>
          Organisasjonsnummer: {arbeidsgiverId}
        </p>
        <Knapp
          className='sykepenger__modal-btn'
          onClick={handleSubmit}
          spinner={loadingStatus === 0}
        >
          Send søknad om refusjon
        </Knapp>
        <InternLenke
          className='sykepenger__modal-avbrytt'
          onClick={() => setOpen(false)}
        >
          Avbryt
        </InternLenke>
      </ModalWrapper>
    </form>
  );
};

export default BekreftKnapp;
