import { all } from 'redux-saga/effects';

import { 
  watchLogin, watchGetToken,

} from './user';

import {
  watchGetQuestion, 
  watchGetOut,
  watchGetStorageOut,
  watchClearAllState,
  
} from './question';

const rootSaga = function* () {
  yield all([
    watchLogin(),
    watchGetToken(),

    watchGetQuestion(),
    watchGetOut(),

    watchGetStorageOut(),
    watchClearAllState(),
  ]);
};

export default rootSaga;