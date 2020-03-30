import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './app.less';

ReactDOM.render(
  <BrowserRouter basename="nettrefusjon">
    <App />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);

console.log('Miljø', process.env.REACT_APP_BASE_URL); // eslint-disable-line

serviceWorker.unregister();
