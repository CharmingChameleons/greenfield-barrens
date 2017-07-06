import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import ChannelAdd from './ChannelAdd';
import ChannelList from './ChannelList';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';

import { dummyChannels, dummyUsers, dummyMessages } from '../dummyData';
import { setPage } from '../actions/currentPage';

const MessageBoard = ({
  currentPage,
  setPage,
  socket,
  user,
  messages,
  message,
  getUserInfo,
  changeChannel
}) => {
  console.log('new page', currentPage)

  const changePage = function(pageName) {
    setPage(pageName)
  }

  const el = currentPage.currentPage === 'landing' 
    ? <div className="message-board">
        <div className="ui three item menu">
          <a className="item" onClick={ function() {changePage('notlanding')} } > β </a>
          <a className="active item">{user.region}</a>
          <a className="item">{user.username}</a>
        </div>
        <MessageList messages={messages} user={user} />   
        <MessageInput socket={socket} getUserInfo={getUserInfo} user={user} />
      </div>
    : <div className="channel-board">
        <div className="ui three item menu">
          <a className="item" onClick={ function() {changePage('landing')} }> β </a>
          <a className="active item">{user.region}</a>
          <a className="item">{user.username}</a>
        </div>
        <ChannelList user={user} channels={dummyChannels} changeChannel={changeChannel} />   
        <ChannelAdd />
      </div>

  const users = Array.from(new Set(messages.map(message => message.username)));
  console.log('In MessageBoard messages', messages)
  console.log('In MessageBoards', user)
  return (
    <div className='app'>
      {el}
    </div>
  );
};

const mapStateToProps = ({currentPage}) => ({
  currentPage
});

const mapDispatchToProps = dispatch => ({
  setPage: page => {
    dispatch(setPage(page));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageBoard));

// export default MessageBoard;

        // <ChannelList user={user} channels={dummyChannels} changeChannel={changeChannel}/>
        // <UserList users={users} user={user} />
