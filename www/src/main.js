import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';

import configStore from './store';
import App from './app';

const appDiv = document.createElement('div');
document.body.appendChild(appDiv);

const store = configStore({});
const render = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <AppContainer>
        <Component />
      </AppContainer>
    </Provider>,
    appDiv,
  );
};

render(App);

if (module.hot) {
  module.hot.accept('./app', () => {
    render(App);
  });
}
