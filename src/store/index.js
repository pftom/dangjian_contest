// import store creator for create single state tree
import { createStore, applyMiddleware } from 'redux';
// import root reducer for listen action and modify state tree
import rootReducer from '../Reducers/';
// import logger middleware

// create middleware array
const middlewares = [];

if (process.env.NODE_ENV === 'development') {
  // add the logger in middlewares array
  import('./logger.js')
    .then(({ default: logger }) => middlewares.push(logger()));
}

// create our store with reducers
const store = createStore(
  rootReducer,
  applyMiddleware(...middlewares),
);

// export our single state tree store.
export default store;