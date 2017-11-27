import React, { Component } from 'react';
import { message } from 'antd';
import './css/Login.css';
import logo from './img/logo.png';

export default class  extends Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
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
    const { username, password } = this.state;

    // verify input
    if (!username || !password) {
      this.error('账号和密码不能为空哦~');
    } else if (isNaN(Number(username)) || isNaN(Number(password))) {
      this.error('账号密码错误喽~');
    } else if (username !== password) {
      this.error('账号密码都为学号哦~');
    } else {
      const body = {
        username,
        password,
      };
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
          <label className="label">密码</label>
          <input 
            type="password" 
            name="password"
            value={this.state.password}
            className="input"
            onChange={this.handleChange}
          /> <br />
          <p className="hint">账号密码都为学号</p>
          <input type="submit" value="登  录" className="btn btn-red btn-large"/>
          <input type="button" value="回首页" className="btn btn-gray btn-large" onClick={this.props.handleReturn}/>
        </form>
      </div>
    );
  }
}