import React, { Component } from 'react';
import { Button } from 'antd';
import { message } from 'antd';
import classnames from 'classnames';
import { push } from 'react-router-redux'

import './css/MasterPage.css';
import { ADD_PLAYERS } from '../constants/';

export default class extends React.Component {
  constructor(props) {
    super(props);

    const { allUsers } = props;
    this.initialState = {};

    // map all the users to username, and assign it to state
    allUsers.map(item => {
      this.initialState[item.username] = false;
    });

    this.state = {
      ...this.initialState,
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.checked;
    const id = target.id;

    this.setState({
      [id]: value,
    });
  }

  error = (msg, duration, afterClose = () => {}) => {
    message.error(msg, duration, () => {
      afterClose();
    });
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { 
      addPlayersSuccess,
      addPlayersError,
    } = nextProps;

    if (addPlayersSuccess) {
      dispatch(push('/contest'));
    }

    if (addPlayersError) {
      this.error('Sorry, 网络出现了错误哦 ~, 请重新尝试一下吧!');
    }
  }

  handleStart = () => {
    // select players and start this game
    const { allUsers, dispatch } = this.props;
    let players = [];
    let isSelectedAnyThing = false;
    let selectedNumber = 0;

    console.log('this.state', this.state);
    // || to judge whether is unselect status
    Object.entries(this.state).map(item => {
      if (item[1]) {
        selectedNumber++;

        // add players
        allUsers.map(user => {
          if (user.username === item[0]) {
            players.push(user);
          }
        })
      }

      isSelectedAnyThing = isSelectedAnyThing || item;
    });




    if (!isSelectedAnyThing) {
      this.error('Sorry, 您还没有选择哦 ~');
    } else if (selectedNumber < 3) {
      this.error('Soory, 您至少要选择 3 个人哦 ~');
    } else {
      dispatch({ type: ADD_PLAYERS, payload: { players } });
    }

  }

  render() {
    const { allUsers } = this.props;
    return (
      <div>
        <div className="selectBox">
        {
          allUsers.map((item, key) => (
            <p key={key} className="selectItem">
              <input 
                type="checkbox" 
                name={item.username} 
                id={item.username}
                checked={this.state[item.username]}
                onChange={this.handleChange} 
              />
              <label htmlFor={item.username} className={classnames({ active: this.state[item.username] })}>{item.name}</label>
            </p>
          ))
        }
        </div>

        <div className="gameBox">
          <button onClick={this.handleStart} className="btn btn-red">开始比赛</button>
        </div>
      </div>
    );
  }
}