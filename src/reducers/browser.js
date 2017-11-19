import { READY } from "../constants/index";



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
    case READY:
      return {
        ...state,
        isReady: true,
      };
    default: return state;
  }
};