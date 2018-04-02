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
  CLEAR_ADD_PLAYER_STATE,

  PROMOTE_CONTEST,
  END_OF_THIS_QUESTION_SUCCESS,

  INITIAL_GAME,
} from '../constants/';


const INITIAL_STATE = {
  token: null,
  isLogin: false,
  loginSuccess: false,
  loginError: false,
  loginRepeat: false,

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
        loginRepeat: false,
      };

    case LOGIN_SUCCESS:

      return {
        ...state,
        isLogin: false,
        loginSuccess: true,
        token: action.payload.token,
      };
    
    case LOGIN_ERROR:
      const { logged } = action.e;
      return {
        ...state,
        isLogin: false,
        loginError: true,
        loginRepeat: logged ? true : false,
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

    case CLEAR_ADD_PLAYER_STATE: {
      return {
        ...state,
        isAddPlayers: false,
        addPlayersSuccess: false,
        addPlayersError: false,
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

    case UPDATE_USERS: {
      // need update user
      const { nowUser } = action.payload;
      let { players, allUsers } = state;
      players = players.map((player) => {
        let nowPlayer = player;
        if (nowUser.username === player.username) {
          nowPlayer = nowUser;
        }
        return nowPlayer;
      });

      allUsers = allUsers.map(user => {
        let newUser = user;
        if (nowUser.username === user.username) {
          newUser = nowUser;
        }
        return newUser;
      })

      return {
        ...state,
        allUsers,
        players,
      };
    }

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
      const { allUsers } = state;
      return {
        ...state,
        players: [],
        allUsers: allUsers.map(user => (
          { ...user, out: false }
        )),
        isAddPlayers: false,
        addPlayersSuccess: false,
        addPlayersError: false,
        isLogin: false,
        loginSuccess: false,
        loginError: false,
      };
    }

    case END_OF_THIS_QUESTION_SUCCESS: {
      return {
        ...state,
        players: state.players.map(player => (
          { ...player, promote: false }
        ))
      };
    }

    case PROMOTE_CONTEST: {
      const { username, token } = action.payload;

      if (token && token === 'dhucstmaster') {
        return {
          ...state,
          players: state.players.map(player => {
            if (player.username === username) {
              const newPlayer = { ...player, promote: true };
              return newPlayer;
            }

            return player;
          })
        };
      } else {
        return state;
      }
    }

    case INITIAL_GAME: {
      return INITIAL_STATE;
    }
    
    default: return state;
  }
};