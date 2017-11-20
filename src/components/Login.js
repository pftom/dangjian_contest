import React, { Component } from 'react';
import { message } from 'antd';
import 'antd/lib/message/style/css';

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
      <div>
        <form onSubmit={this.handleSubmit}>
          <input 
            type="username" 
            name="username"
            value={this.state.username}
            placeholder={'请输入用户名'}
            onChange={this.handleChange}
          /> <br />
          <input 
            type="password" 
            name="password"
            value={this.state.password}
            placeholder={'请输入密码'}
            onChange={this.handleChange}
          /> <br />
          <input type="submit" value="Submit"/>
        </form>
      </div>
    );
  }
}