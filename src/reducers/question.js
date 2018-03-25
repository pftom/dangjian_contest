import { 
  GET_QUESTION, 
  GET_QUESTION_SUCCESS, 
  GET_QUESTION_ERROR, 
  GET_OUT_OF_CONTEST, 
  GET_OUT_OF_CONTEST_SUCCESS, 
  CLEAR_ALL_STATE,

  PROMOTE_CONTEST_SUCCESS,
  PROMOTE_CONTEST_ERROR,
} from '../constants/index';

const INITIAL_STATE = {
  isGettingQuestion: false,
  getQuestionSuccess: false,
  getQuestionError: false,
  question: null,

  out: false,
  promote: false,
  next: false,
};

// extract options from a whole question
const resolveReg = (rawString) => {
  // for better adaptation
  const regex = /(?=[ABCDEFGHI])/g;
  const optionArray = rawString.split(regex);
  return optionArray;
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
      const { question } = action.payload;
      const newQuestion = {
        ...question,
        question: resolveReg(question.question),
      };

      return {
        ...state,
        isGettingQuestion: false,
        getQuestionSuccess: true,
        question: newQuestion,
        promote: false,
        next: false,
      };

    case GET_QUESTION_ERROR:
      return {
        ...state,
        isGettingQuestion: false,
        getQuestionError: true,
      };

    case GET_OUT_OF_CONTEST:
      return {
        ...state,
        out: true,
      };

    case CLEAR_ALL_STATE: 
      return {
        ...state,
        out: false,
        question: null,
        promote: false,
        next: true,
      };

    case PROMOTE_CONTEST_SUCCESS: {
      return {
        ...state,
        promote: true,
      };
    }
    
    case PROMOTE_CONTEST_ERROR: {
      return {
        ...state,
        promote: false,
      };
    }

    default: return state;
  }
};