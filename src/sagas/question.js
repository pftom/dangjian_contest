// Here saga effect function
import { call, put, take, fork, cancel } from 'redux-saga/effects';

import {
  GET_QUESTION_SUCCESS,
  GET_QUESTION_ERROR,
  GET_QUESTION,
} from '../constants/'; 

function* getQuestion(action) {
  try {
    const question = {
      question: '1.第十九届中共中央政治局常委会共有几位委员？',
      answer: 'B',
    };
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

export {
  watchGetQuestion,
}