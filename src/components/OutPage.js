import React, { Component } from 'react';

import './css/OutPage.css';

export default class OutPage extends Component {
  render() {
    return (
      <div className="loginBox outPage">
        <p className="loginSuccess">回答错误！</p>
        <p className="loginSuccess answerError">您被淘汰！</p>
        <button className="loginBtn outPageBtn" onClick={this.handleSubmit}>退出比赛</button>
      </div>
    );
  }
}