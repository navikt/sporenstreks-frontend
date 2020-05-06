import React from 'react';
import './Kvittering.less';
import InnloggetSide from "./InnloggetSide";
import {MottattSoknad} from "../components/kvittering/MottattSoknad";

const KvitteringExcel = () => {
  return (
    <InnloggetSide>
      <MottattSoknad nySoknadLink="/nettrefusjon/excel"/>
    </InnloggetSide>
  );
};
export default KvitteringExcel;
