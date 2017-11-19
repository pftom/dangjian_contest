import { all } from 'redux-saga/effects';

import { 
  watchLogin,
} from './user';

import {
  watchGetQuestion,
} from './question';

const rootSaga = function* () {
  yield all([
    watchLogin(),

    watchGetQuestion(),
  ]);
};

export default rootSaga;