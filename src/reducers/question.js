import { GET_QUESTION, GET_QUESTION_SUCCESS, GET_QUESTION_ERROR } from '../constants/index';

const INITIAL_STATE = {
  questionLists: {
    singleOptionLists: {
      data: [1, 2, 3, 4, 5],
      index: 2,
    },
    multiplyOptionLists: {
      data: [1, 2, 3, 4, 5],
      index: 0,
    }
  },

  isGettingQuestion: false,
  getQuestionSuccess: false,
  getQuestionError: false,
  question: null,
};

/**
* @param {Object} state - Default application state
* @param {Object} action - Action from action creator
* @returns {Object} New state
*/
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_QUESTION:
      return {
        ...state,
        isGettingQuestion: true,
        getQuestionSuccess: false,
        getQuestionError: false,
      };

    case GET_QUESTION_SUCCESS:
      return {
        ...state,
        isGettingQuestion: false,
        getQuestionSuccess: true,
        question: action.payload.question,
      };

    case GET_QUESTION_ERROR:
      return {
        ...state,
        isGettingQuestion: false,
        getQuestionError: true,
      };

    default: return state;
  }
};