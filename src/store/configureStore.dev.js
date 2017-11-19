import { createStore, applyMiddleware, compose } from 'redux';
// the function for persistState in browser
import { persistState } from 'redux-devtools';
// import the saga middleware
import createSagaMiddleware from 'redux-saga';
// import rootSaga for run in this place
import rootSaga from '../sagas/';

// import react-router-redux middleware 
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

import rootReducer from '../reducers';
import DevTools from '../containers/DevTools';
// import logger middleware
import logger from './logger';

// create history and router middleware
export const history = createHistory();

// add middleware to this array
const sagaMiddleware = createSagaMiddleware();

// create middlewares array
const middlewares = [ logger(), sagaMiddleware, routerMiddleware(history) ];

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(...middlewares),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument(),
  // Optional. Lets you write ?debug_session=<key> in address bar to persist debug sessions
  persistState(getDebugSessionKey()),
);

function getDebugSessionKey() {
  // You can write custom logic here!
  // By default we try to read the key from ?debug_session=<key> in the address bar
  const matches = window.location.href.match(/[?&]debug_session=([^&]+)\b/);
  return (matches && matches.length > 0)? matches[1] : null;
}

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  // run this saga middleware 
  sagaMiddleware.run(rootSaga);

  // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
  if (module.hot) {
    module.hot.accept('../reducers', () =>
      store.replaceReducer(require('../reducers')/*.default if you use Babel 6+ */)
    );
  }

  return store;
}