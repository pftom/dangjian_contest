import React, { Component } from 'react';

import loginSuccess from './img/loginSuccess.svg';
import './css/LoginSuccess.css';

export default class LoginSuccessPage extends Component {
  render() {
    const { question } = this.props;
    let intactQuestion = null;
    
    if (question) {
      intactQuestion = question.question.split('\n');
      console.log('intactQuestion', intactQuestion);
    }

    return (
      <div className="loginBox">
        <img src={loginSuccess} className="logo"/>
        <p className="loginSuccess">登录成功！</p>
        <p className="ready">等待比赛开始</p>
        <button className="loginBtn" onClick={this.handleSubmit}>退出比赛</button>
      </div>
    );
  }
}