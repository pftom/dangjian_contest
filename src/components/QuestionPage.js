import React, { Component } from 'react';
import { message } from 'antd';
import classnames from 'classnames';
import $ from 'jquery';

import './css/QuestionPage.css';
import {
  GET_OUT_OF_CONTEST,
  PROMOTE_CONTEST,
} from '../constants/';

import nextIcon from './img/next.svg';

export const mapNumberToString = {
  1: 'A',
  2: 'B',
  3: 'C',
  4: 'D',
  5: 'E',
  6: 'F',
  7: 'G',
  8: 'H',
  9: 'I',
};

export default class QuestionPage extends Component {
  constructor(props) {
    super(props);

    const { question } = props;
    const optionLength = question.question.slice(1).length;

    this.initialState = {};

    Object.values(mapNumberToString)
      .slice(0, optionLength)
      .map(item => this.initialState[item] = false);

    this.state = {
      ...this.initialState,
    };
  }

  error = (msg, duration, afterClose = () => {}) => {
    message.error(msg, duration, () => {
      afterClose();
    });
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.checked;
    const id = target.id;

    if (target.type === 'radio') {
      this.setState({
        ...this.initialState,
        [id]: value,
      });
    } else {
      this.setState({
        [id]: value,
      });
    }
  }

  handleClick = (event) => {
    const target = event.target;
    $(target).find('input').click();
  }

  handleSubmit = () => {
    const { question, token, dispatch } = this.props;
    const isMultiSelect = question.answer.length > 1;
    let isSelectedAnyThing = false;

    // || to judge whether is unselect status
    Object.values(this.state).map(item => {
      isSelectedAnyThing = isSelectedAnyThing || item;
    });

    if (!isSelectedAnyThing) {
      this.error('Sorry, 您还没有选择哦 ~');
    } else {
      if (isMultiSelect) {
        // concat answer and compare two answer
        let concatAnswer = '';
        let concatOriginalAnswer = '';
        question.answer.map(item => {
          concatOriginalAnswer += item;
        });

        // start concat the nowthat answer
        Object.entries(this.state).map(value => {
          if (value[1]) {
            concatAnswer += value[0];
          }
        });

        if (concatOriginalAnswer !== concatAnswer) {
          dispatch({ type: GET_OUT_OF_CONTEST, payload: { username: token }});
          // out
        } else {
          dispatch({ type: PROMOTE_CONTEST, payload: { username: token }});
        }
      } else {
        // promote
        let answer = '';
        Object.entries(this.state).map(value => {
          if (value[1]) {
            answer = value[0];
          }
        });

        if (question.answer[0] !== answer) {
          dispatch({ type: GET_OUT_OF_CONTEST, payload: { username: token }});
        } else {
          dispatch({ type: PROMOTE_CONTEST, payload: { username: token }});
        }
      }
    }
  }

  render() {
    const { question } = this.props;
    const isMultiSelect = question.answer.length > 1;
    const options = question.question.slice(1);
    const questionHeaderArr = question.question[0].split('.');
    let questionHeader = (
      <h2 className="questionHeader">
        <span className="questionNumber">{questionHeaderArr[0]}</span>&nbsp;&nbsp;
        <span className="optionFlag">{ isMultiSelect ? '[多选题]' : '[单选题]'}</span>{questionHeaderArr[1]}
      </h2>
    )

    return (
      <div id="question">
        {questionHeader}
        {
          isMultiSelect
          ? (
            options.map((item, keyIndex) => {
              const key = keyIndex + 1;
              
              return (
                <p key={key} onClick={this.handleClick} className={classnames("questionOption", { active: this.state[mapNumberToString[key]] })}>
                  <input 
                    type="checkbox" 
                    name={mapNumberToString[key]} 
                    id={mapNumberToString[key]}
                    checked={this.state[mapNumberToString[key]]}
                    onChange={this.handleChange} 
                  />
                  <label htmlFor={mapNumberToString[key]}>{item}</label>
                </p>
              );
            })
          )
          : (
            options.map((item, keyIndex) => {
              const key = keyIndex + 1;

              return (
                <p key={key} onClick={this.handleClick} className={classnames("questionOption", { active: this.state[mapNumberToString[key]] })}>
                  <input 
                    type="radio"
                    name="option"
                    id={mapNumberToString[key]}
                    checked={this.state[mapNumberToString[key]]}
                    onChange={this.handleChange} 
                  />
                  <label htmlFor={mapNumberToString[key]}>{item}</label>
                </p>
              );
            })
          )
        }
        <div className="nextBox">
          <img src={nextIcon} alt="next" onClick={this.handleSubmit} />
        </div>
      </div>
    );
  }
}