import React, { Component } from 'react';
import { message } from 'antd';
import './css/Login.css';
import logo from './img/logo.png';

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

  error = (msg) => {
    message.error(msg);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { username } = this.state;

    // verify input
    if (!username) {
      this.error('Sorry, 您的账号不能为空哦 ~ ');
    } else if (isNaN(Number(username))) {
      this.error('Sorry, 您不是此次比赛的成员哦 ~ ');
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
        <form onSubmit={this.handleSubmit} className="form">
          <label className="label">用户名</label>
          <input 
            type="username" 
            name="username"
            value={this.state.username}
            className="input"
            onChange={this.handleChange}
          /> <br />
          <input type="submit" value="登  录" className="btn btn-red btn-large"/>
        </form>
      </div>
    );
  }
}