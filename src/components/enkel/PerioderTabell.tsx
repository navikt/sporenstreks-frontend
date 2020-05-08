import React from 'react';
import { Column, Row } from 'nav-frontend-grid';
import { useAppStore } from '../../data/store/AppStore';
import PeriodeEnkel from './PeriodeEnkel';
import DagerEnkel from './DagerEnkel';
import RefusjonEnkel from './RefusjonEnkel';
import SlettEnkel from './SlettEnkel';
import LeggTilKnappEnkel from './LeggTilKnappEnkel';

interface PerioderRadProps {
  id: string
}

export const PerioderRad = ({ id }: PerioderRadProps) => {
  return (
    <Row className="periodertabell--rad">
      <Column md="4"><PeriodeEnkel id={id}/></Column>
      <Column md="3"><DagerEnkel id={id}/></Column>
      <Column md="2"><RefusjonEnkel id={id}/></Column>
      <Column md="3"><SlettEnkel id={id}/></Column>
    </Row>
  );
}

export const PerioderTabell = () => {
  const { perioder } = useAppStore();
  return (
    <div className="periodertabell">
      {perioder?.map(p => <PerioderRad key={p.id} id={p.id} />)}
      <LeggTilKnappEnkel />
    </div>
  );
}
