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

  pushNotificationArray: [
    {
      option: 'single',
      id: 0,
    },
    {
      option: 'multiple',
      id: 0,
    },
    {
      option: 'single',
      id: 1,
    },
    {
      option: 'multiple',
      id: 1,
    },
    {
      option: 'single',
      id: 2,
    },
    {
      option: 'multiple',
      id: 2,
    },
    {
      option: 'single',
      id: 3,
    },
    {
      option: 'multiple',
      id: 3,
    },
    {
      option: 'single',
      id: 4,
    },
    {
      option: 'multiple',
      id: 4,
    },
    {
      option: 'single',
      id: 5,
    },
    {
      option: 'multiple',
      id: 5,
    },
    {
      option: 'single',
      id: 6,
    },
    {
      option: 'multiple',
      id: 6,
    },
  ],
  pushNotificationIndex: 0,
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
      const { pushNotificationIndex, pushNotificationArray } = state;
      let nowOptionCnt = pushNotificationIndex + 1;

      // when there is no other question, hint master 
      const hasMoreQuestion = pushNotificationArray.length - 1 >= nowOptionCnt;

      return {
        ...state,
        pushNotificationIndex: nowOptionCnt,
        hasMoreQuestion,
      }
    }

    default: return state;
  }
};