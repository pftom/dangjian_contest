// Here saga effect function
import { PUSH_NOTIFICATION_ERROR } from '../constants/browserConstants';
import { call, put, take, fork, cancel } from 'redux-saga/effects';

import {
  GET_QUESTION_SUCCESS,
  GET_QUESTION_ERROR,
  GET_QUESTION,
  GET_OUT_OF_CONTEST,
  GET_OUT_OF_CONTEST_SUCCESS,
  GET_OUT_OF_CONTEST_ERROR,
  GET_STORAGE_OUT,
  GET_STORAGE_OUT_SUCCESS,
  GET_STORAGE_OUT_ERROR,
  CLEAR_ALL_STATE,
  PUSH_NOTIFICATION_SUCCESS,
  PUSH_NOTIFICATION,
  NEXT_CONTEST,
  NEXT_CONTEST_SUCCESS,
  NEXT_CONTEST_ERROR,

  
} from '../constants/'; 

import { base, getOutApi, nodeBase, noticeApi, questionApi, request } from '../config/';

function* getQuestion(action) {
  try {
    const { option, id } = action.payload;
    const { getSingleOption, getMultiplyOption } = questionApi(id);

    const question = yield call(
      request.get, 
      base + (option === 'single' ? getSingleOption : getMultiplyOption)
    );
    
    yield put({ type: GET_QUESTION_SUCCESS, payload: { question } });
  } catch (e) {
    console.log('e', e);
    yield put({ type: GET_QUESTION_ERROR });
  }
}

function* watchGetQuestion() {
  while (true) {
    const action = yield take(GET_QUESTION);
    yield call(getQuestion, action);
  }
}

function* getOut(action) {
  try {
    // dispatch http for notify server this person is out
    const { token, type, remainAudience, playersLength } = action.payload;
    yield call(request.get, nodeBase + getOutApi.getOut, { user: token, type, remainAudience, playersLength });
    // save the out info to the localStorage, ban to do things.
    yield localStorage.setItem(type, true);
    yield put({ type: GET_OUT_OF_CONTEST_SUCCESS });
  } catch (e) {
    console.log('e', e);
    yield put({ type: GET_OUT_OF_CONTEST_ERROR });
  }
}

function* watchGetOut() {
  while (true) {
    const action = yield take(GET_OUT_OF_CONTEST);
    yield call(getOut, action);
  }
}

function* getStorageOut(action) {
  try {

    // save the out info to the localStorage, ban to do things.
    const out = yield localStorage.getItem('out');
    yield put({ type: GET_STORAGE_OUT_SUCCESS, payload: { out } });
  } catch (e) {
    console.log('e', e);
    yield put({ type: GET_STORAGE_OUT_ERROR });
  }
}

function* watchGetStorageOut() {
  while (true) {
    const action = yield take(GET_STORAGE_OUT);
    yield call(getStorageOut, action);
  }
}


function* clearAllState(action) {
  try {

    // clear out state in localStorage
    yield localStorage.removeItem('out');
  } catch (e) {
    console.log('e', e);
  }
}

function* watchClearAllState() {
  while (true) {
    const action = yield take(CLEAR_ALL_STATE);
    yield call(clearAllState, action);
  }
}

// start next question
function* pushNotification(action) {
  try {
    // dispatch http for notify server this person is out
    const { option } = action.payload;
    yield call(request.get, nodeBase + noticeApi.push_notification, { option });
    yield put({ type: PUSH_NOTIFICATION_SUCCESS });
  } catch (e) {
    console.log('e', e);
    yield put({ type: PUSH_NOTIFICATION_ERROR });
  }
}

function* watchPushNotification() {
  while (true) {
    const action = yield take(PUSH_NOTIFICATION);
    yield call(pushNotification, action);
  }
}


// start next contest
function* nextContest(action) {
  try {
    yield call(request.get, nodeBase + noticeApi.next_contest);
    yield put({ type: NEXT_CONTEST_SUCCESS });
  } catch (e) {
    console.log('e', e);
    yield put({ type: NEXT_CONTEST_ERROR });
  }
}

function* watchNextContest() {
  while (true) {
    const action = yield take(NEXT_CONTEST);
    yield call(nextContest, action);
  }
}

export {
  watchGetQuestion,
  watchGetOut,
  watchGetStorageOut,
  watchClearAllState,
  watchPushNotification,
  watchNextContest,
}