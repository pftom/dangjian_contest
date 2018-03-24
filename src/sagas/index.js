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
  watchGetPromote,
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
    watchGetPromote(),

    watchGetStorageOut(),
    watchClearAllState(),

    watchPushNotification(),
    watchNextContest(),
  ]);
};

export default rootSaga;