import React from 'react';

import ChannelListItem from './ChannelListItem';

/*
TODOS:
  add onClick event for changing channel
  hover-over styling
  styling for current room
*/

const ChannelList = ({ user, channels, changeChannel }) => {
  return (
    <div className="channel-list">
      <h4 className="ui huge center aligned header">Channels</h4>
        <div className="ui piled segments channel-list">
          {channels.map(channel => 
            <ChannelListItem 
              user={user} 
              channel={channel} 
              changeChannel={changeChannel} 
            />)
          }
        </div>
    </div>
  );
};

export default ChannelList;
