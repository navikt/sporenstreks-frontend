import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { rootReducers } from './store/rootState';
import { I18nextProvider } from 'react-i18next';
import i18n from './locales/i18n';
import Redirecter from './components/Redirecter';
import Sykepenger from './components/Sykepenger';
import './app.less';

const composeEnhancers = window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] as typeof compose || compose;
export const store = createStore(rootReducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path="/nettrefusjon/" render={() => <Sykepenger />} />
          <Route exact path="/" render={() => <Redirecter />} />
          {/*<Route render={() => <404/>}/> // Todo: 404 fallback */}
        </Switch>
      </BrowserRouter>
    </Provider>
  </I18nextProvider>,
  document.getElementById('root') as HTMLElement
);

console.log("Miljø", process.env.REACT_APP_BASE_URL);

serviceWorker.unregister();
