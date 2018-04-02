import React, { Component } from 'react';
import { message } from 'antd';
import { connect } from 'react-redux';
import io from 'socket.io-client';

import { Login } from '../components/';
import { error, success } from '../components/Login';

// import router for jump
import { push } from 'react-router-redux';
import { LOGIN } from '../constants/';
import { nodeBase } from '../config/api';

class LoginContainer extends Component {
  socket = io(nodeBase);

  handleSubmit = (body) => {
    const { dispatch } = this.props;
    dispatch({ type: LOGIN, payload: { body } });
  }

  handleReturn = () => {
    const { dispatch } = this.props;

    dispatch(push('/'));
  }

  componentWillReceiveProps(nextProps) {
    const { loginSuccess, loginError, dispatch, token, loginRepeat } = nextProps;

    if (loginSuccess) {
      success('登录成功！');
      
      // judge token for jump different page
      if (token === 'dhucstmaster') {
        dispatch(push('/dashboard'));
      } else if (token && token !== 'dhucstmaster') {
        dispatch(push('/ready'));
      }
    }

    if (loginError) {
      if (loginRepeat) {
        error('Sorry，此用户已经登录了哦 ~');
      } else {
        error('登录失败！您的用户名不对哦 ~');
      }
    }
  }

  render() {
    const {
      loginSuccess,
      loginError,
      dispatch,
      loginRepeat,
    } = this.props;

    return(
      <Login 
        handleSubmit={this.handleSubmit}
        handleReturn={this.handleReturn}
        loginSuccess={loginSuccess}
        loginError={loginError}
        dispatch={dispatch}
        loginRepeat={loginRepeat}
      />
    );
  }
}

const mapStateToProps = (state) => ({ 
  loginSuccess: state.user.loginSuccess,
  loginError: state.user.loginError,
  token: state.user.token,
  loginRepeat: state.user.loginRepeat,
 });

export default connect(mapStateToProps, null)(LoginContainer);