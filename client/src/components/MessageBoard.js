import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import ChannelAdd from './ChannelAdd';
import ChannelList from './ChannelList';
import UserList from './UserList';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import Navbar from './Navbar';
import RegionList from './RegionList';
import RegionAdd from './RegionAdd';

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
  const openChannels = function() {
    if (currentPage.currentPage !== 'channels') {
      setPage('channels');
    } else {
      setPage('landing');
    }
  }

  const openRegions = function() {
    if (currentPage.currentPage !== 'regions') {
      setPage('regions');
    } else {
      setPage('landing');
    }
  }

  let el;

  if (currentPage.currentPage === 'landing') {
    el =  
      <div className="message-board">
        <Navbar 
          openChannels={openChannels}
          openRegions={openRegions}
          user={user}
        />
        <MessageList messages={messages} user={user} />   
        <MessageInput socket={socket} getUserInfo={getUserInfo} user={user} />
      </div>
  } else if (currentPage.currentPage === 'channels') {
    el = 
      <div className="channel-board">
        <Navbar 
          openChannels={openChannels}
          openRegions={openRegions}
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
  } else if (currentPage.currentPage === 'regions') {
    el = 
      <div className="channel-board">
        <Navbar 
          openChannels={openChannels}
          openRegions={openRegions}
          user={user}
        />
        <RegionList 
          user={user} 
          // regions={dummyRegions} 
          // changeRegions={changeRegion} 
          // setPage={setPage}
        />   
        <RegionAdd />
      </div>
  }

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
