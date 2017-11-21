// Here saga effect function
import { call, put, take, fork, cancel } from 'redux-saga/effects';

import {
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_TOKEN,
  GET_TOKEN_SUCCESS,
  GET_TOKEN_ERROR,
  LOGOUT,

  READY,
  READY_SUCCESS,
  READY_ERROR,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_ERROR,
  GET_ALL_USERS
} from '../constants/'; 

import { request, base, userApi, nodeBase } from '../config/';

function* login(action) {
  try {
    const { body } = action.payload;
    const res = yield call(request.post, base + userApi.login, body);
    console.log('res', res);
    const { id: token } = res;
    yield localStorage.setItem('token', token);
    yield put({ type: LOGIN_SUCCESS, payload: { token } });
  } catch (e) {
    console.log('e', e);
    yield put({ type: LOGIN_ERROR });
  }
}

function* watchLogin() {
  while (true) {
    const action = yield take(LOGIN);
    yield call(login, action);
  }
}


function* getToken(action) {
  try {
    const token = yield localStorage.getItem('token');
    yield put({ type: GET_TOKEN_SUCCESS, payload: { token } });
  } catch (e) {
    yield put({ type: GET_TOKEN_ERROR });
  }
}

function* watchGetToken() {
  while (true) {
    const action = yield take(GET_TOKEN);
    yield call(getToken, action);
  }
}

function* watchLogout() {
  while (true) {
    yield take(LOGOUT);
    yield localStorage.removeItem('token');
  }
}


function* ready(action) {
  try {
    const { token } = action.payload;
    yield call(request.get, nodeBase + userApi.ready, { user: token });
    yield put({ type: READY_SUCCESS });
  } catch (e) {
    console.log('e', e);
    yield put({ type: READY_ERROR });
  }
}

function* watchReady() {
  while (true) {
    const action = yield take(READY);
    yield call(ready, action);
  }
}


function* getAllUsers(action) {
  try {
    const allUsers = yield call(request.get, nodeBase + userApi.allUsers);
    yield put({ type: GET_ALL_USERS_SUCCESS, payload: { allUsers } });
  } catch (e) {
    console.log('e', e);
    yield put({ type: GET_ALL_USERS_ERROR });
  }
}

function* watchGetAllUsers() {
  while (true) {
    const action = yield take(GET_ALL_USERS);
    yield call(getAllUsers, action);
  }
}

export {
  watchLogin,
  watchGetToken,
  watchLogout,
  watchReady,
  watchGetAllUsers,
}