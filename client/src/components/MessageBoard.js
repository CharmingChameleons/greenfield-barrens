import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import ChannelAdd from './ChannelAdd';
import ChannelList from './ChannelList';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Navbar from './Navbar';
import Gmap from './Gmap';

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
  const changePage = function() {
    if (currentPage.currentPage === 'landing') {
      setPage('xlanding');
    } else {
      setPage('landing');
    }
  }

  const el = currentPage.currentPage === 'landing' 
    ? <div className="message-board">
        <Navbar 
          changePage={changePage}
          user={user}
        />
        <MessageList messages={messages} user={user} />   
        <MessageInput socket={socket} getUserInfo={getUserInfo} user={user} />
      </div>
    : <div className="channel-board">
        <Navbar 
          changePage={changePage}
          user={user}
        />
        <ChannelList 
          user={user} 
          channels={dummyChannels} 
          changeChannel={changeChannel} 
          setPage={setPage}
        />   
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
        //<Gmap lat={-122.4127313} long={37.7453366} />
