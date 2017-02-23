import 'babel-polyfill';

import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';
import createSagaMiddleware from 'redux-saga';
import { fromJS } from 'immutable';

import createReducer from './reducers';
import sagas from './sagas';

const sagaMiddleware = createSagaMiddleware();

const configureStore = (initialState = {}) => {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(browserHistory),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  /* eslint-disable no-underscore-dangle */
  const composeEnhancers = process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;

  const store = createStore(
    createReducer(),
    fromJS(initialState),
    composeEnhancers(...enhancers),
  );

  sagaMiddleware.run(sagas);
  store.asyncReducers = {};

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextReducers = createReducer(store.asyncReducers);
      store.replaceReducer(nextReducers);
    });
  }

  return store;
};

export default configureStore;
