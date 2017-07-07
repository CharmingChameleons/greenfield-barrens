import React from 'react';

import RegionListItem from './RegionListItem';

/*
TODOS:
  add onClick event for changing channel
  hover-over styling
  styling for current room
*/

const RegionList = ({ user, regions, setPage }) => {
  return (
    <div className="channel-list">
      <div className="ui center aligned large header">Regions</div>
      <div className="channel-list">
        <div className="ui piled segments ">
          {regions.map(region => 
            <RegionListItem 
              user={user} 
              region={region} 
              setPage={setPage}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RegionList;
