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
      {region.name}
    </div>
  );
};

export default RegionListItem;
