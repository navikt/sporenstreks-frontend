import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import Redirecter from './components/Redirecter';
import 'bootstrap/dist/css/bootstrap.min.css';
import Sykepenger from './components/Sykepenger';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Router>
      <Switch>
        <Route exact path="/nettrefusjon/" component={<Sykepenger />} />
        <Route exact path="/" component={<Redirecter />} />
        {/*<Route render={() => <404/>}/> // Todo: 404 fallback */}
      </Switch>
    </Router>
  </I18nextProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
