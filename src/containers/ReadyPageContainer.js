import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { Route, Redirect } from 'react-router';
import { 
  READY,
  GET_QUESTION,
  GET_OUT_OF_CONTEST,
  CLEAR_ALL_STATE,
} from '../constants/index';
import { nodeBase } from '../config/index';

import {
  LoginSuccessPage,
  OutPage,
  QuestionPage,
  PromotePage,
} from '../components/'


class ReadyPageContainer extends Component {

  constructor(props) {
    super(props);

    this.socket = io(nodeBase);
  }

  componentDidMount() {
    const { dispatch, isReady, out } = this.props;
    const that = this;

    this.socket.on('push notification', ({ option, id }) => {
      if (!that.props.out) {
        // option define whether single or multiply
        dispatch({ type: GET_QUESTION, payload: { option, id } });
      }
    });

    this.socket.on('next contest', (msg) => {
      dispatch({ type: CLEAR_ALL_STATE });
    });
  }

  componentDidUpdate() {
    const { dispatch, id, isReady, out } = this.props;
    const that = this;
    console.log('isReady', isReady)
    
    console.log('socket', this.socket.on);
    this.socket.on('push notification', ({ option, id }) => {
      if (!that.props.out) {
        // option define whether single or multiply
        dispatch({ type: GET_QUESTION, payload: { option, id } });
      }
    });

    this.socket.on('next contest', (msg) => {
      dispatch({ type: CLEAR_ALL_STATE });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {

    const { 
      isReady, 
      question, 
      isGettingQuestion, 
      promote, 
      out, 
      next, 
      token, 
      endThisQuestion,
      dispatch 
    } = this.props;

    // the final control flow function
    let returnComponent = null;

    const res = token && !(out || promote || next || endThisQuestion);
    console.log('res', res);

    if (!token) {
      return <Redirect to="/login" />;
    } else if (token && ((!question && !(out || promote || endThisQuestion)) || next)) {
      // correspond to the loginSuccess state
      returnComponent = <LoginSuccessPage />;
    } else if (token && question && !(out || promote || endThisQuestion)) {
      // correspond to the answer question state
      returnComponent = (
        <QuestionPage 
          question={question} 
          isGettingQuestion={isGettingQuestion} 
          token={token}
          dispatch={dispatch}
        />
      );
    } else if (token && question && promote) {
      // correspond to the promote Page state
      returnComponent = <PromotePage />
    } else {
      // correspond to the out Page state
      returnComponent = <OutPage />
    }

    return (
      <div>
        {returnComponent}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  const {
    isGettingQuestion,
    getQuestionSuccess,
    getQuestionError,
    question,
    out,
    next,
    promote,
  } = state.question;

  const { isReady } = state.browser;
  const { token, endThisQuestion } = state.user;

  return {
    isGettingQuestion,
    getQuestionSuccess,
    getQuestionError,
    question,
    out,
    isReady,
    token,
    next,
    promote,
    endThisQuestion,
  };
};

export default connect(mapStateToProps, null)(ReadyPageContainer);