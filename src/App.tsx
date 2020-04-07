import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import Sykepenger from './pages/Sykepenger';
import { Switch, Route } from 'react-router-dom';
import Redirecter from './components/Redirecter';
import { DataFetcher } from './data/DataFetcher';
import StoreProvider from './data/store/StoreProvider';
import { Amplitude } from './components/amplitude/AmplitudeProvider';
import Kvittering from './pages/Kvittering';
import ExcelOpplastning from './pages/ExcelOpplastning';
import KvitteringExcel from "./pages/KvitteringExcel";

const App = () => {
  return (
    <StoreProvider>
      <DataFetcher>
        <Amplitude>
          <I18nextProvider i18n={i18n}>
            <Switch>
              <Route exact path="/" render={() => <Sykepenger />} />
              <Route exact path="/kvittering" render={() => <Kvittering />} />
              <Route exact path="/excel" render={() => <ExcelOpplastning />} />
              <Route exact path="/kvitteringExcel" render={() => <KvitteringExcel />} />
              <Route path="/" render={() => <Redirecter />} />
            </Switch>
          </I18nextProvider>
        </Amplitude>
      </DataFetcher>
    </StoreProvider>
  );
};

export default App;
