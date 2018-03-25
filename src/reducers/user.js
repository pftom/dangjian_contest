import { UPDATE_USERS } from '../constants/userConstants';
import { 
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  GET_TOKEN_SUCCESS,
  GET_ALL_USERS_SUCCESS,
  START_GAME,
  UPDATE_LOGIN_LIST,

  CLEAR_ALL_STATE,

  ADD_PLAYERS,
  ADD_PLAYERS_SUCCESS,
  ADD_PLAYERS_ERROR,
} from '../constants/';


const INITIAL_STATE = {
  token: null,
  isLogin: false,
  loginSuccess: false,
  loginError: false,

  allUsers: [],
  players: [],

  isInitialState: true,

  isAddPlayers: false,
  addPlayersSuccess: false,
  addPlayersError: false,
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
    
    case LOGIN_ERROR:
      
      return {
        ...state,
        isLogin: false,
        loginError: true,
      };

    case ADD_PLAYERS: {
      return {
        ...state,
        isAddPlayers: true,
        addPlayersSuccess: false,
        addPlayersError: false,
      };
    }

    case ADD_PLAYERS_SUCCESS: {
      return {
        ...state,
        isAddPlayers: false,
        addPlayersSuccess: true,
        players: action.payload.players,
      };
    }

    case ADD_PLAYERS_ERROR: {
      return {
        ...state,
        isAddPlayers: false,
        addPlayersError: true,
      };
    }

    case GET_TOKEN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
      };

    case GET_ALL_USERS_SUCCESS:

      return {
        ...state,
        allUsers: action.payload.allUsers.slice(1),
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

    case UPDATE_LOGIN_LIST: {
      let { allUsers } = state;
      const { username } = action.payload;

      return {
        ...state,
        allUsers: allUsers.map(userItem => {
          if (userItem.username === username) {
            return { ...userItem, logged: true };
          }

          return userItem;
        }),
      }
    }

    case START_GAME:
      
      return {
        ...state,
        players: action.payload.players,
        isInitialState: false,
      };

    case CLEAR_ALL_STATE: {
      return {
        ...state,
        token: '',
      };
    }
    
    default: return state;
  }
};