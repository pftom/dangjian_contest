import { 
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
} from '../constants/';


const INITIAL_STATE = {
  token: null,
  isLogin: false,
  loginSuccess: false,
  loginError: false,
};

/**
* @param {Object} state - Default application state
* @param {Object} action - Action from action creator
* @returns {Object} New state
*/
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
        loginSuccess: false,
        loginError: false,
      };

    case LOGIN_SUCCESS:

      return {
        ...state,
        isLogin: false,
        loginSuccess: true,
        token: action.payload.token,
      };
    
    case LOGIN_SUCCESS:
      
      return {
        ...state,
        isLogin: false,
        loginError: true,
      };
    
    default: return state;
  }
};