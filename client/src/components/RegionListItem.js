import React from 'react';

const RegionListItem = ({ user, setPage, region, changeRegion, changeChannel, socket } ) => {
  function changeSubscription(userRegion, newRegion) {
    socket.emit('unsubscribe', userRegion);
    socket.emit('subscribe', newRegion);
  }

  return (
    <div
      className='ui segment' 
      onClick= { 
        function() {
          changeSubscription(user.region, region.name)
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
