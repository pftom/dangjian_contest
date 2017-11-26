import React, { Component } from 'react';

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

export const fakeQuestion = {
  question: {
    title: 'hhhhh',
    option: ['A.assa', 'B.asassa', 'C.assaas', 'D....'],
  },
  answer: 'A',
};

export default class  extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: 'A',
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    
    this.props.handleSubmit(this.state.value);
  }

  handleClick = (event) => {
    this.setState({
      value: event.target.value,
    });
  }

  render() {
    const { isGettingQuestion, question, out, next } = this.props;

    

    return (
      <div>
        {
          (!out && !question && !next) && (
            <div>
              <p>答题即将开始，请做好准备</p>
              <button onClick={this.props.handleReady}>准备测试</button>
            </div>
          )
        }
        {
          (!out && next && !question) && (
            <div>
              <p>即将进入了下一轮比赛</p>
              <p>请做好准备，等待主持人开题</p>
            </div>
          )
        }
        {
          isGettingQuestion && (
            <div>加载中....</div>
          )
        }
        {
          (question && !out) && (
            <div>
              <p>{question.question}</p>
              <form onSubmit={this.handleSubmit}>
                {
                  fakeQuestion.question.option.map((item, key) => (
                    <label>
                      {item}
                      <input 
                        type="radio" 
                        name="option" 
                        value={mapNumberToString[key + 1]} 
                        onClick={this.handleClick}
                        defaultChecked={key === 0 && true}
                      />
                    </label>
                  ))
                }
                <input type="submit" value="Submit"/>
              </form>
            </div>
          )
        }
        {
          out && (
            <div>
              Sorry， 您在本轮答题中已经出局，
            </div>
          )
        }
      </div>
    );
  }
}