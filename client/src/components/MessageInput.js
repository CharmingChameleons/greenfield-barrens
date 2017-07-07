import React, { Component } from 'react'
import {logIn} from '../actions/user'

class MessageInput extends Component {
  constructor(props) {
    super();
    this.state = {
      input: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      input: e.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.props.user.username === null) {
      logIn('henri')
      console.log(this.props.user);
    } else {
      const inp = this.state.input.trim();
      if (inp) {
        this.props.socket.emit('send', {
          ...this.props.user,
          text: this.state.input,
          timestamp: new Date().toLocaleTimeString('en-us')
        });
        this.setState({
          input: ''
        });
      }
    }
  }

  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <div id="footer-messages" className="ui menu">
          <div id="message-photo" className="left item">
            <button id="photo-button" className="ui button">
              <i className="photo icon"></i>
            </button>
          </div>
          <div id="message-input" className="left item">
            <div className="ui big icon input">
              <input
                type="text"
                placeholder="New Message"
                onChange={this.handleChange}
                value={this.state.input}
              />
            </div>
          </div>
          <div id="message-submit" className="right borderless item">
            <button id="message-button" className="ui button">
              <i className="talk icon"></i>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default MessageInput;
