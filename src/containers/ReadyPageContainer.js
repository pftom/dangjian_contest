import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { Route, Redirect } from 'react-router';

import { ReadyPage } from '../components/';
import { 
  READY,
  GET_QUESTION,
  GET_OUT_OF_CONTEST,
  GET_STORAGE_OUT,
  CLEAR_ALL_STATE,
} from '../constants/index';

class ReadyPageContainer extends Component {

  constructor(props) {
    super(props);

    this.socket = io('http://127.0.0.1:4000');
  }

  componentDidMount() {
    const { dispatch, isReady } = this.props;

    dispatch({ type: GET_STORAGE_OUT });

    this.socket.on('push notification', (msg) => {
      console.log('isReady', isReady);
      if (isReady) {
        dispatch({ type: GET_QUESTION });
      }
    });

    this.socket.on('next contest', (msg) => {
      dispatch({ type: CLEAR_ALL_STATE });
    });
  }

  componentDidUpdate() {
    const { dispatch, id, isReady } = this.props;
    console.log('isReady', isReady)
    
    console.log('socket', this.socket.on);
    this.socket.on('push notification', (msg) => {
      console.log('isReady', isReady);
      if (isReady) {
        dispatch({ type: GET_QUESTION });
      }
    });

    this.socket.on('next contest', (msg) => {
      dispatch({ type: CLEAR_ALL_STATE });
    });
  }

  handleReady = () => {
    const { dispatch } = this.props;
    dispatch({ type: READY });
  }

  handleSubmit = (value) => {
    const { question, dispatch, token } = this.props;
    if (value !== question.answer) {
      dispatch({ type: GET_OUT_OF_CONTEST, payload: { token } });
    }
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {

    const { isReady, question, isGettingQuestion, out, next, token } = this.props;

    console.log('isGettingQuestion', isGettingQuestion);
    console.log('render', isReady);
    return(
      <Route 
        render={props => (
          token ? (
            <ReadyPage
              handleSubmit={this.handleSubmit}
              isGettingQuestion={isGettingQuestion}
              question={question}
              out={out}
              next={next}
              handleReady={this.handleReady}
            />
          ) : (
            <Redirect to="/404" />
          )
        )}

      />
    );
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
  } = state.question;

  const { isReady } = state.browser;
  const { token } = state.user;

  return {
    isGettingQuestion,
    getQuestionSuccess,
    getQuestionError,
    question,
    out,
    isReady,
    token,
    next,
  };
};

export default connect(mapStateToProps, null)(ReadyPageContainer);