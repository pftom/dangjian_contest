import { all } from 'redux-saga/effects';

import { 
  watchLogin, watchGetToken, watchLogout, watchReady, watchGetAllUsers,
  watchAddPlayers,
} from './user';

import {
  watchGetQuestion, 
  watchGetOut,
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
    watchAddPlayers(),
    watchReady(),

    watchGetQuestion(),
    watchGetOut(),
    watchGetPromote(),

    watchClearAllState(),

    watchPushNotification(),
    watchNextContest(),
  ]);
};

export default rootSaga;