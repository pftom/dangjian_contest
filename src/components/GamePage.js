import { } from 'antd/es/spin';
import React, { Component } from 'react';
import { Spin } from 'antd';
import { fakeQuestion, mapNumberToString } from './ReadyPage';

import './css/GamePage.css';

export default class  extends Component {
  state = {
    value: 'A',
  }


  render() {
    const { players, allUsers, isLoading, question } = this.props;
    const playerKeys = players.map(item => (
      item.user
    ));
    const remainAudience = allUsers
                            .filter(user => !playerKeys.includes(user.user))
                            .filter(user => !user.out)
                            .length;

    return (
      <div>
        <div>{question && question.question}</div>
        {
          players.map((item, key) => (
            <div key={key}>
             <p className={item.out ? 'isOut' : 'no'}>{item.name}</p>
             <p>{ item.score || 0 }</p>
             {
               item.out
               ? (
                 <div>已出局</div>
               )
               : (
                 <div>
                 <button onClick={() => { this.props.handleRes('out', item.user, remainAudience) }}>出局</button>
             <button onClick={() => { this.props.handleRes('go', item.user, remainAudience) } }>晋级</button>
                 </div>
               )
             }
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
        <button onClick={() => { this.props.handleSelect('single') }}>单选题</button>
        <button onClick={() => { this.props.handleSelect('multiply') }}>多选题</button>
        <button onClick={this.props.handleNextContest}>开始下一轮</button>
      </div>
    );
  }
}