import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { push } from 'react-router-redux';
import { Redirect } from 'react-router';

import { nodeBase } from '../config';
import { GamePage } from '../components/';
import { 
  GET_ALL_USERS, 
  UPDATE_USERS, 
  GET_QUESTION, 
  CLEAR_ALL_STATE, 

  GET_OUT_OF_CONTEST, 
  PROMOTE_CONTEST,

  NEXT_CONTEST,
  PUSH_NOTIFICATION,
} from '../constants/index';

class GameContainer extends Component {

  socket = io(nodeBase);
  state = {
    isLoading: false,
  };

  componentDidMount() {
    const that = this;
    const { dispatch } = this.props;

    this.socket.on('score', (nowUser) => {
      dispatch({ type: UPDATE_USERS, payload: { nowUser }});
    });


    // start next question
    this.socket.on('push notification', ({ option, id }) => {
        dispatch({ type: GET_QUESTION, payload: { option, id } });
    });

    //  start next game
    this.socket.on('next contest', (msg) => {
      dispatch({ type: CLEAR_ALL_STATE });
    });
  }

  handleSelect = (option) => {
    const { dispatch } = this.props;

    dispatch({ type: PUSH_NOTIFICATION, payload: { option }});
  }

  handleRes = (type, username) => {
    const { dispatch } = this.props;
    if (type === 'out') {
      dispatch({ type: GET_OUT_OF_CONTEST, payload: { username }});
    } else {
      dispatch({ type: PROMOTE_CONTEST, payload: { username }});
    }
  }

  handleNextContest = () => {
    const { dispatch } = this.props;

    dispatch({ type: NEXT_CONTEST });
    dispatch(push('/dashboard'));
  }

  render() {
    const { players, allUsers, question, token } = this.props;

    if (!token) {
      return <Redirect to="/login" />;
    }

    console.log('allUsers', allUsers);

    return(
      <GamePage
        players={players}
        allUsers={allUsers}
        question={question}
        isLoading={this.state.isLoading}
        handleSelect={this.handleSelect}
        handleRes={this.handleRes}
        handleNextContest={this.handleNextContest}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { players, allUsers, token } = state.user;
  const { question } = state.question;

  return {
    token,
    players,
    allUsers,
    question
  };
};

export default connect(mapStateToProps, null)(GameContainer);