import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { push } from 'react-router-redux';
import { Redirect } from 'react-router';
import { message } from 'antd';

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

  END_OF_THIS_QUESTION,
  UPDATE_PLAYERS,
  INITIAL_GAME,
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

    this.socket.on('players', (players) => {
      dispatch({ type: UPDATE_PLAYERS, payload: { newPlayers: players }});
    });


    // start next question
    this.socket.on('push notification', ({ option, id }) => {
      dispatch({ type: GET_QUESTION, payload: { option, id } });
    });

    //  start next game
    this.socket.on('next contest', (msg) => {
      dispatch({ type: CLEAR_ALL_STATE });
    });

    this.socket.on('initGame', () => {
      dispatch({ type: INITIAL_GAME });
    });
  }

  error = (msg, duration, callback = () => {}) => {
    message.error(msg, duration, () => {
      callback();
    });
  }

  handleSelect = (option) => {
    const { 
      dispatch,
      nextQuestionOption,
      hasMoreQuestion,
    } = this.props;

    if (hasMoreQuestion) {
      dispatch({ 
        type: PUSH_NOTIFICATION, 
        payload: { 
          ...nextQuestionOption,
        },
      });
    } else {
      this.error('Sorry，没有更多的题目了哦 ~');
    }
  }

  handleRes = (type, username) => {
    console.log('username', username);
    const { dispatch, token } = this.props;
    if (type === 'out') {
      dispatch({ type: GET_OUT_OF_CONTEST, payload: { username }});
    } else {
      dispatch({ type: PROMOTE_CONTEST, payload: { username, token }});
    }
  }

  handleNextContest = () => {
    const { dispatch } = this.props;

    dispatch({ type: NEXT_CONTEST });
    dispatch(push('/dashboard'));
  }

  endThisQuestion = () => {
    const { players, dispatch } = this.props;

    dispatch({ type: END_OF_THIS_QUESTION });
  }

  render() {
    const { players, allUsers, question, token, dispatch } = this.props;

    if (!token) {
      return <Redirect to="/login" />;
    }


    return(
      <GamePage
        players={players}
        allUsers={allUsers}
        question={question}
        dispatch={dispatch}
        isLoading={this.state.isLoading}
        handleSelect={this.handleSelect}
        handleRes={this.handleRes}
        handleNextContest={this.handleNextContest}
        endThisQuestion={this.endThisQuestion}
      />
    );
  }
}

const mapStateToProps = (state) => {
  const { players, allUsers, token } = state.user;
  const { 
    question,
    pushNotificationIndex,
    pushNotificationArray,
    hasMoreQuestion,
  } = state.question;

  console.log('pushNotificationIndex', pushNotificationIndex);
  console.log('pushNotificationArray', pushNotificationArray);

  return {
    token,
    players,
    allUsers,
    question,
    nextQuestionOption: pushNotificationArray[pushNotificationIndex],
    hasMoreQuestion,
  };
};

export default connect(mapStateToProps, null)(GameContainer);