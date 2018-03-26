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
  watchEndOfThisQuestion,
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
    watchEndOfThisQuestion(),

    watchClearAllState(),

    watchPushNotification(),
    watchNextContest(),
  ]);
};

export default rootSaga;