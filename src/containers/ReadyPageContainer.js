import React, { Component } from 'react';
import { connect } from 'react-redux';
import io from 'socket.io-client';
import { Helmet } from 'react-helmet';

import { Route, Redirect } from 'react-router';
import { 
  READY,
  GET_QUESTION,
  GET_OUT_OF_CONTEST,
  CLEAR_ALL_STATE,
  INITIAL_GAME,
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

    this.state = {
      promote: false,
    };
  }

  componentDidMount() {
    const { dispatch, isReady, out, token, promote } = this.props;
    const that = this;

    this.socket.on('push notification', ({ term, id }) => {
      if (!that.props.out) {
        // term define whether single or multiply
        dispatch({ type: GET_QUESTION, payload: { term, id } });
      }
    });

    this.socket.on('next contest', (msg) => {
      dispatch({ type: CLEAR_ALL_STATE });
    });


    this.socket.on('initGame', () => {
      dispatch({ type: INITIAL_GAME });
    });

    this.socket.on('endOfThisQuestion', () => {
      if (!this.state.promote) {
        dispatch({ type: GET_OUT_OF_CONTEST, payload: { username: token, type: 'endOfThisQuestion' }});
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      promote: nextProps.promote,
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

    // change html title
    let htmlTitle = '党建答题比赛';

    // the final control flow function
    let returnComponent = null;

    const res = token && !(out || promote || next || endThisQuestion);
    console.log('res', res);

    if (!token) {
      return <Redirect to="/login" />;
    } else if (token && ((!question && !(out || promote || endThisQuestion)) || next)) {
      // correspond to the loginSuccess state
      htmlTitle = '登录成功';
      returnComponent = <LoginSuccessPage />;
    } else if (token && question && !(out || promote || endThisQuestion)) {
      // correspond to the answer question state
      htmlTitle = '答题页面';
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
      htmlTitle = '晋级成功';
      returnComponent = <PromotePage />
    } else {
      htmlTitle = '晋级失败';
      // correspond to the out Page state
      returnComponent = <OutPage />
    }

    return (
      <div style={{ height: '100%' }}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{htmlTitle}</title>
        </Helmet>
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