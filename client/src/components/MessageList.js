import React from 'react';

import MessageListItem from './MessageListItem';

const MessageList = ({ messages, user }) => {
  const messagesInChannel = messages.filter(message => message.channel === user.channel);
  const messageItems = messagesInChannel.length
    ? messagesInChannel.map(message =>
        <MessageListItem message={message} user={user} />
      )
    : <h4 className="message-prompt"> Get the conversation going! </h4>;
  return (
    <div className="message-body">
      {user.region === '... nowhere ...'
        ? <h4>Please wait for login...</h4>
        : messageItems}
    </div>
  );
};

export default MessageList;
