import React from 'react';
import { byggAnsatt } from './Ansatt';
import { Normaltekst } from 'nav-frontend-typografi';
import InternLenke from '../felles/InternLenke';
import { useBulk } from '../../context/BulkContext';

export const LeggTilKnapp = () => {
    const { ansatte, setAnsatte } = useBulk();
    const handleAddRad = (e: React.FormEvent) => {
        e.preventDefault();
        ansatte.push(byggAnsatt())
        setAnsatte([...ansatte]);
    }
    if (ansatte.length === 50) {
      return (<Normaltekst>Det er ikke tillatt å sende inn flere enn 50 stk om gangen.</Normaltekst>)
    }
    return (<InternLenke onClick={handleAddRad}>+ Legg til enda en ansatt</InternLenke>)
}
