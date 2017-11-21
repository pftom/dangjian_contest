import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MasterPage } from '../components/';
import { GET_ALL_USERS, CHANGE_QUESTION } from '../constants/index';

class MasterPageContainer extends Component {

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch({ type: GET_ALL_USERS });
  }

  handleQuestion = (type) => {
    const { dispatch } = this.props;

    dispatch({ type: CHANGE_QUESTION, payload: { type }});
  }

  render() {
    const { allUsers, next } = this.props;
    return(
      <MasterPage 
        allUsers={allUsers}
        next={next}
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