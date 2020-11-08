import { createStore, applyMiddleware, compose } from 'redux';
import reducer, {IRootState} from '../shared/reducers';

const defaultMiddlewares = [
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
