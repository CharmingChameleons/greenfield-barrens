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
      : <h4 className="message-prompt"> Get the conversation going! </h4>;
  }

  render() {

    return (
      <div className="message-body">
        {this.props.user.region === '... nowhere ...'
          ? <h4 className="message-prompt">Please wait for login...</h4>
          : this.renderMessages() }
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }} />
      </div>

    )
  }
}

export default MessageList;
