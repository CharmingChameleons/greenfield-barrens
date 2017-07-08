import React from 'react';

const RegionListItem = ({ user, setPage, region, changeRegion } ) => {
  return (
    <div
      className='ui segment' 
      onClick= { 
        function() {
          changeRegion(region.name)
          setPage('landing');
        } 
      }>
      {region.name}
    </div>
  );
};

export default RegionListItem;
