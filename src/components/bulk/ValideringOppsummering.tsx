import { Feiloppsummering } from 'nav-frontend-skjema';
import React from 'react';
import { useAppStore } from '../../data/store/AppStore';

export const ValideringOppsummering = () => {
    const { feil } = useAppStore();
    if (feil.length === 0) {
        return <></>
    }
    return (
        <Feiloppsummering
            tittel="Det er feil i skjemaet"
            feil={feil}
        />
    )
}
