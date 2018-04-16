import React, { Component } from 'react';

import loginSuccess from './img/loginSuccess.svg';
import './css/LoginSuccess.css';

export default class PromotePage extends Component {
  render() {
    return (
      <div className="loginBox">
        <p className="loginSuccess">回答正确！</p>
        <p className="loginSuccess answerError">成功晋级！</p>
        <p className="nextQuestion">请耐心等待下一题...</p>
      </div>
    );
  }
}