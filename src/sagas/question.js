// Here saga effect function
import { PUSH_NOTIFICATION_ERROR } from '../constants/browserConstants';
import { call, put, take, fork, cancel, takeEvery } from 'redux-saga/effects';
import { delay } from 'redux-saga';

import {
  GET_QUESTION_SUCCESS,
  GET_QUESTION_ERROR,
  GET_QUESTION,

  GET_OUT_OF_CONTEST,
  GET_OUT_OF_CONTEST_SUCCESS,
  GET_OUT_OF_CONTEST_ERROR,

  CLEAR_ALL_STATE,
  PUSH_NOTIFICATION_SUCCESS,
  PUSH_NOTIFICATION,
  NEXT_CONTEST,
  NEXT_CONTEST_SUCCESS,
  NEXT_CONTEST_ERROR,

  END_OF_THIS_QUESTION,
  END_OF_THIS_QUESTION_SUCCESS,
  END_OF_THIS_QUESTION_ERROR,

  PROMOTE_CONTEST,
  PROMOTE_CONTEST_SUCCESS,
  PROMOTE_CONTEST_ERROR,
} from '../constants/'; 

import { getStatusApi, nodeBase, noticeApi, questionApi, request } from '../config/';

function* getQuestion(action) {
  try {
    const { term, id } = action.payload;
    const { getQuestions } = questionApi(id);

    const question = yield call(
      request.get, 
      nodeBase + getQuestions,
      {
        term,
        id,
      }
    );
    
    yield put({ type: GET_QUESTION_SUCCESS, payload: { question } });
  } catch (e) {
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
    const { username, type } = action.payload;

    // this action for update players number successfully.
    if (type === 'endOfThisQuestion') {
      yield delay(2000);
    }
    yield call(request.get, nodeBase + getStatusApi.getOut, { username });
    // save the out info to the localStorage, ban to do things.

    yield put({ type: GET_OUT_OF_CONTEST_SUCCESS });
  } catch (e) {
    yield put({ type: GET_OUT_OF_CONTEST_ERROR });
  }
}

function* watchGetOut() {
  yield takeEvery(GET_OUT_OF_CONTEST, getOut);
}


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
  yield takeEvery(PROMOTE_CONTEST, getPromote);
}

function* endOfThisQuestion(action) {
  try {
    // dispatch http for notify server this person is out
    yield call(request.get, nodeBase + questionApi().endOfThisQuestion);
    // save the out info to the localStorage, ban to do things.

    yield put({ type: END_OF_THIS_QUESTION_SUCCESS });
  } catch (e) {
    yield put({ type: END_OF_THIS_QUESTION_ERROR });
  }
}

function* watchEndOfThisQuestion() {
  while (true) {
    const action = yield take(END_OF_THIS_QUESTION);
    yield call(endOfThisQuestion, action);
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
    const { term, id } = action.payload;
    yield call(request.get, nodeBase + noticeApi.push_notification, { term, id });
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
  watchGetPromote,
  watchClearAllState,
  watchPushNotification,
  watchNextContest,
  watchEndOfThisQuestion,
}