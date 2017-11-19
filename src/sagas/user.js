// Here saga effect function
import { call, put, take, fork, cancel } from 'redux-saga/effects';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from '../constants/'; 

function* login(action) {
  try {
    const token = '✌️';
    yield localStorage.setItem('token', token);
    yield put({ type: LOGIN_SUCCESS, payload: { token } });
  } catch (e) {
    yield put({ type: LOGIN_ERROR });
  }
}

function* watchLogin() {
  while (true) {
    const action = yield take(LOGIN);
    yield call(login, action);
  }
}

export {
  watchLogin,
}