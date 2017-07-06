import React from 'react';

import ChannelList from './ChannelList';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

import { dummyChannels, dummyUsers, dummyMessages } from '../dummyData';

const MessageBoard = ({
  socket,
  user,
  messages,
  getUserInfo,
  changeChannel
}) => {
  const users = Array.from(new Set(messages.map(message => message.username)));

  return (
    <div className="message-board">
      <div className="message-list-container inline-block">
        <MessageList messages={messages} user={user} />
        <MessageInput socket={socket} getUserInfo={getUserInfo} user={user} />
      </div>
    </div>
  );
};

export default MessageBoard;
