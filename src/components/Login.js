import React, { Component } from 'react';
import { message } from 'antd';
import './css/Login.css';
import logo from './img/logo.png';


export const error = (msg, duration, closeLogic = () => {}) => {
  message.error(msg, duration, () => {
    closeLogic();
  });
}

export const success = (msg, duration, closeLogic = () => {}) => {
  message.success(msg, duration, () => {
    closeLogic();
  });
}

export default class  extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
    };
  }

  handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    console.log('name', name);
    this.setState({
      [name]: value,
    });
  }

  handleSubmit = (e) => {
    const { username } = this.state;

    // verify input
    if (!username) {
      error('Sorry, 您的账号不能为空哦 ~ ');
    } else {
      const body = {
        username,
      };

      console.log('body', body);
      this.props.handleSubmit(body);
    }
  }

  render() {
    return (
      <div className="loginBox">
        <img src={logo} className="logo"/>
          <label className="label">用户名</label>
          <input 
            type="username" 
            name="username"
            value={this.state.username}
            className="input"
            onChange={this.handleChange}
          /> <br />
          <button className="btn btn-red btn-large" onClick={this.handleSubmit}>登  录</button>
      </div>
    );
  }
}