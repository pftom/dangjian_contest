import { } from 'antd/es/button';
import React, { Component } from 'react';
import { Transfer, Button } from 'antd';

export default class extends React.Component {
  state = {
    targetKeys: [],
  }
  handleChange = (targetKeys) => {
    this.setState({ targetKeys });
  }

  handleStart = () => {
    const { allUsers } = this.props;
    const players = [];
    
    allUsers.map(item => {
      if (this.state.targetKeys.includes(item.user)) {
        players.push(item);
      }
    })
    this.props.handleStart( players );
  }

  render() {
    const { allUsers } = this.props;
    return (
      <div>
        <Transfer
          dataSource={allUsers}
          showSearch
          listStyle={{
            width: 250,
            height: 300,
          }}
          rowKey={item => item.user}
          operations={['确认选择', '取消选择']}
          targetKeys={this.state.targetKeys}
          onChange={this.handleChange}
          render={item => `${item.name}`}
        />

        <button onClick={this.handleStart}>开始比赛</button>
      </div>
    );
  }
}