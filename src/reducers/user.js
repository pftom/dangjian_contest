import { UPDATE_USERS } from '../constants/userConstants';
import { 
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_TOKEN_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  START_GAME,
} from '../constants/';


const INITIAL_STATE = {
  token: null,
  isLogin: false,
  loginSuccess: false,
  loginError: false,

  allUsers: [],
  players: [],
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

    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
      }

    case GET_ALL_USERS_SUCCESS:

      return {
        ...state,
        allUsers: action.payload.allUsers,
      };

    case UPDATE_USERS:
      const { allUsers } = action.payload;
      let { players } = state;
      players = players.map((player) => {
        allUsers.map((user) => {
          if (user.user === player.user) {
            player = user;
          }
        })
        return player;
      }) 

      return {
        ...state,
        allUsers,
        players,
      };

    case START_GAME:
      
      return {
        ...state,
        players: action.payload.players,
      };
    
    default: return state;
  }
};