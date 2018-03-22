import React, { Component } from 'react';
import { Button } from 'antd';
import './css/MasterPage.css';

export default class extends React.Component {

  handleStart = () => {
    // select players and start this game
    const { allUsers } = this.props;
    const players = [];
    
    allUsers.map(item => {
      if (this.state.targetKeys.includes(item.user)) {
        players.push(item);
      }
    });
    this.props.handleStart( players );
  }

  render() {
    const { allUsers } = this.props;
    return (
      <div>
        <div className="selectBox">
        </div>

        <div className="gameBox">
          <button onClick={this.handleStart} className="btn btn-red">开始比赛</button>
        </div>
      </div>
    );
  }
}