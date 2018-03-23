import React, { Component } from 'react';
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
    let initialState = {};

    Object.values(mapNumberToString)
      .slice(0, optionLength)
      .map(item => initialState[item] = false);

    this.state = {
      ...initialState,
    };
  }

  handleChange = (event) => {
    const target = event.target;
    const value = target.checked;
    const id = target.id;

    console.log('id', id);
    console.log('value', value);

    this.setState({
      [id]: value,
    });
  }

  render() {
    const { question } = this.props;
    const isMultiSelect = question.answer.length > 1;
    const options = question.question.slice(1);

    // this.state.
    console.log('state', this.state);

    return (
      <div>
        <h2>{question.question[0]}</h2>
        {
          isMultiSelect
          ? (
            options.map((item, key) => (
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
            ))
          )
          : (
            options.map((item, key) => (
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
            ))
          )
        }
        <button onClick={this.props.handleSubmit}>选择</button>
      </div>
    );
  }
}