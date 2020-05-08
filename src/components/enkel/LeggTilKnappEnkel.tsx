import React from 'react';
import { useAppStore } from '../../data/store/AppStore';
import { byggPeriode } from '../../data/types/sporenstreksTypes';
import Lenke from 'nav-frontend-lenker';

const LeggTilKnappEnkel = () => {
  const { perioder, setPerioder } = useAppStore();
  const onClick = (e: React.FormEvent) => {
    perioder.push(byggPeriode())
    setPerioder([...perioder]);
    e.preventDefault();
  }
  return (<Lenke href={''} onClick={onClick}>+ Legg til periode</Lenke>)
}

export default LeggTilKnappEnkel;
