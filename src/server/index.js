import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import express from 'express';
import cors from 'cors';
import serialize from 'serialize-javascript';

import App from '../common/App';
import { getInitialHomeData, getInitialPdpData } from '../api';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static('public'));

app.get('/', (req, res, next) => {
  getInitialHomeData()
    .then(initialData => {
      const context = { initialData };
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Tokopedia</title>
            <link rel="stylesheet" href="/css/main.css">
            <script src="/bundle.js" defer></script>
          </head>
          <body>
            <script>window.__initialData__=${serialize(initialData)}</script>
            <div id="app">${renderToString(
              <StaticRouter location={req.url} context={context}>
                <App />
              </StaticRouter>
            )}</div>
          </body>
        </html>
      `);
    })
    .catch(next);
});

app.get('/pdp/:id', (req, res, next) => {
  getInitialPdpData(req.params.id)
    .then(initialData => {
      const context = { initialData };
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Tokopedia</title>
            <link rel="stylesheet" href="/css/main.css">
            <script src="/bundle.js" defer></script>
          </head>
          <body>
            <script>window.__initialData__=${serialize(initialData)}</script>
            <div id="app">${renderToString(
              <StaticRouter location={req.url} context={context}>
                <App />
              </StaticRouter>
            )}</div>
          </body>
        </html>
      `);
    })
    .catch(next);
});

app.listen(PORT, () => {
  console.log('Server listening at port:: ', PORT);
});
