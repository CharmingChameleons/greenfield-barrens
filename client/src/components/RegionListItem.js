import React from 'react';

const RegionListItem = ({ user, setPage } ) => {
  return (
    <div
      className='ui segment' 
      onClick= { 
        function() { 
          setPage('landing');
        } 
      }>
      Dummy names
    </div>
  );
};

export default RegionListItem;
