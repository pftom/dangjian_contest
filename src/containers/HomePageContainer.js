import React, { Component } from 'react';
import { connect } from 'react-redux';
import { HomePage } from '../components/';

// import router for jump
import { push } from 'react-router-redux';
import { LOGIN } from '../constants/';

class HomePageContainer extends Component {

  handleJumpLogin = () => {
    const { dispatch } = this.props;

    dispatch(push('/login'));
  }

  render() {
    return(
      <HomePage 
        handleJumpLogin={this.handleJumpLogin}
      />
    );
  }
}

const mapStateToProps = (state) => ({ 
 });

export default connect(mapStateToProps, null)(HomePageContainer);