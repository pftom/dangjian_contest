import React, { Component } from 'react';

export default class  extends Component {
  constructor(props) {
    super(props);

    const { allUsers } = this.props;

    this.state = {
      allUsers,
    };
  }

  render() {
    const { allUsers, next } = this.props;
    return (
      <div>
        党建答题比赛
        <input type="text" onChange={this.handleChange} value={this.state.value}/>
        {
          allUsers.map((item, key) => (
            <div key={key}>{item.name}</div>
          ))
        }
        <button>
          {
            next 
            ? '开始下一轮'
            : '开始比赛'
          }
        </button>

        <button onClick={() => { this.props.handleQuestion('single') }}>
          单选题
        </button>

        <button onClick={() => { this.props.handleQuestion('multiply') }}>
          多选题
        </button>

      </div>
    );
  }
}