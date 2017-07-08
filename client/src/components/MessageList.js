import React from 'react';
import ReactDOM from 'react-dom';
import MessageListItem from './MessageListItem';

class MessageList extends React.Component {
  constructor(props) {
    super(props);
  }

  scrollToBottom() {
    const node = ReactDOM.findDOMNode(this.messagesEnd);
    node.scrollIntoView({ behavior: 'smooth' });
  }

  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  renderMessages() {
    const messagesInChannel = this.props.messages.filter(message => message.channel === this.props.user.channel);
    return messagesInChannel.length
      ? messagesInChannel.map(message =>
          <MessageListItem message={message} user={this.props.user} />
        )
      : 
        <div>
          <h1 className="message-welcome"> 
            <br/><br/> Get the conversation going! 
          </h1>
        </div>;
  }

  render() {

    return (
      <div className="message-body">
        {this.props.user.region === '... nowhere ...'
          ? 
            <div> 
              <h1 className="message-welcome"> 
                <br/><br/> Welcome to Barrens v2! <br/>
              </h1>
              <div>
                <br/>
                  <h3 className="message-welcome-body" > 
                  Simple. <br/>
                  Location-based. <br/>
                  Reliable. <br/>
                  </h3>

                  <br/>
                  <br/>
                  <br/>                  
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>
                  <br/>


                  <h3 className="message-welcome">
                  Let's get started.
                  </h3>
              </div>
            </div>
          : this.renderMessages() }
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }} />
      </div>

    )
  }
}

export default MessageList;
