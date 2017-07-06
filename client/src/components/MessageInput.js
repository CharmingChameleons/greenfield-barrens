import React, { Component } from 'react';

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

  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <div id="footer" className="ui menu">
          <div className="item">
            <div className="ui icon input">
              <input
                type="text"
                placeholder="New Message"
                onChange={this.handleChange}
                value={this.state.input}
              />
            </div>
          </div>

          <div className="right item">
            <button className="ui button">
              <i className="talk icon"></i>
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default MessageInput;
