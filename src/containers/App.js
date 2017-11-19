import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import HomePageContainer from './HomePageContainer';
import ReadyPageContainer from './ReadyPageContainer';

import { LOGIN, GET_TOKEN } from '../constants/';
import { Route, Redirect } from 'react-router';

class App extends Component { 
  constructor(props) {
    super(props);

    // this.socket = io('http://60.205.183.134:3000');
    
    // console.log('socket', this.socket.on);
    // this.socket.on('push notification', (msg) => {
    //   console.log('push notification', msg);
    // })
  }
  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({ type: GET_TOKEN });
  }

  componentWillUnmount() {
    // this.socket.disconnect();
  }
  render() {
    const { token } = this.props;
    return (
      <Route
        render={props => (
          token ? (
            <Redirect to="/ready" />
          ) : (
            <HomePageContainer />
          )
        )}
      />
    );
  }
}

const mapStateToProps = (state) => ({ 
  token: state.user.token,
});

export default connect(mapStateToProps, null)(App);
