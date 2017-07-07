import React from 'react';

import ChannelListItem from './ChannelListItem';

/*
TODOS:
  add onClick event for changing channel
  hover-over styling
  styling for current room
*/

const ChannelList = ({ user, channels, region, changeChannel, setPage, setChannel }) => {
  fetch(`/api/channels/${region}`, {
          method: 'GET'})
  .then((response) => {
    console.log('Loading initial list of channels', response)
    return response.json()
  })
  .then((channels) => {
    setChannels(channels)
  });
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

const mapStateToProps = ({channels}) => ({
  channels
});

const mapDispatchToProps = dispatch => ({
  setChannels: channels => {
    dispatch(setChannels(channels));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageBoard));
//export default ChannelList;
