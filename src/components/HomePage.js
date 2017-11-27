import React, { Component } from 'react';
import contest from './img/contest.png';
import './css/HomePage.css';

export default class extends Component {

  render() {
    return (
      <div className="homeBox">
        <div className="background-rotate"></div>
        <header className="header">
          <img src={contest} className="logo"/>
          <h3>答 题 比 赛</h3>
          <p>Powered by 计算机学院党支部</p>
        </header>
        <div>

        </div>
      </div>
    );
  }
}