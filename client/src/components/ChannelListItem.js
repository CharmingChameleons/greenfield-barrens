import React from 'react';

const ChannelListItem = ({ user, channel, changeChannel, setPage }) => {
  return (
    <div
      className='ui segment' 
      onClick= { 
        function() { 
          changeChannel(channel.name);
          setPage('landing');
        } 
      }>
      {channel.name}
    </div>
  );
};

export default ChannelListItem;
