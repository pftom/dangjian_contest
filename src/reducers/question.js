import { 
  GET_QUESTION, 
  GET_QUESTION_SUCCESS, 
  GET_QUESTION_ERROR, 
  GET_OUT_OF_CONTEST, 
  GET_OUT_OF_CONTEST_SUCCESS, 
  CLEAR_ALL_STATE,

  PROMOTE_CONTEST,
  INITIAL_GAME,

  PUSH_NOTIFICATION_SUCCESS,
} from '../constants/index';

const INITIAL_STATE = {
  isGettingQuestion: false,
  getQuestionSuccess: false,
  getQuestionError: false,
  question: null,

  out: false,
  promote: false,
  next: false,
  endThisQuestion: false,

  // the question term and id for use
  term: 0,
  id: 0,
  hasMoreQuestion: true,
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
    // do not clear pushNotificationIndex and pushNotificationArray
    // because, question need going on. Do not repeat
      return {
        ...state,
        out: false,
        question: null,
        promote: false,
        endThisQuestion: false,
        next: true,
      };

    case PROMOTE_CONTEST: {

      return {
        ...state,
        promote: true,
      };
    }

    case INITIAL_GAME: {
      return INITIAL_STATE;
    }

    case PUSH_NOTIFICATION_SUCCESS: {
      // every question, add pushNotificationIndex 
      const { id } = state;
      let nowOptionCnt = id + 1;

      // when there is no other question, hint master 
      const hasMoreQuestion = nowOptionCnt < 8;

      return {
        ...state,
        id: nowOptionCnt,
        hasMoreQuestion,
      }
    }

    default: return state;
  }
};