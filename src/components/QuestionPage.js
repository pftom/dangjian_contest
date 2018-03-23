import React, { Component } from 'react';
import { message } from 'antd';
import classnames from 'classnames';

import './css/QuestionPage.css';

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
      })
    } else {
      this.setState({
        [id]: value,
      });
    }
  }

  handleSubmit = () => {
    const { question } = this.props;
    const isMultiSelect = question.answer.length > 1;
    let isSelectedAnyThing = false;

    // || to judge whether is unselect status
    Object.values(this.state).map(item => {
      isSelectedAnyThing = isSecureContext || item;
    });

    if (!isSelectedAnyThing) {
      this.error('Sorry, 您还没有选择哦 ~');
    } else {
      if (isMultiSelect) {
        let concatAnswer = '';

        Object.entries(this.state).map(value => {
          if (value[1]) {
            concatAnswer += value[0];
          }
        });

        if ()
      } else {
  
      }
    }
  }

  render() {
    const { question } = this.props;
    const isMultiSelect = question.answer.length > 1;
    const options = question.question.slice(1);

    return (
      <div>
        <h2>{question.question[0]}</h2>
        {
          isMultiSelect
          ? (
            options.map((item, keyIndex) => {
              const key = keyIndex + 1;
              
              return (
                <p key={key}>
                  <input 
                    type="checkbox" 
                    name={mapNumberToString[key]} 
                    id={mapNumberToString[key]}
                    checked={this.state[mapNumberToString[key]]}
                    onChange={this.handleChange} 
                  />
                  <label htmlFor={mapNumberToString[key]} className={classnames({ active: this.state[mapNumberToString[key]] })}>{item}</label>
                </p>
              );
            })
          )
          : (
            options.map((item, keyIndex) => {
              const key = keyIndex + 1;

              return (
                <p key={key}>
                  <input 
                    type="radio"
                    name="option"
                    id={mapNumberToString[key]}
                    checked={this.state[mapNumberToString[key]]}
                    onChange={this.handleChange} 
                  />
                  <label htmlFor={mapNumberToString[key]} className={classnames({ active: this.state[mapNumberToString[key]] })}>{item}</label>
                </p>
              );
            })
          )
        }
        <button onClick={this.handleSubmit}>选择</button>
      </div>
    );
  }
}