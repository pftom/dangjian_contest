// Here saga effect function
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

  
} from '../constants/'; 

import {
  request,
  base,
  questionApi,
  getOutApi,
} from '../config/';

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
    const { token } = action.payload;
    yield call(request.post, nodeBase + getOutApi.getOut, { token });
    // save the out info to the localStorage, ban to do things.
    yield localStorage.setItem('out', true);
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

export {
  watchGetQuestion,
  watchGetOut,
  watchGetStorageOut,
  watchClearAllState,
}