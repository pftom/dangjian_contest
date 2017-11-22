import { START_GAME } from '../constants/userConstants';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MasterPage } from '../components/';
import { GET_ALL_USERS, CHANGE_QUESTION } from '../constants/index';
import { push } from 'react-router-redux'

class MasterPageContainer extends Component {

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({ type: GET_ALL_USERS });
  }

  handleQuestion = (type) => {
    const { dispatch } = this.props;

    dispatch({ type: CHANGE_QUESTION, payload: { type }});
  }

  handleStart = (players) => {
    const { dispatch } = this.props;

    dispatch({ type: START_GAME, payload: { players }});
    dispatch(push('/contest'));
  }

  render() {
    const { allUsers, next } = this.props;
    return(
      <MasterPage 
        allUsers={allUsers}
        next={next}
        handleStart={this.handleStart}
        handleQuestion={this.handleQuestion}
      />
    );
  }
}


const mapStateToProps = (state) => {
  const { allUsers } = state.user;
  
  return {
    allUsers,
  };
};

export default connect(mapStateToProps, null)(MasterPageContainer);