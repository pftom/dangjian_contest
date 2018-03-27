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
    cnt: 0,
    active: true,
  }

  componentWillReceiveProps(nextProps) {
    const that = this;
    if (nextProps.question !== this.props.question) {
      this.timer = setInterval(() => {
        that.setState((prevState, props) => {
          return {
            cnt: prevState.cnt + 1,
          };
        })
      }, 1000);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { dispatch, players } = this.props;
    if (this.state.cnt >= 10) {
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
        cnt: 0,
      });
    }
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
            <p className="questionNumber">
              {question ? (question.answer.length > 1 ? '多选题' : '单选题') : ''}
              {
                questionNumber 
                ? questionNumber
                : '暂无'
              }
            </p>

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
              <button className="nextQuestion" onClick={() => this.props.handleSelect('single')}>下一题</button>
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
          <h3 className="rankListHeader">排名列表</h3>
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
              allUsers.map((user, key) => (
                <div className="listItem" key={key}>
                  <p className="listItemContent">1</p>
                  <p className="listItemContent">{user.name}</p>
                  <p className="listItemContent">{user.score}</p>
                </div>
              ))
            }
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