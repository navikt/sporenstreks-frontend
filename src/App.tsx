import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import Sykepenger from './pages/Sykepenger';
import { Switch, Route } from 'react-router-dom';
import Kvittering from './pages/Kvittering';
import SykepengerBulk from './pages/SykepengerBulk';
import ExcelOpplasting from './pages/ExcelOpplasting';
import KvitteringExcel from './pages/KvitteringExcel';
import KvitteringBulk from './pages/KvitteringBulk';
import LoginFornyet from './pages/LoginFornyet';
import { ArbeidsgiverProvider } from './context/ArbeidsgiverContext';
import Redirecter from './components/felles/Redirecter';
import LoginExpiryProvider from './context/LoginExpiryContext';
import AppStoreProvider from './context/AppStoreContext';
import EnkelProvider from './context/EnkelContext';
import { BulkProvider } from './context/BulkContext';

const App = () => {
  return (
    <AppStoreProvider>
      <LoginExpiryProvider>
        <ArbeidsgiverProvider>
            <I18nextProvider i18n={i18n}>

                <Switch>

                  <Route path="/enkel" exact render={() =>
                    <EnkelProvider>
                      <Sykepenger />
                    </EnkelProvider>
                  } />
                  <Route path="/enkel/kvittering" render={() => <Kvittering />} />

                  <Route path="/bulk" exact render={() =>
                    <BulkProvider>
                      <SykepengerBulk />
                    </BulkProvider>
                  } />
                  <Route path="/bulk/kvittering" render={() => <KvitteringBulk />} />

                  <Route path="/excel" exact render={() => <ExcelOpplasting />} />
                  <Route path="/excel/kvittering" exact render={() => <KvitteringExcel />} />

                  <Route path="/loginFornyet" render={() => <LoginFornyet />} />
                  <Route path="/" render={() => <Redirecter />} />
                </Switch>

            </I18nextProvider>
        </ArbeidsgiverProvider>
      </LoginExpiryProvider>
    </AppStoreProvider>
  );
};

export default App;
