import { all } from 'redux-saga/effects';

import { 
  watchLogin, watchGetToken, watchLogout, watchReady, watchGetAllUsers,

} from './user';

import {
  watchGetQuestion, 
  watchGetOut,
  watchGetStorageOut,
  watchClearAllState,
  watchPushNotification,
  watchNextContest,
  
} from './question';

const rootSaga = function* () {
  yield all([
    watchLogin(),
    watchGetToken(),
    watchLogout(),

    watchGetAllUsers(),
    watchReady(),

    watchGetQuestion(),
    watchGetOut(),

    watchGetStorageOut(),
    watchClearAllState(),

    watchPushNotification(),
    watchNextContest(),
  ]);
};

export default rootSaga;