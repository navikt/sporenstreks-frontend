import React, { useState } from 'react';
import { Column, Row } from 'nav-frontend-grid';
import { Periode } from '../../data/types/sporenstreksTypes';
import { useAppStore } from '../../data/store/AppStore';

export const PerioderRad = (periode: Periode) => {
  return (
    <Row className="periodertabell--rad">
      <Column md="3">{periode.fom?.toDateString()}</Column>
      <Column md="3">{periode.antallDagerMedRefusjon}</Column>
      <Column md="3">{periode.beloep}</Column>
      <Column md="3">
      </Column>
    </Row>
  );
}

export const PerioderTabell = () => {
  const { perioder } = useAppStore();
  return (
    <div className="periodertabell">
      {perioder?.map(p => <PerioderRad key={p.id} fom={p.fom} tom={p.tom} beloep={p.beloep} antallDagerMedRefusjon={p.antallDagerMedRefusjon} />)}
    </div>
  );
}
