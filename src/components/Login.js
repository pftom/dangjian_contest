import React, { Component } from 'react';

export default class  extends Component {
  render() {
    return (
      <div>
        <button onClick={this.props.handleLogin}>去登陆，傻小子</button>
      </div>
    );
  }
}