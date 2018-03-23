import React, { Component } from 'react';

export default class LoginSuccessPage extends Component {
  render() {
    const { question } = this.props;
    let intactQuestion = null;
    
    if (question) {
      intactQuestion = question.question.split('\n');
      console.log('intactQuestion', intactQuestion);
    }

    return (
      <div>
        您已经登录成功咯 ~
      </div>
    );
  }
}