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
    const inp = this.state.input.trim();
    if ( inp && this.props.user.username !== 'Login') {
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
  componentDidMount() {
    $('#imagefile').on('change', (e) =>{
      //Get the first (and only one) file element
      //that is included in the  event
      var file = e.originalEvent.target.files[0],
          reader = new FileReader();
      //When the file has been read...
      reader.onload = (evt) => {
          //Because of how the file was read,
          //evt.target.result contains the image in base64 format
          //Nothing special, just creates an img element
          //and appends it to the DOM so my UI shows
          //that I posted an image.
          //send the image via Socket.io
          this.props.socket.emit('send', {
            ...this.props.user,
            text: '',
            image: evt.target.result,
            timestamp: new Date().toLocaleTimeString('en-us')
          });
      };
      //And now, read the image and base64
      reader.readAsDataURL(file);
    });
  }

  render() {
    return (
      <form action="" onSubmit={this.handleSubmit}>
        <div id="footer-messages" className="ui menu">
          <div id="message-photo" className="left item">
            <label htmlFor='imagefile' id="photo-button" className="ui button">
              <i className="photo icon"></i>
            </label>
            <input type="file" id="imagefile" style={{display: "none"}} />
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
