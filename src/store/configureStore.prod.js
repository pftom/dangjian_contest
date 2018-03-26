import { createStore, applyMiddleware } from 'redux';
// import the saga middleware
import createSagaMiddleware from 'redux-saga';

// import react-router-redux middleware
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

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

// redux-persist config
const persistConfig = {
  key: 'root',
  storage,
}

// persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function configureStore(initialState) {
  const store = createStore(persistedReducer, initialState, enhancer);

  const persistor = persistStore(store);

  // run this saga middleware
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
}