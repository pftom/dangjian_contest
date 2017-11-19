import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { ReadyPage } from '../components/';
import { 
  READY,
  GET_QUESTION,
} from '../constants/index';

class ReadyPageContainer extends Component {

  constructor(props) {
    super(props);

    this.socket = io('http://60.205.183.134:3000');
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
  }

  handleReady = () => {
    const { dispatch } = this.props;
    dispatch({ type: READY });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {

    const { isReady, question, isGettingQuestion } = this.props;
    console.log('render', isReady);
    return(
      <ReadyPage
        isGettingQuestion={isGettingQuestion}
        question={question}
        handleReady={this.handleReady}
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
  } = state.question;

  const { isReady } = state.browser;

  return {
    isGettingQuestion,
    getQuestionSuccess,
    getQuestionError,
    question,
    isReady,
  };
};

export default connect(mapStateToProps, null)(ReadyPageContainer);