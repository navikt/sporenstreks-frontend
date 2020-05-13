import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import * as serviceWorker from './serviceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import env from './util/environment';

ReactDOM.render(
  <BrowserRouter basename="nettrefusjon">
    <App />
  </BrowserRouter>,
  document.getElementById('root') as HTMLElement
);

console.log(env.baseUrl); // eslint-disable-line
console.log(env.loginServiceUrl); // eslint-disable-line

serviceWorker.unregister();
