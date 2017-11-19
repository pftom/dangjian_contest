import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Login } from '../components/';

// import router for jump
import { push } from 'react-router-redux';
import { LOGIN } from '../constants/';

class LoginContainer extends Component {

  handleLogin = () => {
    const { dispatch } = this.props;

    dispatch({ type: LOGIN });
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { loginSuccess } = nextProps;

    if (loginSuccess) {
      dispatch(push('/ready'));
    }
  }

  render() {
    return(
      <Login 
        handleLogin={this.handleLogin}
      />
    );
  }
}

const mapStateToProps = (state) => ({ 
  loginSuccess: state.user.loginSuccess,
 });

export default connect(mapStateToProps, null)(LoginContainer);