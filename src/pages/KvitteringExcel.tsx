import React from 'react';
import {MottattSoknad} from "../components/kvittering/MottattSoknad";
import {Container} from "nav-frontend-grid";

const KvitteringExcel = () => {
  return (
    // @ts-ignore
    <Container style={{marginTop: "0.5rem"}}>
      <MottattSoknad nySoknadLink="/nettrefusjon/excel"/>
    </Container>
  );
};
export default KvitteringExcel;
