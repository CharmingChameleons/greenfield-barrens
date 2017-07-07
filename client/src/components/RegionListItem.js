import React from 'react';

const RegionListItem = ({ user, setPage, region } ) => {
  return (
    <div
      className='ui segment' 
      onClick= { 
        function() { 
          setPage('landing');
        } 
      }>
      {region.region}
    </div>
  );
};

export default RegionListItem;
