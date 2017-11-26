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
import { nodeBase } from '../config/index';

class ReadyPageContainer extends Component {

  constructor(props) {
    super(props);

    this.socket = io(nodeBase);
  }

  componentDidMount() {
    const { dispatch, isReady, out } = this.props;
    const that = this;

    dispatch({ type: GET_STORAGE_OUT });

    this.socket.on('push notification', ({ option, id }) => {
      console.log('isReady', isReady);
      if (!that.props.out) {
        // option define whether single or multiply
        dispatch({ type: GET_QUESTION, payload: { option, id } });
      }
    });

    this.socket.on('next contest', (msg) => {
      dispatch({ type: CLEAR_ALL_STATE });
    });

    this.socket.on('logged', (msg) => {
      console.log('msg', msg);
    });
  }

  componentDidUpdate() {
    const { dispatch, id, isReady, out } = this.props;
    const that = this;
    console.log('isReady', isReady)
    
    console.log('socket', this.socket.on);
    this.socket.on('push notification', ({ option, id }) => {
      console.log('isReady', isReady);
      console.log('out', out);
      if (!that.props.out) {
        dispatch({ type: GET_QUESTION, payload: { option, id } });
      }
    });

    this.socket.on('next contest', (msg) => {
      dispatch({ type: CLEAR_ALL_STATE });
    });
  }

  handleReady = () => {
    const { dispatch, token } = this.props;
    dispatch({ type: READY, payload: { token } });
  }

  handleSubmit = (value) => {
    const { question, dispatch, token } = this.props;
    if (value !== question.answer) {
      // dispatch request for node, to get the remain value
      dispatch({ type: GET_OUT_OF_CONTEST, payload: { token, type: 'out' } });
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
            <Redirect to="/" />
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