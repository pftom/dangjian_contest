import React, { Component } from 'react';
import { Button } from 'antd';
import { message } from 'antd';
import classnames from 'classnames';
import { push } from 'react-router-redux';
import $ from 'jquery';

import './css/MasterPage.css';
import { 
  ADD_PLAYERS,
  CLEAR_ADD_PLAYER_STATE,
} from '../constants/';

// import image
import qrCode from './img/qrCode.png';

const hintArray = [
  {
    type: '比赛规则',
    content: `console.log('Happy Hacking!');`,
  },
  {
    type: '奖励机制',
    content: `console.log('那必须滴!');`,
  },
];

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

    // how many checked, if checked > 3, stop it
    const howManyChecked = Object.values(this.state).filter(value => value);
    if (value && howManyChecked.length >= 3) {
      message.success('Sorry， 只能选择三名选手哦 ~');
    } else {
      this.setState({
        [id]: value,
      });
    }
  }

  error = (msg, duration, afterClose = () => {}) => {
    message.error(msg, duration, () => {
      afterClose();
    });
  }

  handleClick = (event) => {
    const target = event.target;
    console.log('target', target.tagName);
    const needCancelBubbles = ['LABEL', 'INPUT'];
    if (needCancelBubbles.includes(target.tagName)) {
      return;
    }
    
    const parent = $(target).parent();
    $(parent).find('input').click();
  }

  componentWillReceiveProps(nextProps) {
    const { dispatch } = this.props;
    const { 
      addPlayersSuccess,
      addPlayersError,
    } = nextProps;

    if (addPlayersSuccess) {
      dispatch(push('/contest'));
      dispatch({ type: CLEAR_ADD_PLAYER_STATE });
    }

    if (addPlayersError) {
      this.error('Sorry, 网络出现了错误哦 ~, 请重新尝试一下吧!');
      dispatch({ type: CLEAR_ADD_PLAYER_STATE });
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
      this.error('Sorry, 您至少要选择 3 个人哦 ~');
    } else {
      dispatch({ type: ADD_PLAYERS, payload: { players } });
    }

  }

  render() {
    const { allUsers } = this.props;
    let selectedNumber = 0;

    Object.entries(this.state).map(item => {
      if (item[1]) {
        selectedNumber++;
      }
    });

    let totalNumber = null;
    let alreadyLogined = null;
    if (allUsers) {
      totalNumber = allUsers.length;
      alreadyLogined = allUsers.filter(user => user.logged).length;
    }

    return (
      <div id="master">
        <div className="header">
          
        </div>
        <div className="content">
          <div className="hint">
            {
              hintArray.map((hintItem, key) => (
                <div className="hintItem" key={key}>
                  <h4 className="hintHeader">{hintItem.type}</h4>
                  <p className="hintContent">{hintItem.content}</p>
                </div>
              ))
            }
          </div>
          <div className="start">
            <div className="imgBox">
              <img src={qrCode} alt="QRCode"/>
            </div>
            <div className="startHeader">
              请在座参赛选手扫描<br />
              上图二维码进入比赛
            </div>
            <button onClick={this.handleStart} className="startBtn">开始比赛</button>
          </div>
          <div className="loginList">
            <h4 className="loginHeader">
              登录情况  { totalNumber && <span className="record">( {alreadyLogined} / {totalNumber} )</span>}
            </h4>
            <div className="selectBox">
            {
              allUsers.map((item, key) => (
                <div key={key} className="selectItem" onClick={this.handleClick}>
                  <p className="userId">{item.id}</p>
                  <label htmlFor={item.username} className={classnames({ active: this.state[item.username] }, 'userLabel')}>{item.name}</label>
                  <p className="loginStatus">
                    {
                      item.logged 
                      ? '已登录'
                      : '未登录'
                    }
                  </p>
                  <p className="check">
                    <input 
                      type="checkbox" 
                      name={item.username} 
                      id={item.username}
                      checked={this.state[item.username]}
                      onChange={this.handleChange} 
                    />
                  </p>
                </div>
              ))
            }
            </div>
            <div className="selectedNumber">
              已选择参赛者 {selectedNumber}, 还差 {3 - selectedNumber} 名
            </div>
          </div>
        </div>
      </div>
    );
  }
}