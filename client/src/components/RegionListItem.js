import React from 'react';

const RegionListItem = ({ user, setPage, region, changeRegion, changeChannel } ) => {
  return (
    <div
      className='ui segment' 
      onClick= { 
        function() {
          changeRegion(region.name)
          setPage('landing');
          changeChannel('General')
        } 
      }>
      {region.name}
    </div>
  );
};

export default RegionListItem;
