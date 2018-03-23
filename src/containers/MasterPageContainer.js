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
import { push } from 'react-router-redux'

class MasterPageContainer extends Component {
  socket = io(nodeBase)

  componentDidMount() {
    const { dispatch, isInitialState } = this.props;

    if (isInitialState) {
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

  handleStart = (players) => {
    // select need start players 
    const { dispatch } = this.props;

    dispatch({ type: START_GAME, payload: { players }});
    dispatch(push('/contest'));
  }

  render() {
    const { allUsers } = this.props;
    console.log('allUser', allUsers);
    return(
      <MasterPage 
        allUsers={allUsers}
        handleStart={this.handleStart}
      />
    );
  }
}


const mapStateToProps = (state) => {
  const { allUsers, isInitialState } = state.user;
  
  return {
    allUsers,
    isInitialState,
  };
};

export default connect(mapStateToProps, null)(MasterPageContainer);