import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as createLoggerMiddleware from 'redux-logger';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { stateTransformer } from 'redux-seamless-immutable';

import rootReducer from './rootReducer';
import rootSaga from '../sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const prodMiddlewares = [
  routerMiddleware(browserHistory),
  sagaMiddleware
];

const middlewares = process.env.NODE_ENV === 'development'
  ? [...prodMiddlewares, createLoggerMiddleware({ stateTransformer })]
  : prodMiddlewares;

const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);

export default store;
