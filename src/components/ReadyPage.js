import React, { Component } from 'react';

export default class  extends Component {
  render() {
    const { isGettingQuestion, question } = this.props;
    return (
      <div>
        {
          !question && (
            <div>
              <p>答题即将开始，请做好准备</p>
              <button onClick={this.props.handleReady}>准备测试</button>
            </div>
          )
        }
        {
          isGettingQuestion && (
            <div>加载中....</div>
          )
        }
        {
          question && (
            <div>
              <p>{question.question}</p>
            </div>
          )
        }
      </div>
    );
  }
}