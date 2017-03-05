import path from 'path';
import Express from 'express';
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router';
import { renderToString } from 'react-dom/server';
import createReducer from './reducers';
import App from './app/containers/Home';

const app = Express();
const port = 3000;

function renderFullPage(html, preloadedState) {
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
        <script src="bundle.js"></script>
      </body>
    </html>  
  `;
}

function handleRender(req, res) {
  const appReducer = createReducer();
  // create a new redux store instance
  const store = createStore(appReducer);

  const html = renderToString(
    <Provider store={store}>
      <StaticRouter location="/" context={{}}>
        <App />
      </StaticRouter>
    </Provider>
  );

  const preloadedState = store.getState();
  res.send(renderFullPage(html, preloadedState));
}

app.use(handleRender);
app.listen(port);
