import React from 'react';

const MessageListItem = ({ message, user }) => {
  const el = message.username === user.username // change to userId
    ? <div className="own-message">
        <div className="ui green segment">
          <span>{message.username} - {message.timestamp}</span>
          <br/>
          {message.text}
        </div>
      </div>
    : <div className="other-user-message">
        <div className="ui blue segment">
          <span>{message.username} - {message.timestamp}</span>
          <br />
          {message.text}
        </div>
      </div>;
  return (
    <div className="message-list-item">
      {el}
    </div>
  );
};

export default MessageListItem;
