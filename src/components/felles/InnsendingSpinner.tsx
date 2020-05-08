import ModalWrapper from 'nav-frontend-modal';
import { Normaltekst, Undertittel } from 'nav-frontend-typografi';
import React from 'react';
import NavFrontendSpinner from 'nav-frontend-spinner';
import Panel from 'nav-frontend-paneler';
import { useAppStore } from '../../data/store/AppStore';

export const InnsendingSpinner = () => {
  const { spinner } = useAppStore();
  return (
    <ModalWrapper
      isOpen={spinner}
      onRequestClose={() => {}}
      closeButton={false}
      contentLabel="Send skjema"
    >
      <Panel>
        <Panel>
          <Undertittel>Vennligst vent...</Undertittel>
          <Normaltekst>Vi sender inn ditt skjema. Dette kan ta litt tid.</Normaltekst>
          <Panel>
            <NavFrontendSpinner />
          </Panel>
        </Panel>
      </Panel>
    </ModalWrapper>
  );
}
