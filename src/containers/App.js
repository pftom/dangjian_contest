import React, { Component } from 'react';
import io from 'socket.io-client';
import { connect } from 'react-redux';
import HomePageContainer from './HomePageContainer';
import ReadyPageContainer from './ReadyPageContainer';
import MasterPageContainer from './MasterPageContainer';

import { Route, Redirect } from 'react-router';

class App extends Component { 

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
