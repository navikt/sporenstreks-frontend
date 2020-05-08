import React from 'react';
import {MottattSoknad} from "../components/kvittering/MottattSoknad";
import {Container} from "nav-frontend-grid";
import './KvitteringExcel.less';
const KvitteringExcel = () => {
  return (
    <Container className="kvittering-excel">
      <MottattSoknad nySoknadLink="/nettrefusjon/excel"/>
    </Container>
  );
};
export default KvitteringExcel;
