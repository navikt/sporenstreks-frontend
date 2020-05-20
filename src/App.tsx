import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import Sykepenger from './pages/Sykepenger';
import { Switch, Route } from 'react-router-dom';
import Redirecter from './components/Redirecter';
import { ArbeidsgiverProvider } from './components/arbeidsgiver/ArbeidsgiverProvider';
import StoreProvider from './data/store/StoreProvider';
import Kvittering from './pages/Kvittering';
import SykepengerBulk from './pages/SykepengerBulk';
import ExcelOpplasting from './pages/ExcelOpplasting';
import KvitteringExcel from './pages/KvitteringExcel';
import KvitteringBulk from './pages/KvitteringBulk';
import LoginFornyet from './components/loginFornyet/LoginFornyet';

const App = () => {
  return (
    <StoreProvider>
      <ArbeidsgiverProvider>
          <I18nextProvider i18n={i18n}>
            <Switch>
              <Route path="/enkel" render={() => <Sykepenger />} />
              <Route path="/bulk" render={() => <SykepengerBulk />} />
              <Route path="/kvittering" render={() => <Kvittering />} />
              <Route path="/excel" render={() => <ExcelOpplasting />} />
              <Route path="/kvitteringExcel" render={() => <KvitteringExcel />} />
              <Route path="/kvitteringBulk" render={() => <KvitteringBulk />} />
              <Route path="/loginFornyet" render={() => <LoginFornyet />} />
              <Route path="/" render={() => <Redirecter />} />
            </Switch>
          </I18nextProvider>
      </ArbeidsgiverProvider>
    </StoreProvider>
  );
};

export default App;
