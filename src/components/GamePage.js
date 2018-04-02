import { } from 'antd/es/spin';
import React, { Component } from 'react';
import { Spin } from 'antd';
import classnames from 'classnames';
import { fakeQuestion, mapNumberToString } from './ReadyPage';
import run from './img/run.png';

import './css/GamePage.css';
import { END_OF_THIS_QUESTION, GET_OUT_OF_CONTEST } from '../constants/';
import homeIcon from './img/home.png';

// default question

export default class  extends Component {
  state = {
    cnt: 5,
    active: true,
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch, players } = this.props;
    if (this.state.cnt <= 0) {
      players.map(player => {
        // 
        if (player.promote || player.out) {
          return;
        }
  
        dispatch({ type: GET_OUT_OF_CONTEST, payload: { username: player.username }});
      });
      dispatch({ type: END_OF_THIS_QUESTION });
      clearInterval(this.timer);
      this.setState({
        cnt: 5,
      });
    }
  }

  handleCount = () => {
    const that = this;
    this.timer = setInterval(() => {
      that.setState((prevState, props) => {
        return {
          cnt: prevState.cnt - 1,
        };
      })
    }, 1000);
  }

  handleClickTabOne = () => {
    this.setState({ active: true });
  }

  handleClickTabTwo = () => {
    this.setState({ active: false });
  }


  render() {
    const { players, allUsers, isLoading, question } = this.props;
    const playerKeys = players.map(item => (
      item.username
    ));
    const remainAudience = allUsers
                            .filter(user => !playerKeys.includes(user.username))
                            .filter(user => !user.out)
                            .length;

    // question number
    let questionNumber = null;
    let adaptedQuestion = null;
    if (question) {
      questionNumber = question.question[0].match(/[0-9]+/g);
      questionNumber = Number(questionNumber);

      // adaptedQuestion = { 
      //   ...question,

      // }
    }

    // players lists
    const rankPlayers = allUsers.filter(user => user.isPlayer).sort((user1, user2) => user1.score < user2.score);
    const rankAudience = allUsers.filter(user => !user.isPlayer).sort((user1, user2) => user1.score < user2.score);

    return (
      <div id="game">
        <div className="leftTabBar">
          <div className="homeIcon" onClick={this.props.handleNextContest}>
            <img src={homeIcon} alt="Home" />
          </div>

          <div className={classnames('tab', { active: this.state.active })} onClick={this.handleClickTabOne}>答题</div>
          <div className={classnames('tab', { active: !this.state.active })} onClick={this.handleClickTabTwo}>排名</div>
        </div>

        <div 
          className="rightBox" 
          style={{ 
            display: this.state.active ? 'flex': 'none'
          }}
        >
          <div className="questionBox">
            <div className="questionBoxHeader">
              <p className="questionNumber">
                {question ? (question.answer.length > 1 ? '多选题' : '单选题') : ''}
                {
                  questionNumber 
                  ? questionNumber
                  : '暂无'
                }
              </p>
              <p className="countDown">
                {this.state.cnt}
              </p>
            </div>

            <div className="question">
              {
                question && (
                  <p className={classnames('topic')}>{question.question[0]}</p>
                )
              }

              <div className="options">
              {
                question && (
                  question.question.slice(1).map((item, key) => (
                    <p key={key} className={classnames('paragraph')}>{item}</p>
                  ))
                )
              }
              </div>
            </div>

            <div className="questionJump">
              <button className="closeThisQuestion" onClick={() => { this.props.endThisQuestion() }}>结束本题</button>
              <button className="closeThisQuestion" onClick={this.handleCount}>开始计时</button>
              <button className="nextQuestion" onClick={() => this.props.handleSelect('single')}>单选题</button>
              <button className="nextQuestion" onClick={() => this.props.handleSelect('multiple')}>多选题</button>
            </div>
          </div>

          <div className="playerBox">
            {
              players.map((player, key) => (
                <div key={key} 
                  className={
                    classnames('player', 
                      { [ 'player' + key ]: true },
                      { out: player.out },
                      { promote: player.promote }
                    )
                  }
                  onClick={() => { this.props.handleRes('promote', player.username) } }
                >
                  <p className="score">{player.score}</p>
                  <p className="name">{player.name}</p>
                </div>
              ))
            }
          </div>
        </div>

        <div className="rankList" style={{ display: !this.state.active ? 'flex' : 'none'}}>
          <div className="rankListLeft">
            <h3 className="rankListHeader">选手列表</h3>
            <div className="lists">
              <div className="listHeader">
                {
                  ['排名', '姓名', '分数'].map((item, key) => (
                    <p key={key} className={classnames('listHeaderItem', { ['headerItem' + key]: true } )}>
                      {item}
                    </p>
                  ))
                }
              </div>
              <div className="listBody">
              {
                rankPlayers.map((user, key) => (
                  <div className="listItem" key={key}>
                    <p className="listItemContent">{key + 1}</p>
                    <p className="listItemContent">{user.name}</p>
                    <p className="listItemContent">{user.score}</p>
                  </div>
                ))
              }
              </div>
            </div>
          </div>
          <div className="rankListRight">
            <h3 className="rankListHeader">观众</h3>
            <div className="lists">
              <div className="listHeader">
                {
                  ['排名', '姓名', '分数'].map((item, key) => (
                    <p key={key} className={classnames('listHeaderItem', { ['headerItem' + key]: true } )}>
                      {item}
                    </p>
                  ))
                }
              </div>
              <div className="listBody">
              {
                rankAudience.map((user, key) => (
                  <div className="listItem" key={key}>
                    <p className="listItemContent">{key + 1}</p>
                    <p className="listItemContent">{user.name}</p>
                    <p className="listItemContent">{user.score}</p>
                  </div>
                ))
              }
              </div>
            </div>
          </div>
        </div>
        
      </div>
    );
  }
}

// <div className="person_group">
// {
//   players.map((item, key) => (
//     <div key={key} className="person">
//     <img src={run} className="icon"/>
//      <p className="name">{item.name}</p>
//      <p><span className="score">{ item.score || 0 }</span> 分</p>
//      {
//        item.out
//        ? (
//          <div>已出局</div>
//        )
//        : (
//          <div>
//           <button onClick={() => { this.props.handleRes('out', item.username) }}>出局</button>
//           <button onClick={() => { this.props.handleRes('promote', item.username) } }>晋级</button>
//          </div>
//        )
//      }
//     </div>
//   ))
// }
// </div>
// {
//   isLoading
//   ? (
//     <Spin />
//   )
//   : (
//     <p>剩余观众： {remainAudience || 0}</p>
//   )
// }
// <button onClick={() => { this.props.handleSelect('single') }}>单选题</button>
// <button onClick={() => { this.props.handleSelect('multiply') }}>多选题</button>
// <button onClick={this.props.handleNextContest}>开始下一轮</button>
// <button onClick={() => { this.props.endThisQuestion() }}>结束本题</button>
// <p>{this.state.cnt}</p>