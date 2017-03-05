import path from 'path';
import Express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter as Router } from 'react-router';
import { renderToString } from 'react-dom/server';
import createReducer from './reducers';
import Routes from './app/routes';

const app = Express();
const port = 3001;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

function renderFullPage(html, preloadedState) {
  const bundles = process.env.NODE_ENV === 'production' ?
    '<script src="bundle.js"></script>' :
    `
    <script src="http://localhost:3000/bundle.js" type="text/javascript"></script>
    <script src="http://localhost:3000/webpack-dev-server.js" type="text/javascript"></script>    
    `;

  return `
    <!doctype html>
    <html>
      <head>
        <title>My Home Site</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/docs/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(/</g, '\\u003c')}
        </script>
        ${bundles}
      </body>
    </html>  
  `;
}

function handleRender(req, res) {
  const payload = req.body;

  const appReducer = createReducer();
  // create a new redux store instance
  const store = createStore(appReducer);

  // reset initial state
  store.dispatch({
    type: 'REQUEST_BLOGS_SUCCESS',
    payload,
  });

  const html = renderToString(
    <Provider store={store}>
      <Router location="/" context={{}}>
        <Routes />
      </Router>
    </Provider>
  );

  const preloadedState = store.getState();
  res.send(renderFullPage(html, preloadedState));
}

app.post('/ssr', handleRender);
app.listen(port);
