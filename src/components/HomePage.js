import React, { Component } from 'react';

export default class extends Component {

  render() {
    return (
      <div>
        <header>答题比赛</header>
        <p>Let's do it.</p>
        <p>请需要答题的童鞋点下登录</p>
        <button onClick={this.props.handleJumpLogin}>登录</button>
      </div>
    );
  }
}