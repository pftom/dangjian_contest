import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import HomePageContainer from './HomePageContainer';
import ReadyPageContainer from './ReadyPageContainer';
import MasterPageContainer from './MasterPageContainer';

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

  componentWillUnmount() {
    // this.socket.disconnect();
  }

  render() {
    const { token } = this.props;
    const renderComponent = (props) => {
      let returnComponent = null;

      if (!token) {
        returnComponent = <Redirect to="/login" />
      } else if (token === 'dhucstmaster') {
        returnComponent = <MasterPageContainer {...props} />;
      } else {
        returnComponent = <ReadyPageContainer {...props} />;
      }

      return returnComponent;
    }

    return (
      <Route
        render={renderComponent}
      />
    );
  }
}

const mapStateToProps = (state) => ({ 
  token: state.user.token,
});

export default connect(mapStateToProps, null)(App);
