import React from 'react';

/*
  TODOS:
    style username below message
    onClick DM button, should allow DM to poster
      optimally, prepopulate DM with "re: [message text]"
    username instead of userId
     <span className="meta own">{message.username} - {message.timestamp}</span>
*/

const MessageListItem = ({ message, user }) => {
  console.log('In MessageListItem')
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
