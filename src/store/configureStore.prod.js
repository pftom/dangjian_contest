import { createStore, applyMiddleware } from 'redux';
// import the saga middleware
import createSagaMiddleware from 'redux-saga';

// import react-router-redux middleware 
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';

// import rootSaga for run in this place
import rootSaga from '../sagas/';
// import rootReducer to create this store
import rootReducer from '../reducers/';
// add middleware to this array
const sagaMiddleware = createSagaMiddleware();

// create history and router middleware
export const history = createHistory();

// create middlewares array
const middlewares = [ sagaMiddleware, routerMiddleware(history) ];

const enhancer = applyMiddleware(...middlewares);

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState, enhancer);

  // run this saga middleware 
  sagaMiddleware.run(rootSaga);

  return store;
}