import React, { Component } from 'react';
//const SocketIOFileUpload = require('socketio-file-upload');


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
      input: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(document.getElementById("siofu_input").value);
    const inp = this.state.input.trim();
<<<<<<< 68755fda39eed06a1c7eccfc845c94fac5dbfe0d
    var tempMessage = {
      ...this.props.user,
      text: this.state.input,
      timestamp: new Date().toLocaleTimeString('en-us')
    }
    if (inp && this.props.user.username !== 'Login') {
      this.props.socket.emit('send', tempMessage);
=======
    console.log(this.state.image);
    if ( inp && this.props.user.username !== 'Login') {
      this.props.socket.emit('send', {
        ...this.props.user,
        text: this.state.input,
        timestamp: new Date().toLocaleTimeString('en-us')
      });
>>>>>>> file upload?
      this.setState({
        input: ''
      });
      //this.props.updateMessages(tempMessage)
    }
  }
  componentDidMount() {
    //var uploader = new SocketIOFileUpload(this.props.socket);
    //uploader.listenOnInput(document.getElementById("siofu_input"));
  }

  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <div id="footer-messages" className="ui menu">
          <div id="message-photo" className="left item">
            <button id="photo-button" className="ui button">
              <i className="photo icon"></i>
              <input type="file" id="siofu_input" />
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
