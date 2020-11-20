import { createStore, applyMiddleware, compose } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import loggerMiddleware from 'src/config/middlewares/logger-middleware';
import reducer, {IRootState} from 'src/shared/reducers';
import promiseMiddleware from 'redux-promise-middleware'
import errorMiddleware from 'src/config/middlewares/error-middleware';

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
