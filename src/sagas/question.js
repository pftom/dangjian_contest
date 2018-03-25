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

  PROMOTE_CONTEST,
  PROMOTE_CONTEST_SUCCESS,
  PROMOTE_CONTEST_ERROR,

  CLEAR_ALL_STATE,
  PUSH_NOTIFICATION_SUCCESS,
  PUSH_NOTIFICATION,
  NEXT_CONTEST,
  NEXT_CONTEST_SUCCESS,
  NEXT_CONTEST_ERROR,

  
} from '../constants/'; 

import { getStatusApi, nodeBase, noticeApi, questionApi, request } from '../config/';

function* getQuestion(action) {
  try {
    const { option, id } = action.payload;
    const { getSingleOption, getMultiplyOption } = questionApi(id);

    const question = yield call(
      request.get, 
      nodeBase + (option === 'single' ? getSingleOption : getMultiplyOption)
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
    const { username } = action.payload;
    yield call(request.get, nodeBase + getStatusApi.getOut, { username });
    // save the out info to the localStorage, ban to do things.

    yield put({ type: GET_OUT_OF_CONTEST_SUCCESS });
  } catch (e) {
    yield put({ type: GET_OUT_OF_CONTEST_ERROR });
  }
}

function* watchGetOut() {
  while (true) {
    const action = yield take(GET_OUT_OF_CONTEST);
    yield call(getOut, action);
  }
}

// promote saga
function* getPromote(action) {
  try {
    // dispatch http for notify server this person is out
    const { username } = action.payload;
    yield call(request.get, nodeBase + getStatusApi.getPromote, { username });
    // save the out info to the localStorage, ban to do things.

    yield put({ type: PROMOTE_CONTEST_SUCCESS });
  } catch (e) {
    yield put({ type: PROMOTE_CONTEST_ERROR });
  }
}

function* watchGetPromote() {
  while (true) {
    const action = yield take(PROMOTE_CONTEST);
    yield call(getPromote, action);
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
  watchClearAllState,
  watchPushNotification,
  watchNextContest,
  watchGetPromote,
}