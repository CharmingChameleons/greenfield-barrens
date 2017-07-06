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
  console.log('In MessageBoard messages', messages)
  console.log('In MessageBoars', user)

  return (
    <div className="message-board">
      <div className="ui three item menu">
        <a className="item"> β </a>
        <a className="active item">{user.region}</a>
        <a className="item">{user.username}</a>
      </div>
      <div className="message-list-container inline-block">
        <MessageList messages={messages} user={user} />
        <MessageInput socket={socket} getUserInfo={getUserInfo} user={user} />
      </div>
      <MessageList messages={messages} user={user} />   
      <MessageInput socket={socket} getUserInfo={getUserInfo} user={user} />
    </div>
    
  );
};

export default MessageBoard;

        // <ChannelList user={user} channels={dummyChannels} changeChannel={changeChannel}/>
        // <UserList users={users} user={user} />
