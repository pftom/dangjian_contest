import { READY, CLEAR_ALL_STATE, READY_SUCCESS } from "../constants/index";



const INITIAL_STATE = {
  isReady: false,
};

/**
* @param {Object} state - Default application state
* @param {Object} action - Action from action creator
* @returns {Object} New state
*/
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case READY_SUCCESS:
      return {
        ...state,
        isReady: true,
      };

    case CLEAR_ALL_STATE:
      return {
        ...state,
        isReady: true,
      }
    default: return state;
  }
};