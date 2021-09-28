const express = require('express');
const app = express();
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const BASE_PATH = '/nettrefusjon';
const HOME_FOLDER = '../build';
const PORT = process.env.PORT || 8080;

const startServer = () => {
  app.use(BASE_PATH, express.static(HOME_FOLDER));

  app.get('/health/is-alive', (req, res) => {
    res.sendStatus(200);
  });
  app.get('/health/is-ready', (req, res) => {
    res.sendStatus(200);
  });
  app.get('/', (req, res) => {
    res.redirect('/nettrefusjon/');
  });

  app.get(BASE_PATH + '/api/env', (req, res) => {
    res.status(200).send({
      'login-url': process.env.LOGIN_URL,
      'api-url': process.env.API_BACKEND_URL
    });
  });

  app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, HOME_FOLDER, 'index.html'));
  });

  app.use(function (req, res) {
    // eslint-disable-next-line no-console
    console.error('Server: Error 404', req.url);
    res.status(404).send('404 not found');
  });

  app.use(function (err, req, res) {
    // eslint-disable-next-line no-console
    console.error('Server: Error 500', err);
    res.status(500).send('500 Error');
  });

  const pathRewrite = {};
  pathRewrite['^/nettrefusjon/api'] = '/api';

  // API_GATEWAY  = "https://api-gw.oera.no"
  // APIGW_HEADER =
  // apiKey       =

  const proxyConfig = {
    changeOrigin: true,
    target: process.env.API_GATEWAY || 'http://localhost:8080',
    pathRewrite,
    xfwd: true,
  };

  if (process.env.APIGW_HEADER) {
    proxyConfig.headers = {
      'x-nav-apiKey': process.env.APIGW_HEADER,
    };
  }

  console.log("Proxy", proxyConfig)

  var apiKey = require("/apigw/sporenstreks/x-nav-apiKey")
  console.log("apiKey", apiKey)

  app.use(paths.apiPath, proxy(proxyConfig));

  // app.use('/api', createProxyMiddleware({ target: process.env.API_GATEWAY, changeOrigin: true }));

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server: listening on port', PORT);
  });
};

startServer();
