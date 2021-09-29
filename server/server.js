const express = require('express');
const app = express();
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const fs = require('fs');

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

  var apiKey = fs.readFileSync('/apigw/sporenstreks/x-nav-apiKey', {
    encoding: 'utf8',
    flag: 'r'
  });
  console.log('apiKey', apiKey);

  const proxyConfig = {
    changeOrigin: true,
    target: process.env.API_GATEWAY || 'https://api-gw-q1.oera.no/sporenstreks',
    // pathRewrite: {
    //   '^/nettrefusjon/api': '/api'
    // },
    // xfwd: true,
    headers: {
      'x-nav-apiKey': apiKey
    }
  };
  console.log('proxyConfig', proxyConfig);
  app.use('/api', createProxyMiddleware(proxyConfig));

  app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, HOME_FOLDER, 'index.html'));
  });

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server: listening on port', PORT);
  });
};

startServer();
