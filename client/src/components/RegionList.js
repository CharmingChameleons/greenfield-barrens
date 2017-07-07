import React from 'react';

import RegionListItem from './RegionListItem';

/*
TODOS:
  add onClick event for changing channel
  hover-over styling
  styling for current room
*/

const RegionList = ({ user }) => {
  return (
    <div className="channel-list">
      <div className="ui center aligned large header">Regions</div>
      <div className="channel-list">
        <div className="ui piled segments ">
          This is a test.
        </div>
      </div>
    </div>
  );
};

export default RegionList;
          // {regions.map(channel => 
          //   <ChannelListItem 
          //     user={user} 
          //     channel={channel} 
          //     changeChannel={changeChannel} 
          //     setPage={setPage}
          //   />
          // )}
