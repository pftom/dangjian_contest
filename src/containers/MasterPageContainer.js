import { nodeBase } from '../config';
import { START_GAME } from '../constants/userConstants';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { MasterPage } from '../components/';
import { 
  GET_ALL_USERS, 
  CHANGE_QUESTION, 
  NEXT_CONTEST,
  UPDATE_LOGIN_LIST, 
} from '../constants/index';

class MasterPageContainer extends Component {
  socket = io(nodeBase)

  componentDidMount() {
    const { dispatch, isInitialState, allUsers } = this.props;

    if (isInitialState && allUsers.length === 0) {
      // first step
      // add isInitialState for getUsers only first time.
      // in one whole contest, only once, only once! 
      dispatch({ type: GET_ALL_USERS });
    } else {
      dispatch({ type: NEXT_CONTEST });
    }

    this.socket.on('logged', ({ username }) => {
      dispatch({ type: UPDATE_LOGIN_LIST, payload: { username }});
    });
  }

  

  render() {
    const { allUsers, dispatch } = this.props;
    console.log('allUser', allUsers);
    return(
      <MasterPage 
        {...this.props}
        allUsers={allUsers}
        handleStart={this.handleStart}
        dispatch={dispatch}
      />
    );
  }
}


const mapStateToProps = (state) => {
  const { 
    allUsers, 
    isInitialState,
    isAddPlayers,
    addPlayersSuccess,
    addPlayersError,
  } = state.user;
  
  return {
    allUsers,
    isInitialState,
    isAddPlayers,
    addPlayersSuccess,
    addPlayersError,
  };
};

export default connect(mapStateToProps, null)(MasterPageContainer);