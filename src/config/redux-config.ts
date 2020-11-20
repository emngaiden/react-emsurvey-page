import { createStore, applyMiddleware, compose } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import loggerMiddleware from './middlewares/logger-middleware';
import reducer, {IRootState} from '../shared/reducers';
import promiseMiddleware from 'redux-promise-middleware'
import errorMiddleware from './middlewares/error-middleware';

const defaultMiddlewares = [
  ThunkMiddleware,
  errorMiddleware,
  promiseMiddleware,
  loggerMiddleware
];

const composedMiddlewares = middlewares =>
  process.env.NODE_ENV === 'development'
    ? compose(
        applyMiddleware(...defaultMiddlewares, ...middlewares),
        // DevTools.instrument()
      )
    : compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: IRootState, middlewares = []) => createStore(reducer, initialState, composedMiddlewares(middlewares));

export default initialize;
