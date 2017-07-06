import React from 'react';

const ChannelListItem = ({ user, channel, changeChannel }) => {
  return (
    <div className='ui segment' onClick={() => changeChannel(channel.name)}>
      {channel.name}
    </div>
  );
};

export default ChannelListItem;
