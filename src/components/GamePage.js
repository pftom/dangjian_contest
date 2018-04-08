import React, { Component } from 'react';
import classnames from 'classnames';
import { Modal } from 'antd';


import './css/GamePage.css';
import { 
  END_OF_THIS_QUESTION, 
  GET_OUT_OF_CONTEST,
  PROMOTE_CONTEST,
} from '../constants/';
import homeIcon from './img/home.svg';
import success from './img/success.svg';
import error from './img/error.svg';
import clock from './img/clock.svg';

// default question

export default class  extends Component {
  state = {
    cnt: 5,
    active: true,

    status: '',
    username: '',
    visible: false,
  }

  componentDidUpdate(prevProps, prevState) {

    const { dispatch, players } = this.props;
    if (this.state.cnt <= 0) {
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

  handleOut = ({ username }) => {
    this.setState({
      username,
      status: 'out',
      visible: true,
    });
  }

  handlePromote = ({ username }) => {
    this.setState({
      username,
      status: 'promote',
      visible: true,
    });
  }

  handleOk = (e) => {
    e.preventDefault();
    this.setState({
      visible: false,
    });

    const { username, status } = this.state;
    const { dispatch } = this.props;

    // if username of status not exist, then just return, not handle anything
    if (!username || !status) {
      return;
    }

    if (status === 'out') {
      this.props.handleRes('out', username);
    } else {
      this.props.handleRes('promote', username);
    }
  }

  handleCancel = (e) => {
    e.preventDefault();
    this.setState({
      username: '',
      status: '',
      visible: false,
    });
  }

  render() {
    const { players, allUsers, isLoading, question } = this.props;
    const playerKeys = players.map(item => (
      item.username
    ));
    let totalAudience = null;
    let remainAudience = null;

    if (allUsers) {
      totalAudience = allUsers
      .filter(user => user.logged)
      .filter(user => !playerKeys.includes(user.username))

      remainAudience = totalAudience
            .filter(user => !user.out)
    }

    // question number
    let questionNumber = null;
    let adaptedQuestion = null;
    if (question) {
      questionNumber = question.question[0].match(/[0-9]+/g);
      questionNumber = Number(questionNumber);
    }

    // players lists
    const rankPlayers = allUsers.filter(user => user.isPlayer).sort((user1, user2) => user1.score < user2.score);
    const rankAudience = allUsers.filter(user => !user.isPlayer).sort((user1, user2) => user1.score < user2.score);

    return (
      <div id="game">
        <Modal
          title="三思框"
          visible={this.state.visible}
          onOk={this.handleOk}
          okText="我确定"
          cancelText="我不确定"
          onCancel={this.handleCancel}
        >
          <p>你确定真的！要做这样的选择嘛？🤔</p>
        </Modal>
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
                {question ? (question.answer.length > 1 ? '多选题  ' : '单选题  ') : ''}
                {
                  questionNumber 
                  ? questionNumber
                  : '暂无'
                }
              </p>
              <div className="countDown">
                <div className="countDownTextBox">
                  <img src={clock} alt="闹钟"/>
                  <span className="countDownText">
                    {this.state.cnt}
                  </span>
                </div>
                <div className="remainAudience">
                  剩余观众：{remainAudience ? remainAudience.length : 0} / {totalAudience ? totalAudience.length : 0} 人
                </div>
              </div>
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
              <button className="nextQuestion" onClick={() => this.props.handleSelect()}>下一题</button>
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
                >
                  <div className="playerSide">
                    <p className="score">{player.score}</p>
                    <p className="name">{player.name}</p>
                  </div>
                  <div className="judgeSide">
                    <button className="btn-default btn-error" onClick={() => { this.handleOut({
                      username: player.username,
                    }) }}>
                      <img src={error} alt="出局"/> <span>出局</span>
                    </button>
                    <button className="btn-default btn-success" onClick={() => this.handlePromote({
                      username: player.username
                    })}>
                      <img src={success} alt="晋级"/> <span>晋级</span>
                    </button>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

        <div className="rankList" style={{ display: !this.state.active ? 'flex' : 'none'}}>
          <div className="rankListLeft">
            <h3 className="rankListHeader">选手排名</h3>
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
            <h3 className="rankListHeader">观众排名</h3>
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