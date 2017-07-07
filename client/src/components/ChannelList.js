import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import ChannelListItem from './ChannelListItem';

import {setChannels} from '../actions/channels';
/*
TODOS:
  add onClick event for changing channel
  hover-over styling
  styling for current room
*/

class ChannelList extends React.Component {
  constructor(props, user, channels, changeChannel, setPage, setChannels ) {
    super(props)
  }

  componentWillMount() {
    fetch(`/api/channels/${this.props.user.region}`, {
            method: 'GET'})
    .then((response) => {
      console.log('Loading initial list of channels', response)
      return response.json()
    })
    .then((channels) => {
      setChannels(channels)
    }); 
  }

  render() {
    return (
      <div className="channel-list">
        <div className="ui center aligned large header">Channels</div>
        <div className="channel-list">
          <div className="ui piled segments ">
            {this.props.channels.map(channel => 
              <ChannelListItem 
                user={this.user} 
                channel={channel} 
                changeChannel={this.changeChannel} 
                setPage={this.setPage}
              />
            )}
          </div>
        </div>
      </div>
    );  
  }
}
// = ({ user, channels, region, changeChannel, setPage, setChannels }) => {
//   fetch(`/api/channels/${region}`, {
//           method: 'GET'})
//   .then((response) => {
//     console.log('Loading initial list of channels', response)
//     return response.json()
//   })
//   .then((channels) => {
//     setChannels(channels)
//   });
//   return (
//     <div className="channel-list">
//       <div className="ui center aligned large header">Channels</div>
//       <div className="channel-list">
//         <div className="ui piled segments ">
//           {channels.map(channel => 
//             <ChannelListItem 
//               user={user} 
//               channel={channel} 
//               changeChannel={changeChannel} 
//               setPage={setPage}
//             />
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

const mapStateToProps = ({channels}) => ({
  channels
});

const mapDispatchToProps = dispatch => ({
  setChannels: channels => {
    dispatch(setChannels(channels));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelList));
//export default ChannelList;
