import React from 'react';

const MessageListItem = ({ message, user }) => {
  console.log('in MessageListItem', message.image);
  const el = message.username === user.username // change to userId
    ? <div className="own-message">
        <div className="ui green segment">
          <span>{message.username} - {message.timestamp}</span>
          <br/>
          {message.text}
          <br/>
          <img src={message.image} className='ui fluid image' />
        </div>
      </div>
    : <div className="other-user-message">
        <div className="ui blue segment">
          <span>{message.username} - {message.timestamp}</span>
          <br />
          {message.text}
          <br/>
          <img src={message.image} className='ui fluid image' />
        </div>
      </div>;
  return (
    <div className="message-list-item">
      {el}
    </div>
  );
};

export default MessageListItem;
