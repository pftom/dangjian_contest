import { } from 'antd/es/spin';
import React, { Component } from 'react';
import { Spin } from 'antd';

export default class  extends Component {
  render() {
    const { players, allUsers, isLoading } = this.props;
    const playerKeys = players.map(item => (
      item.user
    ));
    const remainAudience = allUsers
                            .filter(user => !playerKeys.includes(user.user))
                            .filter(user => !user.out)
                            .length;

    return (
      <div>
        {
          players.map((item, key) => (
            <div key={key}>
             <p>{item.name}</p>
             <p>{ item.score || 0 }</p>
            </div>
          ))
        }
        {
          isLoading
          ? (
            <Spin />
          )
          : (
            <p>剩余观众： {remainAudience || 0}</p>
          )
        }
      </div>
    );
  }
}