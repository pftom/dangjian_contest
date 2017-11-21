import { all } from 'redux-saga/effects';

import { 
  watchLogin, watchGetToken, watchLogout, watchReady,

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
    watchLogout(),
    watchReady(),

    watchGetQuestion(),
    watchGetOut(),

    watchGetStorageOut(),
    watchClearAllState(),
  ]);
};

export default rootSaga;