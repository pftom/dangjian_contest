import React, { Component } from 'react';
import { message } from 'antd';
import './css/Login.css';
import logo from './img/loginLogo.svg';
import { Helmet } from 'react-helmet';


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

      this.props.handleSubmit(body);
    }
  }

  render() {
    return (
      <div className="loginBox">
        <Helmet>
          <meta charSet="utf-8" />
          <title>答题登录</title>
        </Helmet>
        <img src={logo} className="logo"/>
          <input 
            type="username" 
            name="username"
            value={this.state.username}
            className="input"
            onChange={this.handleChange}
            placeholder="请输入您的学号"
          /> <br />
          <button className="loginBtn" onClick={this.handleSubmit}>登  录</button>
      </div>
    );
  }
}