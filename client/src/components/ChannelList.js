import React from 'react';

import ChannelListItem from './ChannelListItem';

/*
TODOS:
  add onClick event for changing channel
  hover-over styling
  styling for current room
*/

const ChannelList = ({ user, channels, changeChannel, setPage }) => {
  return (
    <div className="channel-list">
      <div className="ui center aligned large header">Channels</div>
      <div className="channel-list">
        <div className="ui piled segments ">
          {channels.map(channel => 
            <ChannelListItem 
              user={user} 
              channel={channel} 
              changeChannel={changeChannel} 
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChannelList;
