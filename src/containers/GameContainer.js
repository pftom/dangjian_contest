import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { GamePage } from '../components/';
import { GET_ALL_USERS, UPDATE_USERS } from '../constants/index';

class GameContainer extends Component {

  socket = io('http://127.0.0.1:4000')
  state = {
    isLoading: false,
  }

  componentDidMount() {
    const that = this;
    const { dispatch } = this.props;

    dispatch({ type: GET_ALL_USERS });

    this.socket.on('score', (allUsers) => {
      dispatch({ type: UPDATE_USERS, payload: { allUsers }});
    })
  }

  render() {
    const { players, allUsers } = this.props;
    return(
      <GamePage
        players={players}
        allUsers={allUsers}
        isLoading={this.state.isLoading}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { players, allUsers } = state.user;

  return {
    players,
    allUsers,
  };
};

export default connect(mapStateToProps, null)(GameContainer);