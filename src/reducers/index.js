import { combineReducers } from 'redux';

// import react-router reducer
import { routerReducer } from 'react-router-redux';

import user from './user';
import browser from './browser';
import question from './question';

const rootReducer = combineReducers({
  router: routerReducer,
  browser,
  user,
  question,
});

export default rootReducer;